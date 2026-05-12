import React, { useContext, useEffect, useState } from "react";
import { assets, cityList, dummyCarData } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { currencySymbol, token, backendUrl } = useContext(AppContext);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // ............... Fetching car by id.....................

  const fetchCar = async () => {
    try {
      // 1. Pass the actual 'id' variable into the URL
      const response = await axios.get(`${backendUrl}/api/car/${id}`);

      // 2. Extract the actual car data from response.data
      if (response.data.success || response.status === 200) {
        // (Note: Use response.data.car if your backend sends { success: true, car: {...} })
        setCar(response.data.car || response.data);
      } else {
        setCar(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load car details");
      setCar(null);
    } finally {
      setLoading(false); // Ensure loading stops whether it succeeds or fails
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  // ........... Loading outcomes............
  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!car) return <p className="p-8 text-center">Car not found.</p>;

  // ........... Booking dates.................
  const today = new Date().toLocaleDateString("en-CA");

  const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-CA");
  };

  const minReturnDate = pickupDate ? addOneDay(pickupDate) : today;

  const submitHandler = async (e) => {
    e.preventDefault();

    // 1. Ensure user is logged in
    if (!token) {
      toast.error("Please log in to book a car");
      navigate("/login");
      return;
    }

    // 2. Ensure dates are selected
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates");
      return;
    }

    // 3. Calculate total days and amount
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    if (days <= 0) {
      toast.error("Return date must be after pickup date");
      return;
    }

    const totalAmount = days * car.price;

    try {
      // 4. Package the data for the backend
      // IMPORTANT: Make sure these keys match what your placeOrder controller expects in req.body!
      const bookingData = {
        carId: car._id,
        pickupDate,
        returnDate,
        amount: totalAmount,
      };

      // 5. Send to the backend
      const response = await axios.post(
        `${backendUrl}/api/bookings/add`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success(`Successfully booked for ${days} days!`);

        // Redirect the user to the My Bookings page we just built!
        navigate("/my-bookings");
      } else {
        toast.error(response.data.message || "Failed to book car");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred during booking",
      );
    }
  };

  // ......... Design purpose.................
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-4">
      <motion.div
        onClick={() => navigate("/cars")} // Replace with your actual route
        className="bg-gray-100 text-gray-900 hover:text-white hover:bg-(--color-primary) px-4 py-2 rounded-full flex justify-center items-center gap-2 cursor-pointer shadow-lg w-fit mb-5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p className="text-sm font-medium">Back to all cars</p>
        <img
          className="w-3"
          src={assets.arrow_icon}
          alt="arrow"
          style={{ transform: "rotate(180deg)" }} // Rotate if your arrow icon points right by default
        />
      </motion.div>
      {/* ✅ Fix 3: Correct Tailwind arbitrary grid — use _ not - */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-start">
        {/* Car Details — scrolls naturally */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="rounded-2xl">
            <div className="flex flex-col items-start shadow-md hover:shadow-xl rounded-xl bg-white  transition-shadow">
              <div className="relative h-75 w-full overflow-hidden rounded-xl">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={car.image}
                  alt="Car image"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded">
                  <span className="font-semibold">
                    {currencySymbol}
                    {car.price}
                  </span>
                  <span className="text-sm text-white/80"> / day</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start py-4">
              <h3 className="text-xl font-bold">
                {car.brand} {car.model}
              </h3>
              <p className="text-xs text-gray-500">
                {car.category} • {car.year}
              </p>
            </div>

            {/* .........Car details........... */}

            <div className="mb-4 px-4 flex gap-4 text-gray-900 font-sm text-center">
              <div className="flex flex-col items-center w-35 gap-2 text-sm border border-gray-100 shadow-md rounded-md px-2 py-2 bg-gray-100">
                <img src={assets.users_icon} alt="Seats" className="h-4 mr-2" />
                <span>{car.seating_capacity} Seats</span>
              </div>

              <div className="flex flex-col items-center w-35 gap-2 text-sm border border-gray-100 shadow-md rounded-md px-2 py-2 bg-gray-100">
                <img src={assets.fuel_icon} alt="Fuel" className="h-4 mr-2" />
                <span>{car.fuel_type}</span>
              </div>

              <div className="flex flex-col items-center w-35 gap-2 text-sm border border-gray-100 shadow-md rounded-md px-2 py-2 bg-gray-100">
                <img
                  src={assets.car_icon}
                  alt="Transmission"
                  className="h-4 mr-2"
                />
                <span>{car.transmission}</span>
              </div>

              <div className="flex flex-col items-center w-35 gap-2 text-sm border border-gray-100 shadow-md rounded-md px-2 py-2 bg-gray-100">
                <img
                  src={assets.location_icon}
                  alt="Location"
                  className="h-4 mr-2"
                />
                <span>{car.location}</span>
              </div>
            </div>

            <div className="text-xs flex flex-col gap-2 text-gray-600 mb-3">
              <h2 className="font-medium text-lg text-black">Description</h2>
              <p>{car.description}</p>
            </div>

            <div className="text-xs flex flex-col gap-2 text-gray-600">
              <h2 className="font-medium text-lg text-black">Features</h2>
              <div className="grid grid-cols-2 gap-2 items-center justify-around">
                <p>
                  <img
                    className="inline pr-1 w-5"
                    src={assets.check_icon}
                    alt=""
                  />{" "}
                  <span>360 Camera</span>
                </p>
                <p>
                  <img
                    className="inline pr-1 w-5"
                    src={assets.check_icon}
                    alt=""
                  />{" "}
                  <span>Bluetooth</span>
                </p>
                <p>
                  <img
                    className="inline pr-1 w-5"
                    src={assets.check_icon}
                    alt=""
                  />{" "}
                  <span>GPS</span>
                </p>
                <p>
                  <img
                    className="inline pr-1 w-5"
                    src={assets.check_icon}
                    alt=""
                  />{" "}
                  <span>Heated Seats</span>
                </p>
                <p>
                  <img
                    className="inline pr-1 w-5"
                    src={assets.check_icon}
                    alt=""
                  />{" "}
                  <span>Rear View Mirror</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Booking Form — ✅ sticky on md+ so it stays fixed while car section scrolls */}
        <div className="md:sticky md:top-4">
          <motion.form
            onSubmit={submitHandler} // ✅ use onSubmit, not action
            className="flex flex-col gap-5 p-6 rounded-2xl shadow-[5px_8px_20px_rgba(0,0,0,0.1)] bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold">Book this Car</h2>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="pickupDate"
                className="text-sm font-medium text-gray-700"
              >
                Pick-up Date
              </label>
              <input
                type="date"
                id="pickupDate"
                min={today}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="returnDate"
                className="text-sm font-medium text-gray-700"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                min={minReturnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <motion.button
              type="submit"
              className="bg-(--color-primary) px-4 py-2 rounded-full flex justify-center items-center gap-2 text-white cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img src={assets.search_icon} alt="search" />
              Book Now
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
