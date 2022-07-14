import { Marker } from "../models/markers/marker-model.js";

import { io } from "../../socket.js";

export const addMarker = async (req, res) => {
  try {
    const newMarker = new Marker(req.body);
    await newMarker.save();
    res.status(201).json({ newMarker });
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
};

export const deleteMarker = async (req, res) => {
  try {
    const toDelete = await Marker.findByIdAndRemove(req.params.id);
    io.emit("updateMarkersOrNotifs");
    res.status(202).json({ deletedMarker: toDelete });
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
};

export const getAllMarkers = async (req, res) => {
  try {
    const markers = await Marker.find({});
    const filteredExpired = markers.filter((marker) => {
      if (marker.expire <= Date.now()) {
        marker.remove();
        return false;
      }
      return true;
    });
    if (filteredExpired.length !== markers.length) {
      io.emit("updateMarkersOrNotifs");
    }
    res.status(200).json({ markers: filteredExpired });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
