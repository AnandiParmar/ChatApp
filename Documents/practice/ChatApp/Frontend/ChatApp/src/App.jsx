import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./HOC/PrivateRoute";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  let socket = useRef(null);
  const senderID = localStorage.getItem("id");
  const [receiver, setReceiver] = useState();
  const [connected, setConnected] = useState(false);
  const [logout, setLogout] = useState(false);
  const [socketInstanse, setSocketInstanse] = useState(null);

  useEffect(() => {
    if (connected) {
      socket.current = io("http://localhost:3000");

      socket.current.on("connect", () => {
        setSocketInstanse(socket.current);
        socket.current.emit("register", senderID);
      });
    }
    if (logout) {
      socket?.current?.emit("logout", senderID);
    }
  }, [connected, logout]);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage socket={socket.current} setConnected={setConnected} />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home
                  setReceiver={setReceiver}
                  setLogout={setLogout}
                  setConnected={setConnected}
                  socketInstanse={socketInstanse}
                  socket={connected ? socket.current : null}
                />
              </PrivateRoute>
            }
          >
            <Route
              path="/"
              element={
                <Chat
                  receiver={receiver}
                  socket={connected ? socket.current : null}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
