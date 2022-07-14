import { Reviews } from "../models/reviews/reviews.model.js";

export const addReview = async (req, res) => {
  try {
    const userReviews = await Reviews.findById(req.params.id);
    userReviews.reviews.unshift(req.body);
    await userReviews.save();
    res
      .status(201)
      .json({ message: "success!", addedReview: userReviews.reviews[0] });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const userReviews = await Reviews.findById(req.params.id);
    res.status(200).json({ reviews: userReviews });
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
};
