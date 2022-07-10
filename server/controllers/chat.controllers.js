import { User } from "../models/user/user.model.js";

export const addMsg = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    const recipent = user.chat.find((recipent) => {
      return recipent._id.toString() === req.body.recipentID;
    });
    if (recipent) {
      recipent.messages.push(req.body.message);
    } else {
      user.chat.push({
        _id: req.body.recipentID,
        recipentName: req.body.name,
        messages: [req.body.message],
      });
    }
    await user.save();
    res.json({ updatedUser: user });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
