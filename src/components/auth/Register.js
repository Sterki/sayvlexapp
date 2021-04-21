import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../scss/register.scss";
import Checkbox from "@material-ui/core/Checkbox";
import { motion } from "framer-motion";

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

export default function Register() {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
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
          <h1>Create an Account</h1>
          <label>Name & LastName</label>
          <input type="text" placeholder="Bill gates ..." name="name" />
          <label>Username (Nickname)</label>
          <input type="text" placeholder="DrDisrespect ..." name="username" />
          <label>Email</label>
          <input type="text" placeholder="example@email.com ..." name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Confirm Password</label>
          <input type="password" name="confirm" />
          <button className="register__button">Create an Account</button>
          <div className="register__options">
            <div className="register__checkbox">
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
            </div>

            <p>
              Do you have an Account? <Link to="/">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
