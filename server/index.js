const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();

const users = [{}];

app.use(cors());

const port = 4500 || process.env.PORT;

const server = http.createServer(app);

const io = socketIo(server);

app.get("/", (req, res) => {
  res.send("Hell");
});

io.on("connection", (socket) => {
  console.log("hello");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(user, "has joined");

    socket.broadcast.emit("user joined", {
      user: "admin",
      message: `${users[socket.id]} has joined`,
    }
    );

    socket.emit("welcome", {
      user: "admin",
      message: `Welcome to the chat,${users[socket.id]}`,
    });

    socket.on("message", ({ id, message }) => {
      io.emit("sendMessage", { user: users[id], message, id });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("leave", {
        user: "admin",
        message: `${users[socket.id]} left the chat`,
      });
      console.log(user, "left the chat");
    });
  });
});

server.listen(port, () => {
  console.log("server listenin on port", port);
});
