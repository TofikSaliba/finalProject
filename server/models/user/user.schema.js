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
    },
  ],
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
