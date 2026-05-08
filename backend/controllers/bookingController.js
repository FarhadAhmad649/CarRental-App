import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate, amount } = req.body;
    const userId = req.user.id; // Comes from your authMiddleware

    // 1. Find the car to get its price per day
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (!car.isAvailable) {
      return res
        .status(400)
        .json({ message: "Car is currently not available" });
    }


    // 3. Create the booking
    const booking = await Booking.create({
      user: userId,
      car: carId,
      startDate: pickupDate,
      endDate: returnDate,
      totalPrice: amount,
      status: "pending",
    });

    // Optional: Mark car as unavailable
    // await Car.findByIdAndUpdate(carId, { isAvailable: false });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.log("Create Booking Error:", error);
    res
      .status(500)
      .json({ error: "Failed to create booking", message: error.message });
  }
};

// Get bookings for the currently logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from your authMiddleware

    // .populate('car') will fetch the actual car details instead of just the ID
    const bookings = await Booking.findOne({ user: userId }).populate(
      "car",
      "brand model price imageUrl",
    );

    res.status(200).json(bookings);
  } catch (error) {
    console.log("Get Bookings Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", message: error.message });
  }
};
