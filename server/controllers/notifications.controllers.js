import { Notifications } from "../models/notifications/notifications.model.js";
import { Marker } from "../models/markers/marker-model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.findById(req.user._id);
    for (let notObj of notifications.notifications) {
      if (["yes", "no", "deciding"].includes(notObj.accept)) {
        const marker = await Marker.findById(notObj.markerID);
        if (!marker) {
          notObj.accept = "expired";
        }
      }
    }
    notifications.save();
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};

export const updateUnRead = async (req, res) => {
  try {
    const userNotifications = await Notifications.findById(req.user._id);
    userNotifications.unRead = 0;
    await userNotifications.save();
    res.status(200).json({ message: "success!" });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
