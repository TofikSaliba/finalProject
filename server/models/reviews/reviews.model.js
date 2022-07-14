import mongoose from "mongoose";
import { reviewsSchema } from "./reviews.schema.js";

const Reviews = mongoose.model("Reviews", reviewsSchema);

export { Reviews };
