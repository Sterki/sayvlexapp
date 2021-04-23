import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewUserAction } from "../actions/usersAction";

export function useFormular(inisialState) {
  // here the fancy code to set de users!
  const [user, setUser] = useState(inisialState);
  const [checked, setChecked] = useState(false);
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
          });
        }
      })
      .catch((error) => console.log(error));
  }
  return { checked, handleChangeFormular, handleSubmitUserForm, handleChange };
}
