import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
  notifications: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      accept: {
        type: String,
      },
      markerID: {
        type: String,
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
  helper: {
    type: Boolean,
    required: true,
  },
});

export { notificationsSchema };
