import mongoose from "mongoose";

const hijabStyleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model("HijabStyle", hijabStyleSchema);
