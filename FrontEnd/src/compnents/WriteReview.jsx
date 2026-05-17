import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext"; // Added this for auto-refresh

// 1. Changed props to accept 'booking' and 'onClose'
function WriteReview({ booking, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pull fetchReviews so the home page updates instantly
  const { fetchReviews } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Safely extract the exact Car ID from the booking object
    const actualCarId = booking?.carId?._id || booking?.carId;

    if (!actualCarId) {
      toast.error("Could not find the car ID for this review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:8000/api/reviews/add",
        {
          rating: rating,
          comment: comment,
          carId: actualCarId, // 3. Pass the extracted real ID here!
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.data.success) {
        toast.success("Review submitted successfully!");

        // Clear the form
        setRating(0);
        setHoveredRating(0);
        setComment("");

        // Refresh the reviews on the home page
        if (fetchReviews) await fetchReviews();

        // 4. Safely close the modal (Removed the old onSubmit leftover)
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Review Submission Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
        <p className="text-sm text-gray-500">
          Share your experience with this car to help other travelers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Star Rating Interactive UI */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Overall Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="comment"
            className="text-xs font-bold text-gray-400 uppercase tracking-widest"
          >
            Your Experience
          </label>
          <textarea
            id="comment"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you love about this car? How was the handling and comfort?"
            className="w-full border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none bg-gray-50/50"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Post Review"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default WriteReview;
