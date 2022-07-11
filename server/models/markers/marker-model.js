import mongoose from "mongoose";
import { markerSchema } from "./marker-schema.js";

const Marker = mongoose.model("Marker", markerSchema);

export { Marker };
