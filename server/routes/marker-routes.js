import express from "express";

import {
  addMarker,
  getAllMarkers,
  deleteMarker,
} from "../controllers/marker.controllers.js";

const markerRouter = express.Router();

markerRouter.post("/addMarker", addMarker);
markerRouter.get("/getAllMarkers", getAllMarkers);
markerRouter.delete("/deleteMarker/:id", deleteMarker);

export { markerRouter };
