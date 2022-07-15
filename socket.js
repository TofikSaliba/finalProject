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

  socket.on("sendMessage", async ({ to, message }) => {
    await addMsgFromServer(to, id, message, false);
    addMsgFromServer(id, to, message, true);
    socket.to(to).emit("receiveMessage", { msg: message });
  });

  socket.on("markerAdded", async () => {
    const usersNotifs = await Notifications.find({});
    for (const user of usersNotifs) {
      if (user._id.toString() !== id && user.helper) {
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

  socket.on("offerHelp", async ({ to, markerID }) => {
    const userNotifs = await Notifications.findById(to);
    userNotifs.notifications.unshift({
      userID: id,
      name,
      accept: "deciding",
      markerID,
    });
    ++userNotifs.unRead;
    await userNotifs.save();
    socket.to(to).emit("updateMarkersOrNotifs");
  });

  socket.on("responseToOffer", async ({ res, notObj }) => {
    let notifData = { _id: notObj._id };
    let dataToBeUpdated = { ...notObj, accept: res };
    const updated = await Notifications.findOneAndUpdate(
      { "notifications._id": notifData._id },
      { $set: { "notifications.$": dataToBeUpdated } }
    );
    const responseToUser = await Notifications.findById(notObj.userID);
    responseToUser.notifications.unshift({
      userID: id,
      name,
      accepted: res === "yes" ? true : false,
    });
    ++responseToUser.unRead;
    await responseToUser.save();
    socket.to(notObj.userID).emit("updateMarkersOrNotifs");
  });

  socket.on("reviewNotification", async ({ toID }) => {
    const userNotifs = await Notifications.findById(toID);
    userNotifs.notifications.unshift({
      userID: id,
      name,
      reviewed: true,
    });
    ++userNotifs.unRead;
    await userNotifs.save();
    socket.to(toID).emit("updateMarkersOrNotifs");
  });
});
