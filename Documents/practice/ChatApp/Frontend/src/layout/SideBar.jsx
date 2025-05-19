import { setReceiver } from "@/redux/Slice/userSlice";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SideBar({ toggle, setToggle, socket, socketInstanse }) {
  const [items, setItems] = useState([]);
  const senderID = localStorage.getItem("id");
  const uname = localStorage.getItem("name");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/all-users");
      if (res.status == 200) {
        setItems(res.data);
      }
      console.log(items);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleLogin = (userId) => {
      setItems((prevItems) =>
        prevItems.map((elem) =>
          elem._id === userId ? { ...elem, isLogin: true } : elem
        )
      );
    };

    const handleLogout = (id) => {
      setItems((prevItems) =>
        prevItems.map((elem) =>
          elem._id === id ? { ...elem, isLogin: false } : elem
        )
      );
    };

    socket?.on("login", handleLogin);

    socket?.on("logout", handleLogout);

    return () => {
      socket?.off("login", handleLogin);
      socket?.off("logout", handleLogout);
    };
  }, [socket, socketInstanse]);

  async function handleUser(user) {
    dispatch(setReceiver(user));
    await axios.post("http://localhost:3000/add-relation", {
      sender: senderID,
      receiver: user._id,
    });
  }

  return (
    <>
      <div className={`bg-gray-200 ${toggle ? "hidden" : ""}`}>
        <div className="float-end m-5">
          <button
            className=" fa-solid fa-greater-than"
            onClick={() => setToggle(true)}
          ></button>
        </div>
        <div className={`mt-[50%]`}>
          {items.map((elem, i) =>
            elem.username !== uname ? (
              <div
                key={i}
                className="border-b-1 border-white flex items-center  gap-3 my-5 py-2 mx-3 cursor-pointer"
                onClick={() => handleUser(elem)}
              >
                <img
                  src={elem.profile_image || "/user.avif"}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div>
                  {elem.username} <span>{elem.isLogin ? "Active" : ""}</span>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <button
        className={`${
          toggle
            ? "flex align-middle justify-center mt-4 text-[23px] bg-grey-200"
            : "hidden"
        }`}
        onClick={() => setToggle(false)}
      >
        <i className={`flex fa-solid fa-bars bg-grey-200`}></i>
      </button>
    </>
  );
}

export default SideBar;
