import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  reviews: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
});

export { reviewsSchema };
