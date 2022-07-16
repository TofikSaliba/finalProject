import express from "express";
import { auth } from "../middleware/auth/auth.js";

import {
  addMsg,
  getUserMessages,
  resetUnreadCount,
  resetInnerUnreadCount,
} from "../controllers/chat.controllers.js";

const chatRouter = express.Router();

chatRouter.post("/addMsg", addMsg);
chatRouter.get("/getUserMessages", auth, getUserMessages);
chatRouter.put("/resetUnreadCount", auth, resetUnreadCount);
chatRouter.put("/resetInnerUnreadCount", auth, resetInnerUnreadCount);

export { chatRouter };
