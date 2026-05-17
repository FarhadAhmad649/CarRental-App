import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";
import User from '../models/userModel.js'
import bookingModel from "../models/bookingModel.js";

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

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    // 1. BACKEND OVERLAP CHECK
    // Check if there is already a booking for this car that overlaps these dates
    const overlappingBooking = await bookingModel.findOne({
      carId: carId,
      status: { $in: ["pending", "confirmed"] }, // Ignore cancelled bookings
      $and: [{ startDate: { $lte: end } }, { endDate: { $gte: start } }],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message:
          "Sorry, this car was just booked by someone else for these dates.",
      });
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
    const bookings = await bookingModel
      .find({ userId: userId })
      .populate("carId");

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
    const bookings = await bookingModel.find()
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

    const updatedBooking = await bookingModel.findByIdAndUpdate(
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

// 3. Get all data for the dashboard (Admin Panel)
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Get total counts
    const totalCars = await Car.countDocuments();
    const totalBookings = await bookingModel.countDocuments();

    // 2. Get counts by status (using regex to ignore case differences like "Pending" vs "pending")
    const pending = await bookingModel.countDocuments({
      status: { $regex: /^pending$/i },
    });
    const confirmed = await bookingModel.countDocuments({
      status: { $regex: /^confirmed$/i },
    });
    const completed = await bookingModel.countDocuments({
      status: { $regex: /^completed$/i },
    });
    const cancelled = await bookingModel.countDocuments({
      status: { $regex: /^cancelled$/i },
    });

    // 3. Calculate total revenue using MongoDB Aggregation
    // We only sum up the price of 'Completed' or 'Confirmed' bookings
    const revenueData = await bookingModel.aggregate([
      {
        $match: {
          status: { $regex: /^(completed|confirmed)$/i },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }, // Ensure 'totalPrice' matches your schema field!
        },
      },
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // 4. Send it all back
    res.status(200).json({
      success: true,
      stats: {
        totalCars,
        totalBookings,
        pending,
        confirmed,
        completed,
        cancelled,
        totalRevenue
      }
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

// 4. Get detailed revenue list (Completed and Confirmed only)
export const getRevenueDetails = async (req, res) => {
  try {
    // 1. Find only bookings that actually generated revenue
    // We use a case-insensitive regex to catch "Completed", "completed", etc.
    const validStatuses = [/completed/i, /confirmed/i];
    
    const revenueBookings = await bookingModel
      .find({
        status: { $in: validStatuses },
      })
      .populate("userId", "name email")
      .populate("carId", "brand model")
      .sort({ createdAt: -1 }); // -1 puts the newest transactions at the top!

    // 2. Send the optimized list back to the frontend
    res.status(200).json({ 
      success: true, 
      revenue: revenueBookings 
    });

  } catch (error) {
    console.error("Fetch Revenue Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch revenue details" });
  }
};

// 5. Delete Bookings from admin panel
export const deleteBooking = async (req, res) =>{
  try {
    const { bookingId } = req.body;
    await bookingModel.findByIdAndDelete(bookingId);
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
