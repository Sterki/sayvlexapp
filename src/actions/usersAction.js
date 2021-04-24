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

export function getUserLogedAction() {
  const token = localStorage.getItem("token");
  if (token) {
    // here we are going to send the token throw the headers
    tokenAuth(token);
  }
  return async (dispatch) => {
    const result = await clienteAxios.get("api/users");
    dispatch(getUserLoged(result.data.user));
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
