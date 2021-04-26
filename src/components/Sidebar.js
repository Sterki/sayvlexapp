import React, { useEffect, useState } from "react";
import "./../scss/sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Friends from "./Friends";
import Modal from "./Modal";
import { LightTooltip } from "./ui/tooltip";
import { useSelector, useDispatch } from "react-redux";
import { closeSesionAction, getUserLogedAction } from "../actions/usersAction";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const userAuth = useSelector((state) => state.user.userAuth);
  const auth = useSelector((state) => state.user.autenticate);

  useEffect(() => {
    if (!auth) {
      history.push("/");
    }
  }, [auth, history]);

  function handleClickCloseSesion() {
    dispatch(closeSesionAction());
    history.push("/");
  }

  const handleClickOpenMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let div = document.getElementById("submenu");
    if (div.style.display === "block") {
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  };

  document.addEventListener(
    "click",
    (e) => {
      let div = document.getElementById("submenu");
      let click = e.target;
      if (div === null) return;
      if (div.style.display === "block" && click !== div) {
        div.style.display = "none";
      }
    },
    false
  );
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__header">
            <p>Wellcome: {userAuth?.username.toUpperCase()}</p>
            <div className="sidebar__icons">
              <NotificationsIcon />
              <MoreVertIcon onClick={handleClickOpenMenu} />
            </div>
            <div className="sidebar__submenu" id="submenu">
              <p>My Profile</p>
              <p onClick={handleClickCloseSesion}>Log out</p>
              <PlayArrowIcon />
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
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} />
    </>
  );
}
