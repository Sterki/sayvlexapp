import React, { useEffect, useRef, useState } from "react";
import "./../scss/chat.scss";
import socketIoClient from "socket.io-client";

export function useChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState(null);
  const [roomSelected, setRoomSelected] = useState("");
  const socketRef = useRef();

  const SOCKET_NODEURL = "http://localhost:4000";
  const ROOM_TO_CONNECT = "roomTest";
  const RECIVO_MENSAJE = "recivoMensaje";

  useEffect(() => {
    socketRef.current = socketIoClient(SOCKET_NODEURL, {
      query: { rooms: rooms },
    });
    // recibimos los mensajes desde el server con socketio

    socketRef.current.on(RECIVO_MENSAJE, (data) => {
      const { info, room } = data;
      console.log("El room es :", room);
      setRoomSelected(room);
      setMessages(info);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, rooms]);

  function handleSubmitMessage(e) {
    e.preventDefault();
    socketRef.current.emit(ROOM_TO_CONNECT, {
      mensaje: message,
      userId: socketRef.current.id,
    });
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
  function closeSesion() {
    socketRef.current.disconnect();
    setRooms(null);
  }

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
    messages,
    rooms,
    roomSelected,
    setMessage,
    handleSubmitMessage,
    closeSesion,
    handleClickRoom,
    handleClickRoom2,
    handleClickRoom3,
  };
}
