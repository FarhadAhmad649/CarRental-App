import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, // Optional: If the review is for a specific car
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
); // timestamps automatically adds createdAt (for the date)

export default mongoose.model("Review", reviewSchema);