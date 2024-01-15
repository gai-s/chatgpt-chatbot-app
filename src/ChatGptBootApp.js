import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./img/pngegg.png";
import ChatList from "./components/ChatList.js";
import ChatForm from "./components/ChatForm.js";
import Notification from "./img/notification.mp3";
import "./App.css";

function ChatGptBootApp() {
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const openai = useRef(null);
  const audioElement = new Audio(Notification);

  useEffect(() => {
    openai.current = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    toast.error("Something went wrong, please try again later");
  }, []);

  const submitHandler = async (message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);
    setLoading(true);
    try {
      const completion = await openai.current.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...chatMessages, { role: "user", content: message }],
      });
      const completionText = completion.choices[0].message.content;
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: completionText },
      ]);
      setLoading(false);
      audioElement.play();
      console.log(completionText);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(
        "Something went wrong, please try again later. error: " + err,
        { theme: "dark" }
      );
    }
  };

  return (
    <div className="ChatGpt-Boot-app">
      <ToastContainer />
      <header className="App-header">
        Geppetto - ChatGpt Bot
        <a href="https://chat.openai.com/" target="_blank" rel="noreferrer">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
      <main>
        <ChatList chatMessages={chatMessages} loading={loading} />
        <ChatForm submitHandler={submitHandler} />
      </main>
      <div className="footer">
        Copyright © 2024. All RIghts Reserved, OpenAI & GS
      </div>
    </div>
  );
}

export default ChatGptBootApp;
