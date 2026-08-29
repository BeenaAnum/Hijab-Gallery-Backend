import express from "express";
import HijabStyle from "../models/HijabStyle.js";
import Review from "../models/Review.js";

const router = express.Router();

// @route   GET /api/styles
// Returns all styles with average rating + review count
router.get("/", async (req, res) => {
  try {
    const styles = await HijabStyle.find().sort({ createdAt: -1 }).lean();

    const withRatings = await Promise.all(
      styles.map(async (style) => {
        const stats = await Review.aggregate([
          { $match: { style: style._id } },
          {
            $group: {
              _id: "$style",
              avgRating: { $avg: "$rating" },
              count: { $sum: 1 },
            },
          },
        ]);
        const avgRating = stats[0]?.avgRating ?? 0;
        const reviewCount = stats[0]?.count ?? 0;
        return {
          ...style,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount,
        };
      })
    );

    res.json(withRatings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch styles", error: err.message });
  }
});

// @route   GET /api/styles/:id
router.get("/:id", async (req, res) => {
  try {
    const style = await HijabStyle.findById(req.params.id).lean();
    if (!style) return res.status(404).json({ message: "Style not found" });

    const stats = await Review.aggregate([
      { $match: { style: style._id } },
      {
        $group: {
          _id: "$style",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);
    const avgRating = stats[0]?.avgRating ?? 0;
    const reviewCount = stats[0]?.count ?? 0;

    res.json({
      ...style,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch style", error: err.message });
  }
});

export default router;
