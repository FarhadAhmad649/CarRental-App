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
      userId: userId, // ✅ Fixed
      carId: carId, // ✅ Fixed
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
    const bookings = await Booking.find({ userId: userId }).populate("carId");

    res.status(200).json(bookings);
  } catch (error) {
    console.log("Get Bookings Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", message: error.message });
  }
};


// ---------------- ADMIN CONTROLLERS ----------------

// 1. Get all bookings for the Admin Panel
export const getAllBookings = async (req, res) => {
  try {
    // Populate car details AND the user's name/email so the admin knows who booked it!
    const bookings = await Booking.find()
      .populate("carId")
      .populate("userId", "name email"); 

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Admin Get Bookings Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch all bookings" });
  }
};

// 2. Update booking status (Pending -> Confirmed -> Cancelled)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true } // Returns the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Status updated", booking: updatedBooking });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};
