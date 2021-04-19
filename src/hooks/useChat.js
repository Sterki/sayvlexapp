import { useEffect, useRef, useState } from "react";
import "./../scss/chat.scss";
import socketIoClient from "socket.io-client";

export function useChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState(null);
  const [roomSelected, setRoomSelected] = useState("");
  const [visible, setVisible] = useState(-20);
  const [circle, setCircle] = useState(false);
  const socketRef = useRef();

  const SOCKET_NODEURL = "http://localhost:4000";
  const ROOM_TO_CONNECT = "roomTest";
  const RECIVO_MENSAJE = "recivoMensaje";
  useEffect(() => {
    // CONEXION DEL SOCKET IO HACIA LOCALHOST PASANDOLE COMO PARAMETRO QUERY EL ROOM ACTUAL
    socketRef.current = socketIoClient(SOCKET_NODEURL, {
      query: { rooms: rooms },
    });
    // recibimos los mensajes desde el server con socketio
    if (rooms !== null) {
      socketRef.current.on(RECIVO_MENSAJE, (data) => {
        console.log(data);
        const { info, room } = data;
        console.log("El room es :", room);
        setRoomSelected(room);
        setMessages(info);
      });
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, rooms]);
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
    socketRef.current.emit(ROOM_TO_CONNECT, {
      mensaje: message,
      userId: socketRef.current.id,
    });
    // FETCH HACIA LA API PARA GUARDAR LOS MENSAJES EN LA BASE DE DATOS
    fetch(`${SOCKET_NODEURL}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        roomname: rooms,
        message: message,
        idsender: socketRef.current.id,
      }),
    });
    setMessage("");
  }
  function handleScroll(e) {
    let div = document.querySelector("#myChat");

    const { scrollTop, scrollHeight, clientHeight } = e.target;

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
    setRooms(null);
  }
  // FUNCION PARA SETEAR EL ROOM ACTUAL Y PODER OBTENER LA DATA DEL ROOM SELECCIONADO
  function handleClickRoom(e) {
    e.preventDefault();
    const ROOM = "room1";
    setMessages([]);
    setRooms(ROOM);
    fetch(`${SOCKET_NODEURL}/api/message/${ROOM}`)
      .then((resp) => {
        resp.json().then((res) => {
          const { message, roomname } = res;
          setRoomSelected(roomname);
          setMessages(message);
        });
      })
      .catch((error) => console.log("error eb la url", error));
  }
  function handleClickRoom2() {
    const ROOM = "room2";
    setMessages([]);
    setRooms(ROOM);
  }
  function handleClickRoom3() {
    const ROOM = "room3";
    setMessages([]);
    setRooms(ROOM);
  }

  return {
    message,
    circle,
    visible,
    messages,
    rooms,
    roomSelected,
    setMessage,
    handleSubmitMessage,
    closeSesion,
    handleScroll,
    handleClickRoom,
    handleClickRoom2,
    handleClickRoom3,
  };
}
