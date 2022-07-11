import { Marker } from "../models/markers/marker-model.js";

export const addMarker = async (req, res) => {
  try {
    const newMarker = new Marker(req.body);
    await newMarker.save();
    res.status(201).json({ newMarker });
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
};

export const getAllMarkers = async (req, res) => {
  try {
    const Markers = await Marker.find({});
    res.status(200).json({ Markers });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
