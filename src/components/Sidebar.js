import React from "react";
import "./../scss/sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Friends from "./Friends";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <p>Wellcome: Alex Rodriguez</p>
          <div className="sidebar__icons">
            <NotificationsIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="sidebar__title">
          <h1>Friend List</h1>
          <AddIcon />
        </div>
        <div className="sidebar__friendlist">
          <Friends />
          <Friends />
        </div>
      </div>
    </div>
  );
}
