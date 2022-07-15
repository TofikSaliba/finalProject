import { User } from "../models/user/user.model.js";
import { UserChat } from "../models/userChat/userChat.model.js";

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

export const addMsgFromServer = async (fromID, toID, message, sender) => {
  try {
    const fromUser = await UserChat.findById(fromID);
    const toUser = await User.findById(toID);
    if (!toUser || !fromUser) throw new Error("one or both users not found");

    const recipent1 = fromUser.chat.find((recipent) => {
      return recipent.recipentID.toString() === toID;
    });
    if (recipent1) {
      recipent1.messages.push({ text: message, sender });
      ++recipent1.unRead;
    } else {
      fromUser.chat.push({
        recipentID: toID,
        recipentName: toUser.name,
        messages: [{ text: message, sender }],
        unRead: 0,
      });
    }
    await fromUser.save();
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const userChat = await UserChat.findById(req.user._id);
    res.status(200).json({ userChat });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
