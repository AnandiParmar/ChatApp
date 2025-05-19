import { setLogin, setLogout } from "@/redux/Slice/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ socketInstanse }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("name");
  const senderID = localStorage.getItem("id");

  async function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setLogin(false));
    dispatch(setLogout(true));

    socketInstanse?.emit("logout", senderID);
    socketInstanse?.disconnect();
    localStorage.clear();
  }

  return (
    <header className="bg-green-950 h-[60px] flex justify-between items-center gap-4">
      <h4 className="text-white  pl-2 ">{user?.toUpperCase()}</h4>
      <div className="flex gap-2 pr-3">
        <button
          className="text-white pr-2 font-bold hover:underline "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
