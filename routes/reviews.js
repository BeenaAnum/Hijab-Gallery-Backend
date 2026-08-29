import express from "express";
import Review from "../models/Review.js";
import HijabStyle from "../models/HijabStyle.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/reviews/style/:styleId
// Public: list all reviews for a style
router.get("/style/:styleId", async (req, res) => {
  try {
    const reviews = await Review.find({ style: req.params.styleId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
});

// @route   POST /api/reviews/style/:styleId
// Protected: create a review
router.post("/style/:styleId", auth, async (req, res) => {
  try {
    const { rating, text } = req.body;
    const { styleId } = req.params;

    if (!rating || !text) {
      return res.status(400).json({ message: "Rating and text are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const style = await HijabStyle.findById(styleId);
    if (!style) return res.status(404).json({ message: "Style not found" });

    const review = await Review.create({
      style: styleId,
      user: req.user.id,
      userName: req.user.name,
      rating,
      text,
    });

    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "You already reviewed this style. Edit your existing review instead." });
    }
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
});

// @route   PUT /api/reviews/:id
// Protected: update own review
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own review" });
    }

    const { rating, text } = req.body;
    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }
      review.rating = rating;
    }
    if (text) review.text = text;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to update review", error: err.message });
  }
});

// @route   DELETE /api/reviews/:id
// Protected: delete own review
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review", error: err.message });
  }
});

export default router;
