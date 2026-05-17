import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Quote } from "lucide-react"; // Import Quote icon

function Reviews() {
  const { reviews } = useContext(AppContext);

  // Parent container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Individual card variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Helper function for dynamic star ratings
  const renderStars = (rating) => {
    // Default to 5 if no rating is provided
    const validRating = rating || 5;
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < validRating ? "text-yellow-500" : "text-gray-200"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="my-20 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-2 mb-14 justify-center items-center text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h1>
        <p className="text-sm md:text-base text-gray-500 max-w-xl">
          Discover why discerning travelers choose Stay Venture for their luxury
          accommodation around the world.
        </p>
      </motion.div>

      {/* Empty State check */}
      {!reviews || reviews.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          No reviews yet. Be the first to leave one!
        </div>
      ) : (
        /* Reviews Grid */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {reviews.slice(0, 6).map((reviewer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="relative flex flex-col gap-4 p-6 shadow-sm hover:shadow-xl rounded-2xl bg-white border border-gray-100 transition-all duration-300 overflow-hidden group"
            >
              {/* Decorative Quote Icon in background */}
              <Quote className="absolute top-4 right-4 w-12 h-12 text-gray-50 opacity-50 group-hover:text-blue-50 group-hover:scale-110 transition-all z-0" />

              {/* User Info */}
              <div className="relative z-10 flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  src={reviewer.image || assets.boy} // Prioritize actual user image
                  alt={reviewer.name}
                />
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-gray-800">
                    {reviewer.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    {reviewer.location || "Verified Guest"}
                  </p>
                </div>
              </div>

              {/* Stars & Date row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {renderStars(reviewer.rating)}
                </div>
                <span className="text-[10px] text-gray-400">
                  {reviewer.date || "Recently"}
                </span>
              </div>

              {/* Review Text */}
              <p className="relative z-10 text-sm leading-relaxed text-gray-600 line-clamp-4">
                "{reviewer.comment}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Reviews;
