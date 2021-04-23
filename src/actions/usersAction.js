import {
  CREATE_NEW_USER,
  ROOM_SELECTED,
  ROOM_TO_CONNECT,
  SET_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_ARRAY,
} from "../types";

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
  };
}
const createNewUser = (token) => ({
  type: CREATE_NEW_USER,
  payload: token,
});
