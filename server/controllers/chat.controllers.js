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

export const addMsgFromServer = async (fromID, toID, message) => {
  try {
    const fromUser = await User.findById(fromID);
    const toUser = await User.findById(toID);
    if (!toUser || !fromUser) throw new Error("one or both users not found");

    const recipent1 = fromUser.chat.find((recipent) => {
      return recipent._id.toString() === toID;
    });
    if (recipent1) {
      recipent1.messages.push(message);
    } else {
      fromUser.chat.push({
        _id: toID,
        recipentName: toUser.name,
        messages: [message],
      });
    }
    await fromUser.save();
  } catch (err) {
    console.log(err.message);
  }
};
