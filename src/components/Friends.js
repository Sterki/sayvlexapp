import React, { useEffect, useState } from "react";
import "./../scss/friends.scss";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { getFriendListAction } from "../actions/friendsAction";
import FriendsList from "./FriendsList";

export default function Friends() {
  const dispatch = useDispatch();
  const { handleClickRoom } = useChat();
  const friends = useSelector((state) => state.user.friends);
  const userAuth = useSelector((state) => state.user.userAuth);

  useEffect(() => {
    if (userAuth) {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/friendlist/${userAuth?._id}`
      )
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((respJson) => {
              dispatch(getFriendListAction(respJson));
            });
          } else {
            resp.json().then((respFalse) => {
              console.log(respFalse);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("error en la url");
        });
    }
  }, [dispatch]);

  return (
    <div className="friends">
      <div className="friends__container">
        <div className="friends__info">
          {friends?.map((friend) => (
            <FriendsList
              key={friend.id}
              friend={friend}
              handleClickRoom={handleClickRoom}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
