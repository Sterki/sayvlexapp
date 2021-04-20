import React from "react";
import { Avatar } from "@material-ui/core";
import "./../scss/friends.scss";
import { useChat } from "../hooks/useChat";

export default function Friends() {
  const { handleClickRoom } = useChat();
  return (
    <div className="friends" onClick={handleClickRoom}>
      <div className="friends__container">
        <div className="friends__info">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <p>Name here!!</p>
        </div>
        <div className="friends__date">
          <p>{new Date().toTimeString().slice(0, 8)}</p>
        </div>
      </div>
    </div>
  );
}
