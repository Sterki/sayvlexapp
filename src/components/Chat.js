import React, { useEffect } from "react";
import "./../scss/chat.scss";
import { useChat } from "../hooks/useChat";

export default function Chat() {
  const {
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
  } = useChat();

  useEffect(() => {
    console.log("dentro del useffect");
    let div = document.querySelector("#myChat");
    if (div) {
      console.log("haciendo scroll hacia abajo");
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  }, [roomSelected, messages]);
  return (
    <div className="chat">
      <div className="chat__container">
        <div>
          <button
            disabled={rooms === "room1" ? true : false}
            onClick={handleClickRoom}
          >
            room1
          </button>
          <button
            disabled={rooms === "room2" ? true : false}
            onClick={handleClickRoom2}
          >
            room2
          </button>
          <button
            disabled={rooms === "room3" ? true : false}
            onClick={handleClickRoom3}
          >
            room3
          </button>
        </div>
        <div className="chat__buttonClosesesion">
          <button
            onClick={closeSesion}
            disabled={rooms === null ? true : false}
          >
            Close Sesion
          </button>
        </div>
        <form className="chat__formular" onSubmit={handleSubmitMessage}>
          {roomSelected === rooms ? (
            <div className="chat__content" id="myChat">
              <h1>Wellcome to the Room: {rooms}</h1>
              {messages?.map((message) => (
                <>{<p>{message.message}</p>}</>
              ))}
            </div>
          ) : (
            <div className="chat__content">
              {rooms ? (
                <>
                  <h1>Wellcome to the Room : {rooms}</h1>
                </>
              ) : (
                <h1>Select a room to start a conversation!</h1>
              )}
            </div>
          )}
          {rooms ? (
            <div className="chat__input">
              <input
                type="text"
                name="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
              <button type="submit">Send Message</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
