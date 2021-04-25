import {
  CLOSE_SESION,
  CREATE_NEW_USER,
  GET_SIGN_IN_USER,
  GET_USER_LOGED,
  ROOM_SELECTED,
  ROOM_TO_CONNECT,
  SET_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_ARRAY,
} from "../types";

const inisialState = {
  userAuth: null,
  autenticate: null,
  roomSelected: null,
  roomsRedux: null,
  messages: [],
  message: "",
  token: null,
};

function userReducer(state = inisialState, action) {
  switch (action.type) {
    case CREATE_NEW_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        autenticate: true,
      };
    case GET_SIGN_IN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case GET_USER_LOGED:
      return {
        ...state,
        userAuth: action.payload,
        autenticate: true,
      };
    case ROOM_SELECTED:
      return {
        ...state,
        roomSelected: action.payload,
      };
    case ROOM_TO_CONNECT:
      return {
        ...state,
        roomsRedux: action.payload,
      };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_MESSAGE_ARRAY:
      return {
        ...state,
        messages: [],
      };
    case CLOSE_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        userAuth: null,
        autenticate: false,
      };
    default:
      return state;
  }
}
export default userReducer;
