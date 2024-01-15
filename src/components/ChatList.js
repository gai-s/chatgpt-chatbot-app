import React from "react";
import Loading from "../img/typing-loading.gif";
import CricketImg2 from "../img/jiminy-cricket-greenish.png";
import PinoccioAndCricketImg from "../img/nose1.png";
import truthGif from "../img/truth-gif.gif";

const ChatList = ({ chatMessages, loading }) => {
  return (
    <div className="chat-container">
      <nav className="left-nav">
        <img src={PinoccioAndCricketImg} alt="" />
        <img src={CricketImg2} alt="" />
      </nav>
      <div className="list-items">
        {!chatMessages.length ? (
          <img className="gif-img" src={truthGif} alt="" />
        ) : (
          chatMessages.map((message, index) => (
            <div
              key={index}
              className={`list-item-container ${
                message.role === "user" ? "user" : "bot"
              }`}
            >
              <div
                className={`list-avatar ${
                  message.role === "user" ? "user-avatar" : "bot-avatar"
                }`}
              ></div>
              <div
                className={`list-item ${
                  message.role === "user" ? "question" : "answer"
                }`}
              >
                <p style={{ whiteSpace: "pre-line" }}>{message.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <img
            alt="loading"
            src={Loading}
            className="loading"
            style={{ width: "200px", textAlign: "start" }}
          />
        )}
      </div>
      <nav className="right-nav">
        <img src={CricketImg2} alt="" />
        <img src={PinoccioAndCricketImg} alt="" />
      </nav>
    </div>
  );
};

export default ChatList;

// Rest of the code...
