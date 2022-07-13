import { Notifications } from "../models/notifications/notifications.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.findById(req.user._id);
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
