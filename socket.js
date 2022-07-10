import http from "http";
import { app } from "./server/app.js";
import { Server } from "socket.io";

export const server = http.createServer(app);
const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000";
const io = new Server(server, {
  cors: {
    origin: URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(`new websocket connection on ${id}`);

  socket.on("sendMessage", ({ to, message }) => {
    console.log(to, message);
    socket.to(to).emit("receiveMessage", { msg: message });
  });

  socket.on("tofik", ({ message }, callback) => {
    console.log(message);
    callback(id);
    socket.to(id).emit("receive", `the ID is ${id}`);
  });
});
