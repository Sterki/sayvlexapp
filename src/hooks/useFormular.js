import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewUserAction, signInAction } from "../actions/usersAction";
import { useHistory } from "react-router-dom";

export function useFormular(inisialState) {
  // here the fancy code to set de users!
  const [user, setUser] = useState(inisialState);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

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
    if (user.username.trim() === "") {
      setError("The username is required!");
      setTimeout(() => {
        setError("");
      }, 1700);
    } else if (user.name.trim() === "") {
      setError("The name is required!");
      setTimeout(() => {
        setError("");
      }, 1700);
    } else if (user.password.length < 6) {
      setError("The password need to be atleast 6 characters!");
      setTimeout(() => {
        setError("");
      }, 1700);
    } else if (user.password !== user.confirm) {
      setError("The passwords doesnt match!, try again");
      setTimeout(() => {
        setError("");
      }, 1700);
    } else {
      fetch(`${process.env.REACT_APP_SERVER_HEROKU}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((respJson) => {
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
                dispatch(createNewUserAction(respJson));
                history.push("/panel");
              }, 1500);
            });
          } else {
            resp.json().then((respJson) => {
              if (respJson.msg) {
                setError(respJson.msg);
                setTimeout(() => {
                  setError("");
                }, 1700);
              } else {
                if (respJson.errors.length > 0) {
                  respJson.errors.forEach((error) => {
                    if (error.param.includes("email")) {
                      setError(error.msg);
                      setTimeout(() => {
                        setError("");
                      }, 1700);
                    }
                  });
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
          console.log("error en la url");
        });
    }
  }
  function handleChangeSignin(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function sigInUser(e) {
    e.preventDefault();
    if (user.email.trim() === "" || user.password.trim() === "") {
      setError("All the fields are required");
      setTimeout(() => {
        return setError("");
      }, 1500);
    } else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(signInAction(user));
        history.push("/panel");
      }, 1800);
    }
  }
  return {
    checked,
    open,
    error,
    handleChangeFormular,
    handleSubmitUserForm,
    handleChange,
    handleChangeSignin,
    sigInUser,
  };
}
