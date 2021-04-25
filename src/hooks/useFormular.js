import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUserAction, signInAction } from "../actions/usersAction";
import { useHistory } from "react-router-dom";

export function useFormular(inisialState) {
  // here the fancy code to set de users!
  const [user, setUser] = useState(inisialState);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleChangeFormular(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleChange = (e) => {
    console.log("desde el handleChage");
    setChecked(e.target.checked);
  };
  function handleSubmitUserForm(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => {
        if (resp) {
          resp.json().then((respJson) => {
            dispatch(createNewUserAction(respJson));
            history.push("/panel");
          });
        }
      })
      .catch((error) => console.log(error));
  }
  function handleChangeSignin(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function sigInUser(e) {
    e.preventDefault();
    dispatch(signInAction(user));
    history.push("/panel");
  }
  return {
    checked,
    handleChangeFormular,
    handleSubmitUserForm,
    handleChange,
    handleChangeSignin,
    sigInUser,
  };
}
