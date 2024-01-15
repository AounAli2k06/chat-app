import React, { useState } from "react";
import styles from "./join.module.css";
import { useNavigate } from "react-router-dom";

let user = "";

const Join = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const joinHandler = () => {
    if (name.trim() === "") {
        return alert("you have to write a name")
    }
    user = name
    setName("")
    navigate("/chat")
  };
  return (
    <div className={styles["join-page"]}>
      <div className={styles["join-container"]}>
        <h1>chat</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className={styles.input}
          placeholder="Enter your name"
        />
        <button onClick={joinHandler} className={styles["join-btn"]}>Join</button>
      </div>
    </div>
  );
};
export{user}
export default Join;