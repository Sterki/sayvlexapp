import { useEffect, useRef, useState } from "react";
import "./../scss/chat.scss";
import socketIoClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  roomSelectedAction,
  roomToConnectAction,
  setMessageArrayAction,
  setMessagesAction,
} from "../actions/usersAction";
import { chatingwithAction } from "../actions/friendsAction";
import clienteAxios from "../config/axios";

export function useChat() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(-20);
  const [circle, setCircle] = useState(false);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.user.roomsRedux);
  const roomSelected = useSelector((state) => state.user.roomSelected);
  const messages = useSelector((state) => state.user.messages);
  const authUsers = useSelector((state) => state.user.userAuth);
  const [tiempo, setTiempo] = useState();
  const socketRef = useRef();

  const SOCKET_NODEURL = "http://localhost:4000";
  const ROOM_TO_CONNECT = "roomTest";
  const RECIVO_MENSAJE = "recivoMensaje";
  const TIMECONNECTED = "timeconected";

  useEffect(() => {
    // CONEXION DEL SOCKET IO HACIA LOCALHOST PASANDOLE COMO PARAMETRO QUERY EL ROOM ACTUAL
    socketRef.current = socketIoClient(process.env.REACT_APP_SERVER_HEROKU, {
      query: { rooms: rooms },
    });
    // recibimos los mensajes desde el server con socketio
    // socketRef.current.on(ADDFRIENDSSOCKET, (infoUser) => {
    //   console.log(infoUser);
    // });
    socketRef.current.on(TIMECONNECTED, (tiempo) => {
      setTiempo(tiempo);
    });
    if (rooms !== null) {
      socketRef.current.on(RECIVO_MENSAJE, (data) => {
        const { info, room } = data;

        dispatch(roomSelectedAction(room));
        dispatch(setMessagesAction(info));
      });
    }
    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, dispatch, rooms]);

  useEffect(() => {
    let div = document.querySelector("#myChat");
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  }, [roomSelected, messages]);
  // FUNCION QUE ENVIA LOS MENSAJES PRIMERO HACIA EL SOCKET
  function handleSubmitMessage(e) {
    e.preventDefault();
    // SOCKET IO EMIT DEL MENSAJE
    if (message.trim() === "") {
      return;
    }
    socketRef.current.emit(ROOM_TO_CONNECT, {
      mensaje: message,
      userId: socketRef.current.id,
    });
    // FETCH HACIA LA API PARA GUARDAR LOS MENSAJES EN LA BASE DE DATOS
    fetch(`${process.env.REACT_APP_SERVER_HEROKU}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        roomname: rooms,
        message: message,
        id: authUsers._id,
        username: authUsers.username,
        email: authUsers.email,
        idsender: socketRef.current.id,
      }),
    });
    setMessage("");
  }
  function handleScroll(e) {
    let div = document.querySelector("#myChat");

    const { scrollTop } = e.target;

    if (scrollTop === 0) {
      setCircle(true);
      setTimeout(() => {
        setCircle(false);
        setVisible((prevState) => prevState - 8);
        div.scrollTop = div.scrollTop + 50;
      }, 1000);
    }
  }
  // DESCONEXION MANUAL DEL SOCKET IO
  function closeSesion() {
    socketRef.current.disconnect();
  }
  // FUNCION PARA SETEAR EL ROOM ACTUAL Y PODER OBTENER LA DATA DEL ROOM SELECCIONADO
  function handleClickRoom(friend) {
    const { idRoom } = friend;

    // const ROOM = "room1";
    dispatch(setMessageArrayAction());
    dispatch(chatingwithAction(friend));
    dispatch(roomToConnectAction(idRoom));
    fetch(`${process.env.REACT_APP_SERVER_HEROKU}/api/message/${idRoom}`)
      .then((resp) => {
        resp.json().then((res) => {
          const { message, roomname } = res;
          dispatch(roomSelectedAction(roomname));
          dispatch(roomToConnectAction(idRoom));
          dispatch(setMessagesAction(message));
        });
      })
      .catch((error) => console.log("error eb la url", error));
  }

  const handleClickDeleteUser = (friend) => {
    const deletefriend = async () => {
      await clienteAxios
        .post(`${process.env.REACT_APP_SERVER_HEROKU}/api/deletefriends/`, {
          friend,
        })
        .then((resp) => {
          if (resp.status === 200) {
            // todo salio bien
          } else {
            // todo salio mal
          }
        });
    };
    deletefriend();
  };

  return {
    message,
    circle,
    tiempo,
    visible,
    messages,
    roomSelected,
    setMessage,
    socketRef,
    handleSubmitMessage,
    handleClickDeleteUser,
    closeSesion,
    handleScroll,
    handleClickRoom,
  };
}
