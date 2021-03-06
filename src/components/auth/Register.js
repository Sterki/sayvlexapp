import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./../../scss/login.scss";
import Checkbox from "@material-ui/core/Checkbox";
import { motion } from "framer-motion";
import { useFormular } from "./../../hooks/useFormular";
import { useSelector } from "react-redux";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
const INISIAL_STATE = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirm: "",
};
export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const {
    open,
    error,
    checked,
    handleChangeFormular,
    handleSubmitUserForm,
    handleChange,
  } = useFormular(INISIAL_STATE);
  console.log(error);
  const auth = useSelector((state) => state.user.autenticate);

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
          <form className="register__formular" onSubmit={handleSubmitUserForm}>
            <h1>Create an Account</h1>
            {error ? (
              <div className="login__error">
                <p>
                  <WarningIcon />
                </p>
                <span>{error}</span>
              </div>
            ) : null}
            <label>Name & LastName</label>
            <input
              type="text"
              placeholder="Bill gates ..."
              name="name"
              onChange={handleChangeFormular}
            />
            <label>Username (Nickname)</label>
            <input
              type="text"
              placeholder="DrDisrespect ..."
              name="username"
              onChange={handleChangeFormular}
            />
            <label>Email</label>
            <input
              type="text"
              placeholder="example@email.com ..."
              name="email"
              onChange={handleChangeFormular}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChangeFormular}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              onChange={handleChangeFormular}
            />
            <button className="register__button" type="submit">
              Create an Account
            </button>
            <div className="register__options">
              {/* <div className="register__checkbox">
                <Checkbox
                  onChange={handleChange}
                  checked={checked}
                  color="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <label>
                  I certify that I am at least 18 years old of lawful age, and I
                  have read and accept the SAYVLEX-APP terms and conditions.
                </label>
              </div>
              <div className="register__checkbox">
                <Checkbox
                  onChange={handleChange}
                  checked={checked}
                  color="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <label>I have read and accept the Privacy Statement.</label>
              </div> */}

              <p>
                Do you have an Account? <Link to="/">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}
