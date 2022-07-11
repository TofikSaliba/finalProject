import mongoose from "mongoose";

const markerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lat: {
    type: number,
    required: true,
  },
  lng: {
    type: number,
    required: true,
  },
});

export { markerSchema };
