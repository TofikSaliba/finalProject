import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
  notifications: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      accepted: {
        type: Boolean,
      },
      reviewed: {
        type: Boolean,
      },
    },
  ],
  unRead: {
    type: Number,
    required: true,
    default: 0,
  },
});

export { notificationsSchema };
