import React, { useEffect, useRef, useState } from "react";
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

  console.log(messages);
  console.log(roomSelected);
  return (
    <div className="chat">
      <div className="chat__container">
        <div>
          <button onClick={handleClickRoom}>room1</button>
          <button onClick={handleClickRoom2}>room2</button>
          <button onClick={handleClickRoom3}>room3</button>
        </div>
        <div className="chat__buttonClosesesion">
          <button onClick={closeSesion}>Close Sesion</button>
        </div>
        <form className="chat__formular" onSubmit={handleSubmitMessage}>
          {roomSelected === rooms ? (
            <div className="chat__content">
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
