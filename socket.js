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
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(`new websocket connection on ${id}`);

  socket.on("tofik", ({ message }, callback) => {
    console.log(message);
    callback(id);
    io.to(id).emit("receive", `the ID is ${id}`);
  });
});
