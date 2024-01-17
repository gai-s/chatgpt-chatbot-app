import React, { useState } from "react";
import sendIcon from "../img/send-icon.png";

const ChatForm = ({ submitHandler }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) submitHandler(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your message to Gepetto..."
      />
      <button type="submit">
        <img className="send-icon" src={sendIcon} alt="send" target="_blank" />
      </button>
    </form>
  );
};

export default ChatForm;
