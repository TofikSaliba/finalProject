import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  helper: {
    type: Boolean,
    required: true,
  },
  img: {
    type: String,
  },
  age: {
    type: String,
  },
  from: {
    type: String,
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
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
  helpOffered: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  usersToReview: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

export { userSchema };
