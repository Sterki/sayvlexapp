import {
  ROOM_SELECTED,
  ROOM_TO_CONNECT,
  SET_MESSAGE,
  SET_MESSAGES,
  SET_MESSAGE_ARRAY,
} from "../types";

const inisialState = {
  user: null,
  roomSelected: null,
  roomsRedux: null,
  messages: [],
  message: "",
};

function userReducer(state = inisialState, action) {
  switch (action.type) {
    default:
      return state;
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
  }
}
export default userReducer;
