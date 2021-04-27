import { ADD_FRIEND, CHATING_WITH, GET_FRIENDS_LIST } from "../types";
import clienteAxios from "./../config/axios";

export function addFriendAction(user) {
  return async (dispatch) => {
    try {
      await clienteAxios.post("api/friendlist", user).then((resp) => {
        if (resp.status === 200) {
          dispatch(addFriend(resp.data));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
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
