import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setLogout, setConnected }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("name");

  async function handleLogout() {
    navigate("/login");
    setLogout(true);
    setConnected(false);
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
