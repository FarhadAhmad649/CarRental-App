import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

function Reviews() {
  const { reviews } = useContext(AppContext);

  // Parent container variants to coordinate children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each review card
      },
    },
  };

  // Individual card variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="my-20 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-1 mb-12 justify-center items-center text-center"
      >
        <h1 className="text-3xl md:text-4xl font-medium">
          What Our Customers Say
        </h1>

        <p className="text-sm text-gray-600 max-w-lg">
          Discover why discerning travelers choose Stay Venture for their luxury
          accommodation around the world.
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {reviews.map((reviewer, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }}
            className="flex flex-col gap-3 p-5 shadow-md hover:shadow-xl rounded-2xl bg-white border border-gray-50 transition-shadow"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                src={assets.boy || reviewer.image} // Fallback to reviewer image if available
                alt={reviewer.name}
              />

              <div className="flex flex-col">
                <p className="text-sm font-semibold">{reviewer.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  {reviewer.location}
                </p>
              </div>
            </div>

            {/* Stars - Using a simple flex row for styling */}
            <div className="flex text-yellow-500 text-xs tracking-tighter">
              {"★".repeat(5)}
            </div>

            <p className="text-xs italic leading-relaxed text-gray-600">
              "{reviewer.comment}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Reviews;
