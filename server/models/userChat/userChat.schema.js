import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema({
  chat: [
    {
      recipentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      recipentName: {
        type: String,
        required: true,
      },
      messages: [
        {
          text: {
            type: String,
            required: true,
          },
          sender: {
            type: Boolean,
            required: true,
          },
        },
      ],
      unRead: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  newMsgUsersIDs: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export { userChatSchema };
