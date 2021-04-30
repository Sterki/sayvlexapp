import React, { useState } from "react";
import "./../scss/chat.scss";
import { useChat } from "../hooks/useChat";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

export default function Chat() {
  const [emoticon, setEmoticon] = useState(false);

  const roomSelectedRedux = useSelector((state) => state.user.roomSelected);

  const roomRedux = useSelector((state) => state.user.roomsRedux);
  const messages = useSelector((state) => state.user.messages);

  const {
    message,
    visible,
    circle,
    setMessage,
    handleSubmitMessage,
    handleScroll,
  } = useChat();

  const onEmojiClick = (event, emojiObject) => {
    let input = document.getElementById("inputchat");
    console.log(input);
    input.value = emojiObject.emoji;
    // setMessage(emojiObject);
    // setMessage(emojiObject);
    console.log(emojiObject);
    setMessage((prevState) => prevState + input.value);
    console.log(message);
  };

  const handleClickOpenEmoticon = (e) => {
    if (!emoticon) {
      setEmoticon(true);
    } else {
      setEmoticon(false);
    }
  };
  return (
    <div className="chat">
      <div className="chat__container">
        <form className="chat__formular" onSubmit={handleSubmitMessage}>
          {roomSelectedRedux === roomRedux ? (
            <>
              <div
                className="chat__content"
                id="myChat"
                onScroll={handleScroll}
              >
                {circle ? (
                  <div className="chat__circle">
                    <CircularProgress />
                  </div>
                ) : null}
                {messages?.slice(visible).map((message) => (
                  <Message key={message._id} message={message} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="chat__content" id="myChat"></div>
            </>
          )}
          {roomRedux ? (
            <>
              {emoticon ? (
                <div className="chat__emoji">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              ) : null}

              <div className="chat__input">
                <input
                  type="text"
                  id="inputchat"
                  name="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                />
                <div className="chat__emojibutton">
                  <EmojiEmotionsIcon onClick={handleClickOpenEmoticon} />
                </div>

                <button type="submit">
                  <SendIcon />
                </button>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}
