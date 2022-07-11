import express from "express";

import { addMarker, getAllMarkers } from "../controllers/marker.controllers.js";

const markerRouter = express.Router();

markerRouter.post("/addMarker", addMarker);
markerRouter.get("/getAllMarkers", getAllMarkers);

export { markerRouter };
