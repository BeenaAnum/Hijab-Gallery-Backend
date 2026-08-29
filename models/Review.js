import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    style: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HijabStyle",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

// One review per user per style
reviewSchema.index({ style: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
