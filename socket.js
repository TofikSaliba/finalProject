import http from "http";
import { app } from "./server/app.js";
import { Server } from "socket.io";

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`new websocket connection on ${socket.id}`);
  let id;
  socket.on("giveId", ({ newId }) => {
    console.log(newId);
    id = newId;
  });

  socket.on("tofik", ({ message }, callback) => {
    console.log(message);
    socket.emit("receive", `the ID is ${id}`);
  });
});