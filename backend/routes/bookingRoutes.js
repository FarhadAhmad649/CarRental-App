import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

// Both routes require the user to be logged in
bookingRouter.post("/add", authMiddleware, createBooking);
bookingRouter.get("/my-bookings", authMiddleware, getUserBookings);

export default bookingRouter;
