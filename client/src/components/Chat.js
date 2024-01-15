import React, { useEffect, useState } from "react";
import { user } from "./Join";
import styles from "./Chat.module.css";
import socketIo from "socket.io-client";
import { redirect } from "react-router-dom";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "https://chat-app-api-jade.vercel.app/";

let socket;
const Chat = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [allmessages, setAllMessage] = useState([]);

  const handleSend = () => {
    socket.emit("message", { id, message });
    setMessage("");
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
      console.log("connected");
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setAllMessage(() => {
        return [...allmessages, data];
      });
      console.log(data.user, data.message);
    });

    socket.on("user joined", ({ user, message }) => {
      console.log("in user joined");
      setAllMessage(() => {
        return [...allmessages, { user, message }];
      });
      console.log(user, message);
    });

    socket.on("leave", (data) => {
      setAllMessage(() => {
        return [...allmessages, data];
      });
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setAllMessage(() => {
        return [...allmessages, data];
      });
      console.log(`${data.user} said ${data.message}`);
    });

    return () => {
      socket.off();
    };
  }, [allmessages]);

  return (
    <div className={styles["chat-page"]}>
      <div className={styles["chat-container"]}>
        <div className={styles.header}>
          <h2>
            <a href="/" style={{ textDecoration: "none", color: "#ffd369" }}>
              CHAT
            </a>
          </h2>
        </div>
        <ReactScrollToBottom className={styles.chatbox}>
          {allmessages.map((message, i) => (
            <Message
              key={i}
              message={message.message}
              user={message.id === id ? "" : message.user}
              classs={message.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className={styles.inputbox}>
          <input
            onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Enter your message"
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

export function loader() {
  console.log("i am in loader");
  if (!user.trim()) {
    return redirect("/");
  }
}
