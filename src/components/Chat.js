import React from "react";
import "./../scss/chat.scss";
import { useChat } from "../hooks/useChat";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";

export default function Chat() {
  const roomSelectedRedux = useSelector((state) => state.user.roomSelected);
  const roomRedux = useSelector((state) => state.user.roomsRedux);
  const messages = useSelector((state) => state.user.messages);
  const {
    message,
    visible,
    circle,
    setMessage,
    handleSubmitMessage,
    handleScroll,
  } = useChat();

  return (
    <div className="chat">
      <div className="chat__container">
        <form className="chat__formular" onSubmit={handleSubmitMessage}>
          {roomSelectedRedux === roomRedux ? (
            <>
              <div
                className="chat__content"
                id="myChat"
                onScroll={handleScroll}
              >
                {circle ? (
                  <div className="chat__circle">
                    <CircularProgress />
                  </div>
                ) : null}
                {messages?.slice(visible).map((message) => (
                  <Message key={message._id} message={message} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="chat__content" id="myChat"></div>
            </>
          )}
          {roomRedux ? (
            <div className="chat__input">
              <input
                type="text"
                name="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />

              <button type="submit">
                <SendIcon />
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
