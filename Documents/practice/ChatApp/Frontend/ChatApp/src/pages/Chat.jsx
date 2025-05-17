import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";

import axios from "axios";

function Chat({ receiver, socket }) {
  const [message, setMessage] = useState("");
  console.log("message ", message);

  const [msgArr, setMsgArr] = useState([]);
  const senderID = localStorage.getItem("id");

  async function fetchData() {
    if (receiver) {
      const response = await axios.get(
        `http://localhost:3000/get-messages?rec=${receiver._id}&send=${senderID}`
      );

      if (response.status == 200) {
        setMsgArr(response?.data);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (message) {
      console.log("message in handleSubmit", message);
      await socket.emit("message", {
        message: {
          message: message,
          timestamp: new Date().toISOString(),
          senderID: senderID,
        },
        senderID: senderID,
        receiverID: receiver?._id,
      });
      setMessage("");

      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
    if (receiver && socket && socket.connected) {
      socket.on("message", (newMessage) => {
        setMsgArr((prev) => [...prev, newMessage]);
      });

      return () => {
        socket.off("message");

        setMsgArr([]);
      };
    }
  }, [receiver?._id, socket]);

  return receiver?._id ? (
    <div>
      <div className="h-[55px] bg-gray-50 ">
        <div className="flex float-end items-center gap-5 pr-5 mt-[2px]">
          {receiver ? (
            <img
              src="/user.avif"
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
          ) : (
            ""
          )}

          <p>{receiver?.username}</p>
        </div>
      </div>
      <ul id="messages">
        {msgArr.map((elem, i) => {
          return (
            <li
              key={i}
              className={elem?.senderID == senderID ? "text-end" : "text-start"}
            >
              {elem.message}
            </li>
          );
        })}
      </ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <label htmlFor="input">
          <input
            id="input"
            placeholder="Enter data.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit" style={{ cursor: "pointer" }}>
          Send
        </button>
        <button id="toggle-btn" type="button">
          Disconnect
        </button>
      </form>
    </div>
  ) : (
    <div className="h-full w-full flex items-center justify-center my-[40%] text-4xl font-mono">
      <h1 className="text-center text-gray-400">SELECT USER TO SEND MESSAGE</h1>
    </div>
  );
}

export default Chat;
