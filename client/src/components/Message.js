import React from "react";
import styles from "./Message.module.css";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`${styles["message-container"]} ${classs==="left" && styles.left}`}>
        {`${user}: ${message}`}
      </div>
    );
  }
  else{
    return (
      <div className={`${styles["message-container"]} ${classs==="right" && styles.right}`}>
        {`You: ${message}`}
      </div>
    );
    
  }
};

export default Message;
