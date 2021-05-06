import React, { useState } from "react";
import "./../scss/header.scss";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { LightTooltip } from "./ui/tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useChat } from "../hooks/useChat";
import ErrorIcon from "@material-ui/icons/Error";
import { motion } from "framer-motion";

const containerVarianst = {
  hidden: { x: "50vw", opacity: 0 },
  show: {
    x: "0vw",
    opacity: 1,
    transition: { delay: 0.1, ease: "easeOut" },
  },
};

export default function Header() {
  const chatingwith = useSelector((state) => state.user.chatingwith);
  const [open, setOpen] = useState(false);
  const { handleClickdelete } = useChat();
  function handleClickVisible(e) {
    e.preventDefault();
    e.stopPropagation();
    let div = document.querySelector("#menuoption");
    if (div.style.visibility === "visible") {
      div.style.visibility = "hidden";
    } else {
      div.style.visibility = "visible";
    }
  }

  document.addEventListener(
    "click",
    (e) => {
      let div = document.getElementById("menuoption");
      let click = e.target;
      if (div === null) return;
      if (div.style.visibility === "visible" && click !== div) {
        div.style.visibility = "hidden";
      }
    },
    false
  );

  function handleClickOpenDelete() {
    setOpen(true);
  }
  function handleClickCloseDelete() {
    setOpen(false);
  }
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
            <div className="header__expands">
              <ExpandMoreIcon onClick={handleClickVisible} />
              <div className="header__menu" id="menuoption">
                <p>Add to favorites</p>
                <p onClick={handleClickOpenDelete}>Delete friend</p>
              </div>
            </div>
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
      {open && (
        <motion.div
          className="header__modaldelete"
          variants={containerVarianst}
          initial="hidden"
          animate="show"
        >
          <div className="header__icondelete">
            <ErrorIcon />
          </div>
          <div className="header__textdelete">
            <p>Do u want to delete the user: {chatingwith?.username}</p>
          </div>
          <div className="header__optionesdelete">
            <button
              onClick={(e) => {
                handleClickdelete(
                  chatingwith._id ? chatingwith._id : chatingwith.id
                );
                setOpen(false);
              }}
            >
              Delete
            </button>
            <button onClick={handleClickCloseDelete}>Cancel</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
