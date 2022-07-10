// Todo

// editProfile,
// logoutAll, ?

import { User } from "../models/user/user.model.js";

export const signUpUser = async (req, res) => {
  try {
    req.body.email = req.body.email.toLowerCase();
    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Must provide email and password!");
    }
    const user = await User.findByCredentials(
      req.body.email.toLowerCase(),
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.json({ message: "successfully logged out!" });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: "successfully logged out from all sessions!" });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.json({
      deletedUser: req.user,
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.json({ requestedUser: req.user });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found!" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowed = ["name", "email", "password"];
    const isValid = updates.every((update) => allowed.includes(update));
    if (!isValid) {
      throw new Error("Invalid updates");
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json({ updatedUser: req.user });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};
