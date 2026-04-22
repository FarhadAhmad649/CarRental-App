import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

function CarCard() {
  const { cars, currencySymbol } = useContext(AppContext);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the entrance of each car card
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      {" "}
      {/* Changed h-screen to min-h-screen for better scrolling */}
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-1 items-center justify-center my-10"
      >
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-medium">
          Featured vehicles
        </h1>
        <p className="text-sm text-gray-600">
          Explore our selection of premium vehicles for your next adventure.
        </p>
      </motion.div>
      {/* Cards Slider Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {cars.map((car, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }} // Suble lift on hover
            className="min-w-[280px] w-[280px] flex-shrink-0 rounded-2xl"
          >
            {/* .......Single Car........ */}
            <div className="flex flex-col items-start justify-center shadow-md transition-shadow hover:shadow-xl rounded-2xl bg-white border border-gray-100">
              <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                <motion.img
                  whileHover={{ scale: 1.1 }} // Zoom effect on image hover
                  transition={{ duration: 0.6 }}
                  src={car.image}
                  alt="Car image"
                  className="h-full w-full object-cover"
                />

                <p className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-xs px-2.5 py-1 rounded-full z-10">
                  Available Now
                </p>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2">
                  <span className="font-semibold">
                    {currencySymbol}
                    {car.pricePerDay}
                  </span>
                  <span className="text-sm text-white/80">/ day</span>
                </div>
              </div>

              {/*...........Car Name.......... */}
              <div className="flex flex-col justify-start items-start p-3">
                <h3 className="text-sm font-medium">
                  {car.brand} {car.model}
                </h3>
                <p className="text-xs font-medium text-gray-600">
                  {car.category} • {car.year}
                </p>
              </div>

              {/*...........Car Details.......... */}
              <div className="mt-2 mb-2 px-3 grid grid-cols-2 gap-x-6 gap-y-2 justify-end text-gray-600 font-medium">
                <div className="flex items-center text-xs">
                  <img
                    src={assets.users_icon}
                    alt="User icon"
                    className="h-3 mr-2"
                  />
                  <span>{car.seating_capacity} Seats</span>
                </div>
                <div className="flex items-center text-xs">
                  <img
                    src={assets.fuel_icon}
                    alt="Fuel icon"
                    className="h-3 mr-2"
                  />
                  <span>{car.fuel_type}</span>
                </div>
                <div className="flex items-center text-xs">
                  <img
                    src={assets.car_icon}
                    alt="Car icon"
                    className="h-3 mr-2"
                  />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center text-xs">
                  <img
                    src={assets.location_icon}
                    alt="Location icon"
                    className="h-3 mr-2"
                  />
                  <span>{car.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full flex items-center justify-center mt-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex px-6 py-2 gap-2 border border-gray-300 cursor-pointer rounded-sm hover:bg-gray-50 transition-colors"
        >
          <button className="text-sm font-medium">Explore all cars</button>
          <img className="w-4" src={assets.arrow_icon} alt="" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CarCard;
