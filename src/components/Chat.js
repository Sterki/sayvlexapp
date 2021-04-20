import React from "react";
import "./../scss/chat.scss";
import { useChat } from "../hooks/useChat";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { setMessageAction } from "../actions/usersAction";
import Message from "./Message";

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
            <div className="chat__content">
              {roomRedux ? (
                <>
                  <h1>Wellcome to the Room : {roomRedux}</h1>
                </>
              ) : (
                <h1>Select a room to start a conversation!</h1>
              )}
            </div>
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
              <button type="submit">Send Message</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
