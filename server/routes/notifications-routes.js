import express from "express";
import { auth } from "../middleware/auth/auth.js";

import { getUserNotifications } from "../controllers/notifications.controllers.js";

const notificationsRouter = express.Router();

notificationsRouter.get("/getUserNotifications", auth, getUserNotifications);

export { notificationsRouter };
