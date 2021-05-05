import {
  ADD_FRIEND,
  CHATING_WITH,
  ERROR_FRIEND_EXIST,
  GET_FRIENDS_LIST,
  DELETE_FRIEND_FROM_LIST,
} from "../types";
import clienteAxios from "./../config/axios";

export function addFriendAction(user) {
  return async (dispatch) => {
    try {
      await clienteAxios.post("api/friendlist", user).then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          dispatch(addFriend(resp.data));
        }
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch(errorfriendexist(error.response.data.msg));
    }
  };
}
const errorfriendexist = (errorfriend) => ({
  type: ERROR_FRIEND_EXIST,
  payload: errorfriend,
});
const addFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend,
});
export function getFriendListAction(friend) {
  return (dispatch) => {
    dispatch(getFriend(friend));
  };
}
const getFriend = (friend) => ({
  type: GET_FRIENDS_LIST,
  payload: friend,
});

export function chatingwithAction(friend) {
  return (dispatch) => {
    dispatch(chatingwith(friend));
  };
}
const chatingwith = (friend) => ({
  type: CHATING_WITH,
  payload: friend,
});

export function errorfriendAction(erroramigo) {
  return (dispatch) => {
    dispatch(errorfriend(erroramigo));
  };
}
const errorfriend = (erroramigo) => ({
  type: ERROR_FRIEND_EXIST,
  payload: erroramigo,
});

export function deleteFriendAction(id) {
  console.log(id);
  return (dispatch) => {
    dispatch(deleteFriend(id));
  };
}
const deleteFriend = (id) => ({
  type: DELETE_FRIEND_FROM_LIST,
  payload: id,
});
