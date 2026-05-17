import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CarCard() {
  const { cars, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  console.log("CARS:", cars);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-16 px-4 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2 items-center justify-center mb-14"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[#1E3A8A] font-semibold">
          Our Fleet
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold text-[#111827] tracking-tight text-center"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Featured Vehicles
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-md text-center">
          Explore our selection of premium vehicles for your next adventure.
        </p>
        {/* Decorative line */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px w-12 bg-[#1E3A8A]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
          <div className="h-px w-12 bg-[#1E3A8A]/30" />
        </div>
      </motion.div>

      {/* Cards Grid / Slider */}
      {!cars || cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium">Loading featured vehicles...</p>
        </div>
      ) : (
        <motion.div
          key={cars.length}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-5 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {cars.slice(0, 4).map((car) => (
            <motion.div
              key={car._id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="min-w-[300px] w-[300px] flex-shrink-0 cursor-pointer group"
              onClick={() => navigate(`/car-details/${car._id}`)}
            >
              <div className="flex flex-col rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Available badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1E3A8A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    Available
                  </span>

                  {/* Category badge */}
                  <span className="absolute top-3 right-3 bg-[#1E3A8A]/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {car.category}
                  </span>

                  {/* Car name on image */}
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-white/70 text-xs font-medium">
                      {car.year}
                    </p>
                  </div>
                </div>

                {/* Price Strip */}
                <div className="flex items-center justify-between bg-[#1E3A8A] px-4 py-3">
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                    Daily Rate
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-white text-sm font-bold">
                      {currencySymbol}
                      <span className="text-xl">
                        {car.price?.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-white/60 text-xs ml-1">/ day</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-4 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-[#1E3A8A]/8 flex items-center justify-center shrink-0">
                      <img src={assets.users_icon} alt="" className="h-3.5" />
                    </div>
                    <span className="text-xs font-medium">
                      {car.seating_capacity} Seats
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-[#1E3A8A]/8 flex items-center justify-center shrink-0">
                      <img src={assets.fuel_icon} alt="" className="h-3.5" />
                    </div>
                    <span className="text-xs font-medium">{car.fuel_type}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-[#1E3A8A]/8 flex items-center justify-center shrink-0">
                      <img src={assets.car_icon} alt="" className="h-3.5" />
                    </div>
                    <span className="text-xs font-medium">
                      {car.transmission}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-[#1E3A8A]/8 flex items-center justify-center shrink-0">
                      <img
                        src={assets.location_icon}
                        alt=""
                        className="h-3.5"
                      />
                    </div>
                    <span className="text-xs font-medium truncate">
                      {car.location}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4">
                  <button className="w-full py-2.5 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] text-xs font-bold uppercase tracking-widest group-hover:bg-[#1E3A8A] group-hover:text-white transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full flex items-center justify-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/cars")}
          className="flex items-center gap-3 px-8 py-3 bg-[#111827] text-white text-sm font-semibold rounded-full hover:bg-[#1E3A8A] transition-colors duration-300 shadow-lg"
        >
          Explore all cars
          <img className="w-4 invert" src={assets.arrow_icon} alt="" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default CarCard;
