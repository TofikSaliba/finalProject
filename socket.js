import http from "http";
import { app } from "./server/app.js";
import { Server } from "socket.io";
import { addMsgFromServer } from "./server/controllers/chat.controllers.js";
import { Notifications } from "./server/models/notifications/notifications.model.js";

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
  const name = socket.handshake.query.name;
  socket.join(id);
  console.log(`new websocket connection on ${id}`);

  socket.on("sendMessage", ({ to, message }) => {
    addMsgFromServer(to, id, message);
    addMsgFromServer(id, to, message);
    socket.to(to).emit("receiveMessage", { msg: message });
  });

  socket.on("markerAdded", async () => {
    const usersNotifs = await Notifications.find({});
    for (const user of usersNotifs) {
      if (user._id.toString() !== id) {
        user.notifications.unshift({
          userID: id,
          name,
        });
        ++user.unRead;
        await user.save();
      }
    }
    io.emit("updateMarkersOrNotifs");
  });

  socket.on("offerHelp", async ({ to }) => {
    const userNotifs = await Notifications.findById(to);
    userNotifs.notifications.unshift({
      userID: id,
      name,
      accept: "deciding",
    });
    ++userNotifs.unRead;
    await userNotifs.save();
    socket.to(to).emit("updateMarkersOrNotifs");
  });
});
