import mongoose from "mongoose";
import { notificationsSchema } from "./notifications.schema.js";

const Notifications = mongoose.model("Notifications", notificationsSchema);

export { Notifications };
