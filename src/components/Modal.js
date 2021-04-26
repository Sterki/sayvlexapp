import React from "react";
import "./../scss/modal.scss";

import CloseIcon from "@material-ui/icons/Close";
import { motion } from "framer-motion";
import { useModal } from "./../hooks/useModal";
import { Avatar } from "@material-ui/core";

const containerVarianst = {
  hidden: { x: "50vw", opacity: 0 },
  show: {
    x: "0vw",
    opacity: 1,
    transition: { delay: 0.3, ease: "easeOut" },
  },
};
const STATE_INICIAL = {
  username: "",
};
export default function Modal({ open, setOpen }) {
  const {
    error,
    search,
    handleChange,
    handleSearchFriend,
    handleClickSubmit,
  } = useModal(STATE_INICIAL);

  return (
    <>
      {open && (
        <motion.div
          className="modal"
          variants={containerVarianst}
          initial="hidden"
          animate="show"
        >
          <CloseIcon onClick={() => setOpen(false)} />
          <form className="modal__form" onSubmit={handleSearchFriend}>
            <div className="modal__input">
              <input
                type="text"
                placeholder="Search by Username"
                name="username"
                onChange={handleChange}
              />
              <button className="modal__button" type="submit">
                Search
              </button>
            </div>
          </form>
          {search ? (
            <div className="modal__results">
              <div className="modal__avatar">
                <Avatar
                  alt={search?.username}
                  src="/static/images/avatar/1.jpg"
                />
                <span>{search?.username}</span>
              </div>
              <div className="modal__add">
                <button
                  className="modal__button"
                  onClick={(e) => handleClickSubmit(search)}
                >
                  Add as Friend
                </button>
              </div>
            </div>
          ) : null}
          {error ? (
            <div className="modal__error">
              <span>{error.msg}</span>
            </div>
          ) : null}
        </motion.div>
      )}
    </>
  );
}
