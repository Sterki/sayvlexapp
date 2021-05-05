import React from "react";
import "./../scss/header.scss";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { LightTooltip } from "./ui/tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useChat } from "../hooks/useChat";

export default function Header() {
  const chatingwith = useSelector((state) => state.user.chatingwith);
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
                <p
                  onClick={(e) =>
                    handleClickdelete(
                      chatingwith._id ? chatingwith._id : chatingwith.id
                    )
                  }
                >
                  Delete friend
                </p>
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
    </div>
  );
}
