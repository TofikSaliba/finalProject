import http from "http";
import { app } from "./server/app.js";
import { Server } from "socket.io";
import { addMsgFromServer } from "./server/controllers/chat.controllers.js";

export const server = http.createServer(app);
const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000";
export const io = new Server(server, {
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
    addMsgFromServer(to, id, message);
    addMsgFromServer(id, to, message);
    socket.to(to).emit("receiveMessage", { msg: message });
  });

  socket.on("markerAdded", () => {
    io.emit("updateMarkers");
  });
});
