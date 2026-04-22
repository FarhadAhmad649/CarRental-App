import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

function About() {
  return (
    <div
      className="my-5 w-full bg-gradient-to-r from-(--color-primary-dull) to-blue-300 pt-10 px-10 
    grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
    >
      {" "}
      {/* Added overflow-hidden to prevent scrollbars during animation */}
      {/* Left Content Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-4 justify-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
          Do You Own a Luxury Car?
        </h1>

        <div className="text-sm md:text-base text-white/90 space-y-2">
          <p>Monetise your vehicle effortlessly by listing it on CarRental.</p>
          <p>
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-white px-10 py-3 text-center text-sm font-semibold w-48 rounded-lg text-(--color-primary) mt-4"
        >
          List your car
        </motion.button>
      </motion.div>
      {/* Right Image Side (The "Driving" Effect) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative"
      >
        <img
          className="w-full h-auto pt-10 md:pt-20 object-contain"
          src={assets.banner_car_image}
          alt="Luxury Car Banner"
        />
      </motion.div>
    </div>
  );
}

export default About;
