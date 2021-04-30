import {
  ADD_FRIEND,
  CHATING_WITH,
  CLOSE_SESION,
  CREATE_NEW_USER,
  ERROR_FRIEND_EXIST,
  GET_FRIENDS_LIST,
  GET_SIGN_IN_USER,
  GET_USER_LOGED,
  LOGIN_ERROR,
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
  friends: [],
  chatingwith: null,
  errorlogin: null,
  errorfriend: null,
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

    case GET_FRIENDS_LIST:
      return {
        ...state,
        friends: action.payload,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case CHATING_WITH:
      return {
        ...state,
        chatingwith: action.payload,
      };
    case ERROR_FRIEND_EXIST:
      return {
        ...state,
        errorfriend: action.payload,
      };
    case CLOSE_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        userAuth: null,
        chatingwith: null,
        autenticate: false,
        roomSelected: null,
        roomsRedux: null,
        messages: [],
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errorlogin: action.payload,
      };
    default:
      return state;
  }
}
export default userReducer;
