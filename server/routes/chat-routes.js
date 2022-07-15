import express from "express";
import { auth } from "../middleware/auth/auth.js";

import { addMsg, getUserMessages } from "../controllers/chat.controllers.js";

const chatRouter = express.Router();

chatRouter.post("/addMsg", addMsg);
chatRouter.get("/getUserMessages", auth, getUserMessages);

export { chatRouter };
