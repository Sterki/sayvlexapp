import React from "react";
import { Avatar } from "@material-ui/core";
import "./../scss/friendlist.scss";

export default function FriendsList({ friend, handleClickRoom }) {
  return (
    <div className="friendlist" onClick={(e) => handleClickRoom(friend)}>
      <div className="friendlist__container">
        <Avatar alt={friend.username} src="/static/images/avatar/1.jpg" />
        <span>{friend.username}</span>
      </div>
      <div className="friends__date">{/* <p>{tiempo.slice(0, 8)}</p> */}</div>
    </div>
  );
}
