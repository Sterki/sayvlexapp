import clienteAxios from "../config/axios";
import {
  CREATE_NEW_USER,
  ROOM_SELECTED,
  ROOM_TO_CONNECT,
  SET_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_ARRAY,
  GET_USER_LOGED,
  CLOSE_SESION,
  GET_SIGN_IN_USER,
  LOGIN_ERROR,
} from "../types";
import tokenAuth from "./../config/tokenAuth";

export function roomSelectedAction(roomselected) {
  return (dispatch) => {
    dispatch(setRoomSelected(roomselected));
  };
}
const setRoomSelected = (roomselected) => ({
  type: ROOM_SELECTED,
  payload: roomselected,
});

export function roomToConnectAction(room) {
  return (dispatch) => {
    dispatch(setRoomToConnect(room));
  };
}
const setRoomToConnect = (room) => ({
  type: ROOM_TO_CONNECT,
  payload: room,
});
export function setMessagesAction(messages) {
  return (dispatch) => {
    dispatch(setMessages(messages));
  };
}
const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});
export function setMessageAction(message) {
  return (dispatch) => {
    dispatch(setMessage(message));
  };
}
const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
export function setMessageArrayAction() {
  return (dispatch) => {
    dispatch(setMessageArray());
  };
}
const setMessageArray = () => ({
  type: SET_MESSAGE_ARRAY,
});

export function createNewUserAction(token) {
  return (dispatch) => {
    dispatch(createNewUser(token));
    dispatch(getUserLogedAction());
  };
}
const createNewUser = (token) => ({
  type: CREATE_NEW_USER,
  payload: token,
});

export function signInAction(user) {
  return (dispatch) => {
    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((respJson) => {
            // console.log(respJson);
            dispatch(getSignInUser(respJson));
            dispatch(getUserLogedAction());
          });
        } else {
          resp.json().then((respJson) => {
            let errorlogin = respJson.msg;
            dispatch(loginErrorAction(errorlogin));
            setTimeout(() => {
              dispatch(loginErrorAction(null));
            }, 1700);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const getSignInUser = (token) => ({
  type: GET_SIGN_IN_USER,
  payload: token,
});
export function getUserLogedAction() {
  const token = localStorage.getItem("token");
  if (token) {
    // here we are going to send the token throw the headers
    tokenAuth(token);
  }
  return async (dispatch) => {
    if (token) {
      try {
        const result = await clienteAxios.get("api/users");
        dispatch(getUserLoged(result.data.user));
      } catch (error) {
        console.log(error);
      }
    }
  };
}
const getUserLoged = (user) => ({
  type: GET_USER_LOGED,
  payload: user,
});

export function closeSesionAction() {
  return (dispatch) => {
    dispatch(closeSesion());
  };
}
const closeSesion = () => ({
  type: CLOSE_SESION,
});
export function loginErrorAction(error) {
  return (dispatch) => {
    dispatch(loginError(error));
  };
}
const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});
