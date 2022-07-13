import mongoose from "mongoose";

const markerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  when: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  expire: {
    type: Number,
    required: true,
  },
  coords: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});

export { markerSchema };
