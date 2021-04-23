import React from "react";
import { Link } from "react-router-dom";
import "./../../scss/register.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const containerVarianst = {
  hidden: {
    x: "60vw",
    opacity: 0,
  },
  show: {
    x: "0vw",
    opacity: 1,
    transition: { delay: 0.2, ease: "easeOut" },
  },
};

export default function Login() {
  const history = useHistory();
  const handleClickLogin = (e) => {
    e.preventDefault();
    history.push("/panel");
  };

  return (
    <motion.div
      className="register"
      variants={containerVarianst}
      initial="hidden"
      animate="show"
    >
      <div className="register__container">
        <form className="register__formular">
          <h1>Login</h1>
          <div className="register__inputs">
            <EmailIcon />
            <input
              type="text"
              placeholder="example@email.com ..."
              name="email"
            />
          </div>
          <div className="register__inputs">
            <VpnKeyIcon />
            <input type="password" name="password" />
          </div>

          <button
            type="submit"
            onClick={handleClickLogin}
            className="register__button"
          >
            Sign In
          </button>
          <div className="register__options">
            <p>
              You dont have an Account?
              <Link to="/register">Create An Account</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
