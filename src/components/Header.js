import React from "react";
import "./../scss/header.scss";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { LightTooltip } from "./ui/tooltip";

export default function Header() {
  const chatingwith = useSelector((state) => state.user.chatingwith);

  return (
    <div className="header">
      <div className="header__container">
        {chatingwith ? (
          <div className="header__icon">
            <Avatar
              alt={chatingwith?.username}
              src="/static/images/avatar/3.jpg"
            />
            <p>Chating with: {chatingwith?.username}</p>
          </div>
        ) : (
          <div className="header__icon">
            <h3>Select a friend to start a conversation</h3>
          </div>
        )}

        <div className="header__options">
          <LightTooltip title="Chat Options" arrow={true}>
            <MoreVertIcon />
          </LightTooltip>
        </div>
      </div>
    </div>
  );
}
