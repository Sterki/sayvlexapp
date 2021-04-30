import React from "react";
import "./../scss/chat.scss";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

export default function Message({ message }) {
  const userAuth = useSelector((state) => state.user.userAuth);
  return (
    <div
      className={
        userAuth?.username.includes(message?.username)
          ? "chat__message"
          : "chat__messagerecibe"
      }
    >
      <div className="chat__avatar">
        <Avatar alt={message.username} src="/static/images/avatar/1.jpg" />
        <div
          className={
            userAuth?.username.includes(message?.username)
              ? "stylesloged"
              : "stylesrecibe"
          }
        >
          <p>{message.message}</p>
        </div>
      </div>
      <div className="chat__date">
        <p>
          {new Date(message.created).toDateString()}{" "}
          {new Date(message.created).toTimeString().slice(0, 8)}
        </p>
      </div>
    </div>
  );
}
