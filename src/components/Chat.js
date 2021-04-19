import React from "react";
import "./../scss/chat.scss";
import { useChat } from "../hooks/useChat";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Chat() {
  const {
    message,
    visible,
    circle,
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
  } = useChat();
  console.log(messages);
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
            <div className="chat__content" id="myChat" onScroll={handleScroll}>
              <h1>Wellcome to the Room: {rooms}</h1>
              {circle ? (
                <div className="chat__circle">
                  <CircularProgress />
                </div>
              ) : null}
              {messages?.slice(visible).map((message) => (
                <>
                  <div className="chat__message">
                    <div className="chat__avatar">
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <p>{message.message}</p>
                    </div>
                    <div className="chat__date">
                      <p>
                        {new Date(message.created).toTimeString().slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </>
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
