import { Contact } from "../models/contact/contact.model.js";

export const getForm = async (req, res) => {
  try {
    const addedForm = new Contact(req.body);
    await addedForm.save();

    res.status(201).json({ form: addedForm });
  } catch (error) {
    res.status(404).send("error adding form!");
  }
};
