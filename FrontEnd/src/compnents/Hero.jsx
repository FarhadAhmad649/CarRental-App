import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { motion } from "framer-motion";

function Hero() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-CA");
  };

  const minReturnDate = pickupDate ? addOneDay(pickupDate) : today;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(pickupDate, returnDate, selectedLocation);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-2 md:gap-10 bg-(--color-light) text-center py-2 mb-5">
      {/* Heading fades + slides down */}
      <motion.h1
        className="text-2xl mb-1 md:mb-2 md:text-4xl xl:w-5xl font-semibold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Luxury Cars on Rent
      </motion.h1>

      {/* Form fades in slightly after heading */}
      <motion.form
        action={submitHandler}
        className="min-w-[40%] md:min-w-[80%] px-3 md:px-10 py-3 rounded-2xl md:rounded-full shadow-[5px_8px_20px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="min-w-[80%] flex flex-col items-center justify-center md:flex-row gap-2 md:gap-5 lg:gap-10">
          <div className="flex flex-col justify-start items-start gap-1 md:gap-2">
            <select
              className="cursor-pointer"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {selectedLocation ? selectedLocation : "Select location"}
            </p>
          </div>

          <div className="flex flex-col justify-start items-start md:gap-2 cursor-pointer">
            <label htmlFor="pickupDate">Pick-up Date</label>
            <input
              type="date"
              id="pickupDate"
              min={today}
              onChange={(e) => setPickupDate(e.target.value)}
              className="text-sm text-gray-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col justify-start items-start md:gap-2 cursor-pointer">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              min={minReturnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-sm text-gray-500 cursor-pointer"
            />
          </div>

          {/* Button with hover + tap feedback */}
          <motion.button
            className="bg-(--color-primary) px-4 py-2 rounded-full flex justify-center items-center w-full md:max-w-28 gap-2 text-white self-center cursor-pointer shadow-lg"
            onClick={submitHandler}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img src={assets.search_icon} alt="search" />
            Search
          </motion.button>
        </div>
      </motion.form>

      {/* Car image slides up from bottom */}
      <motion.img
        src={assets.main_car}
        alt="car"
        className="max-h-60"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: [60, 0, -8, 0, -8, 0] }}
        transition={{
          duration: 2,
          ease: "easeOut",
          times: [0, 0.4, 0.6, 0.75, 0.88, 1],
          repeat: 0,
        }}
      />
    </div>
  );
}

export default Hero;
