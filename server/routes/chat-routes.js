import express from "express";

import { addMsg } from "../controllers/chat.controllers.js";

const chatRouter = express.Router();

chatRouter.post("/addMsg", addMsg);

export { chatRouter };
