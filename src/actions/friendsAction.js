import { ADD_FRIEND, GET_FRIENDS_LIST } from "../types";
import clienteAxios from "./../config/axios";

export function addFriendAction(user) {
  return async (dispatch) => {
    dispatch(addFriend());
    try {
      await clienteAxios.post("api/friendlist", user).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const addFriend = () => ({
  type: ADD_FRIEND,
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
