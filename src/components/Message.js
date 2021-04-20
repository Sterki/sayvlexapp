import React from "react";
import "./../scss/chat.scss";
import Avatar from "@material-ui/core/Avatar";

export default function Message({ message }) {
  return (
    <div className="chat__message">
      <div className="chat__avatar">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <p>{message.message}</p>
      </div>
      <div className="chat__date">
        <p>{new Date(message.created).toTimeString().slice(0, 8)}</p>
      </div>
    </div>
  );
}
