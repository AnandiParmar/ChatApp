import Header from "@/layout/Header";
import SideBar from "@/layout/SideBar";

import React, { useState } from "react";

import { Outlet } from "react-router-dom";

function Home({ socket, socketInstanse }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`grid ${
          toggle
            ? "grid-cols-[50px_calc(100%-50px)] h-[50px]"
            : "grid-cols-[15%_85%] h-[99vh]"
        }  `}
      >
        <SideBar
          toggle={toggle}
          setToggle={setToggle}
          socket={socket}
          socketInstanse={socketInstanse}
        />
        <div>
          <Header socketInstanse={socketInstanse} />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
