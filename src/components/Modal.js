import React from "react";
import "./../scss/modal.scss";

import CloseIcon from "@material-ui/icons/Close";
import { motion } from "framer-motion";
import { useModal } from "./../hooks/useModal";
import { Avatar, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

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
  const errorfriend = useSelector((state) => state.user.errorfriend);

  const {
    error,
    search,
    setSearch,
    spinner,
    handleChange,
    handleSearchFriend,
    handleClickSubmit,
  } = useModal(STATE_INICIAL);

  const handleCleanSearch = () => {
    setOpen(false);
    setSearch(null);
  };

  return (
    <>
      {open && (
        <motion.div
          className="modal"
          variants={containerVarianst}
          initial="hidden"
          animate="show"
        >
          <CloseIcon onClick={handleCleanSearch} />
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
          {spinner ? (
            <div className="modal__spinner">
              <CircularProgress />
            </div>
          ) : null}
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
                {errorfriend ? (
                  <button>Delete friend</button>
                ) : (
                  <button
                    className="modal__button"
                    onClick={(e) => handleClickSubmit(search)}
                  >
                    Add as Friend
                  </button>
                )}
              </div>
            </div>
          ) : null}
          {error ? (
            <div className="modal__error">
              <span>{error.msg || error}</span>
            </div>
          ) : null}
        </motion.div>
      )}
    </>
  );
}
