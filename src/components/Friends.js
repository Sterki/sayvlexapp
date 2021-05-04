import React, { useEffect } from "react";
import "./../scss/friends.scss";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { getFriendListAction } from "../actions/friendsAction";
import FriendsList from "./FriendsList";
import clienteAxios from "./../config/axios";

export default function Friends() {
  const dispatch = useDispatch();
  const { handleClickRoom, handleClickDeleteUser, tiempo } = useChat();
  const friends = useSelector((state) => state.user.friends);
  const userAuth = useSelector((state) => state.user.userAuth);

  useEffect(() => {
    let isMounted = true;
    if (userAuth) {
      const getfriendlist = async () => {
        await clienteAxios
          .get(`/api/friendlist/${userAuth?._id}`)
          .then((resp) => {
            if (resp.status === 200) {
              if (isMounted) {
                dispatch(getFriendListAction(resp.data));
              }
            }
          })
          .catch((error) => {
            console.log("error en la url", error);
          });
      };
      getfriendlist();
      return () => {
        isMounted = false;
      };
    }
  }, [dispatch, userAuth]);

  return (
    <div className="friends">
      <div className="friends__container">
        <div className="friends__info">
          {friends?.map((friend) => (
            <FriendsList
              key={friend._id}
              friend={friend}
              handleClickRoom={handleClickRoom}
              tiempo={tiempo}
              handleClickDeleteUser={handleClickDeleteUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
