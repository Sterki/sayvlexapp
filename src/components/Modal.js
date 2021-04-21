import React from "react";
import "./../scss/modal.scss";
import CloseIcon from "@material-ui/icons/Close";
import { motion } from "framer-motion";

const containerVarianst = {
  hidden: { x: "50vw", opacity: 0 },
  show: {
    x: "0vw",
    opacity: 1,
    transition: { delay: 0.3, ease: "easeOut" },
  },
};
export default function Modal({ open, setOpen }) {
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
          <form className="modal__form">
            <div className="modal__input">
              <input type="text" placeholder="Search by Username" />
              <button className="modal__button">Search</button>
            </div>
            <div className="modal__results">
              <p>results here!</p>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}
