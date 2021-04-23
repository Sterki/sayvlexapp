import React from "react";
import "./../scss/header.scss";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
export default function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__icon">
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <p>Chating with: Donovan Knoledge</p>
        </div>
        <div className="header__options">
          <MoreVertIcon />
        </div>
      </div>
    </div>
  );
}
