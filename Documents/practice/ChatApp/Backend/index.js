const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const connection = require("./lib/db");
const env = require("dotenv");
const { addMessage } = require("./controller/message");
const { updateState } = require("./controller/userController");

connection();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

env.config();
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/user"));
app.use("/", require("./routes/message"));

const connectedUsers = {};

io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    console.log("a user connected", userId);
    if (!connectedUsers[userId]) {
      connectedUsers[userId] = new Set();
    }

    connectedUsers[userId].add(socket.id);
    updateState({ id: userId, isLogin: true });
    io.emit("login", userId);
  });

  socket.on("message", (msgObj) => {
    addMessage(msgObj);
    const receiverSocketId = connectedUsers[msgObj.receiverID];
    const senderSocketId = connectedUsers[msgObj.senderID];
    socket.emit("message", msgObj.message);
    if (receiverSocketId) {
      receiverSocketId.forEach((sockId) => {
        io.to(sockId).emit("message", msgObj.message);
      });
    }

    if (senderSocketId) {
      senderSocketId.forEach((sockId) => {
        io.to(sockId).emit("message", msgObj.message);
      });
    }
  });

  socket.on("logout", (id) => {
    console.log("logout", id);
    const userSockets = connectedUsers[id];
    console.log("usersockets=============================", userSockets);
    if (userSockets) {
      userSockets.delete(socket.id);
      console.log("inside userSocket");
      if (userSockets.size === 0) {
        delete connectedUsers[id];
        console.log("update data");
        updateState({ id: id, isLogin: false });
        io.emit("logout", id);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("socket is disconnected");
    for (const [userId, socketSet] of Object.entries(connectedUsers)) {
      if (socketSet.has(socket.id)) {
        socketSet.delete(socket.id);

        if (socketSet.size === 0) {
          delete connectedUsers[userId];
          updateState({ id: userId, isLogin: false });
          io.emit("logout", userId);
        }

        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server is Running....");
});
