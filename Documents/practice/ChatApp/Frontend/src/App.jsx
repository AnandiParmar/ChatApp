import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./HOC/PrivateRoute";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";

function App() {
  let socket = useRef(null);
  const senderID = localStorage.getItem("id");
  const { isLogin } = useSelector((state) => state.user);
  const [socketInstanse, setSocketInstanse] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      socket.current = io("http://localhost:3000");

      socket.current.on("connect", () => {
        setSocketInstanse(socket.current);
        socket.current.emit("register", senderID);
      });
    }
  }, [isLogin]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home
                  socketInstanse={socketInstanse}
                  socket={isLogin ? socket.current : null}
                />
              </PrivateRoute>
            }
          >
            <Route
              path="/"
              element={<Chat socket={isLogin ? socket.current : null} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
