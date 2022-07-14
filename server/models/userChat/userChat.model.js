import mongoose from "mongoose";
import { userChatSchema } from "./userChat.schema.js";

const UserChat = mongoose.model("UserChat", userChatSchema);

export { UserChat };
