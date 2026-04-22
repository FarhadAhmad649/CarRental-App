import React from "react";
import { motion } from "framer-motion";

function Subscription() {
  return (
    <section className="my-30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-1 mb-8 justify-center items-center text-center"
      >
        <h1 className="text-3xl md:text-4xl font-medium">Never Miss a Deal!</h1>

        <p className="text-sm text-gray-600 max-w-md">
          Subscribe to get the latest offers, new arrivals and exclusive
          discounts.
        </p>

        {/* Input Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="my-10 border border-gray-300 rounded-md flex overflow-hidden max-w-md w-full"
        >
          <input
            className="flex-1 px-4 text-sm outline-none"
            type="email"
            placeholder="Enter your email id"
          />
          <motion.button
            whileHover={{ backgroundColor: "#1e3a8a" }} // Adjust to your primary dark shade
            whileTap={{ scale: 0.95 }}
            className="bg-(--color-primary) text-white text-sm px-8 py-3 transition-colors"
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Subscription;
