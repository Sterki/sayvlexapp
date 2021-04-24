import React, { useEffect, useState } from "react";
import "./../scss/sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Friends from "./Friends";
import Modal from "./Modal";
import { LightTooltip } from "./ui/tooltip";
import { useSelector, useDispatch } from "react-redux";
import { closeSesionAction } from "../actions/usersAction";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const userAuth = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userAuth) {
      history.push("/");
    }
  }, [userAuth, history]);

  function handleClickCloseSesion() {
    dispatch(closeSesionAction());
    history.push("/");
  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__header">
            <p>Wellcome: {userAuth?.username.toUpperCase()}</p>
            <div className="sidebar__icons">
              <NotificationsIcon />
              <MoreVertIcon onClick={handleClickCloseSesion} />
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
