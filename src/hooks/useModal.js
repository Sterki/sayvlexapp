import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriendAction, errorfriendAction } from "../actions/friendsAction";

export function useModal(inisialState) {
  const [friend, setFriend] = useState(inisialState);
  const [search, setSearch] = useState(null);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const friendlist = useSelector((state) => state.user.friends);

  const handleChange = (e) => {
    setFriend({ ...friend, [e.target.name]: e.target.value });
  };
  const handleClickSubmit = (user) => {
    dispatch(addFriendAction(user));
  };
  const handleSearchFriend = (e) => {
    e.preventDefault();
    //here the fancy code to search a friend
    dispatch(errorfriendAction(null));
    setSearch(null);
    if (friend.username.trim() !== "") {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/friends`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(friend),
      })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((respJson) => {
              setSpinner(true);
              setTimeout(() => {
                setSpinner(false);
                setSearch(respJson);
              }, 1200);
            });
          } else {
            resp.json().then((respFalse) => {
              setError(respFalse);
              setTimeout(() => {
                setError("");
              }, 1800);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Error en la URL");
        });
    } else {
      setError("The username is required!");
      setTimeout(() => {
        setError("");
      }, 1800);
    }

    if (friendlist.length > 0) {
      friendlist.forEach((element) => {
        if (element.username === friend.username) {
          dispatch(errorfriendAction(element));
        }
      });
    }
  };
  return {
    error,
    search,
    spinner,
    handleChange,
    setSearch,
    handleSearchFriend,
    handleClickSubmit,
  };
}
