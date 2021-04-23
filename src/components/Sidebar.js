import React, { useState } from "react";
import "./../scss/sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Friends from "./Friends";
import Modal from "./Modal";
import { LightTooltip } from "./ui/tooltip";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
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
            <LightTooltip title="Add friends" arrow={true}>
              <AddIcon onClick={() => setOpen(true)} />
            </LightTooltip>
          </div>
          <div className="sidebar__friendlist">
            <Friends />
            <Friends />
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} />
    </>
  );
}
