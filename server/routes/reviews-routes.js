import express from "express";

import {
  addReview,
  getUserReviews,
} from "../controllers/reviews.controllers.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/getUserReviews/:id", getUserReviews);
reviewsRouter.post("/addReview/:id", addReview);

export { reviewsRouter };
