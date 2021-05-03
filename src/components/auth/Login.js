import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../scss/register.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormular } from "./../../hooks/useFormular";
import { useSelector } from "react-redux";

import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
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
const STATE_INICIAL = {
  email: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const {
    open,
    circleopen,
    error,
    handleChangeSignin,
    sigInUser,
  } = useFormular(STATE_INICIAL);
  const auth = useSelector((state) => state.user.autenticate);
  const errorlogin = useSelector((state) => state.user.errorlogin);

  useEffect(() => {
    if (auth) {
      history.push("/panel");
    }
  }, [auth, history]);

  return (
    <>
      <motion.div
        className="register"
        variants={containerVarianst}
        initial="hidden"
        animate="show"
      >
        <div className="register__container">
          <form className="register__formular" onSubmit={sigInUser}>
            <h1>Login</h1>
            {error ? (
              <div className="login__error">
                <p>
                  <WarningIcon />
                </p>
                <span>{error}</span>
              </div>
            ) : null}
            {errorlogin ? (
              <div className="login__error">
                <p>
                  <WarningIcon />
                </p>
                <span>{errorlogin}</span>
              </div>
            ) : null}
            <div className="register__inputs">
              <EmailIcon />
              <input
                type="text"
                placeholder="example@email.com ..."
                name="email"
                onChange={handleChangeSignin}
              />
            </div>
            <div className="register__inputs">
              <VpnKeyIcon />
              <input
                type="password"
                name="password"
                onChange={handleChangeSignin}
              />
            </div>
            <button type="submit" className="register__button">
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
      <div>
        <Backdrop className={classes.backdrop} open={circleopen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}
