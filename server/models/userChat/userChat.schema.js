import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema({
  chat: [
    {
      recipentName: {
        type: String,
        required: true,
      },
      messages: {
        type: [String],
        required: true,
      },
      unRead: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  unRead: {
    type: Number,
    required: true,
    default: 0,
  },
});

export { userChatSchema };
