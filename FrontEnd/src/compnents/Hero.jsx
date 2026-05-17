import React, { useState, useRef } from "react";
import { assets, category } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Hero() {
  const [selectedType, setSelectedType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // 1. Create references to directly control the inputs
  const pickupRef = useRef(null);
  const returnRef = useRef(null);

  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-CA");

  const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-CA");
  };

  const minReturnDate = pickupDate ? addOneDay(pickupDate) : today;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedType || !pickupDate || !returnDate) {
      alert("Please select a car type and dates to search.");
      return;
    }
    navigate(
      `/cars?category=${selectedType}&pickup=${pickupDate}&return=${returnDate}`,
    );
  };

  // 2. Safely force the browser to open the calendar using the reference
  const openPicker = (ref) => {
    try {
      if (ref.current && ref.current.showPicker) {
        ref.current.showPicker();
      }
    } catch (error) {
      // Safely ignores any conflicts if the native browser icon is clicked
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-10 pb-4 sm:pt-16 sm:pb-8 md:pt-20 md:pb-12 gap-6 md:gap-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Premium Car Rental
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Drive Your
            <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Dream Car
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1 max-w-md mx-auto">
            Luxury & comfort at your fingertips. Book in seconds.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Car Type */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Car Type
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer bg-gray-800"
                >
                  <option value="" className="bg-gray-800">
                    Select type
                  </option>
                  {category.map((type, index) => (
                    <option key={index} value={type} className="bg-gray-800">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px bg-white/10 self-stretch my-1" />

            {/* Pick-up Date */}
            <div className="flex-1 flex flex-col gap-1">
              <label
                htmlFor="pickupDate"
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1"
              >
                Pick-up Date
              </label>
              <input
                type="date"
                id="pickupDate"
                ref={pickupRef} // <-- Attached Ref
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                onClick={() => openPicker(pickupRef)} // <-- Call with Ref
                className="w-full border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-800 cursor-pointer [color-scheme:dark]"
              />
            </div>

            <div className="hidden sm:block w-px bg-white/10 self-stretch my-1" />

            {/* Return Date */}
            <div className="flex-1 flex flex-col gap-1">
              <label
                htmlFor="returnDate"
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                ref={returnRef} // <-- Attached Ref
                min={minReturnDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                onClick={() => openPicker(returnRef)} // <-- Call with Ref
                className="w-full border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-800 cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="sm:self-end bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Car image */}
        <motion.div
          className="w-full max-w-xl relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: [40, 0, -6, 0, -6, 0] }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.4, 0.6, 0.75, 0.88, 1],
          }}
        >
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-64 h-10 bg-blue-500/20 blur-2xl rounded-full" />
          <img
            src={assets.main_car}
            alt="car"
            className="relative w-full max-h-48 sm:max-h-64 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-6 sm:gap-10 pb-2"
        >
          {[
            { value: "500+", label: "Cars Available" },
            { value: "4.9★", label: "Avg Rating" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-white font-extrabold text-base sm:text-lg">
                {stat.value}
              </span>
              <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
