import express from "express";
import {createBooking, getUserBookings, updateBookingStatus, getAllBookings, deleteBooking } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { getDashboardStats } from "../controllers/bookingController.js";
import { getRevenueDetails } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// ================= USER ROUTES ================
// Both routes require the user to be logged in
bookingRouter.post("/add", authMiddleware, createBooking);
bookingRouter.get("/my-bookings", authMiddleware, getUserBookings);

// ================= ADMIN ROUTES =================
// ONLY Admins are allowed to view everyone's bookings and change statuses.
// (We use BOTH authMiddleware and requireRole here)
bookingRouter.get("/admin/bookings", authMiddleware, requireRole("admin"), getAllBookings);

bookingRouter.post("/admin/status", authMiddleware, requireRole("admin"), updateBookingStatus);

bookingRouter.get("/admin/dashboard-stats", authMiddleware,requireRole("admin"), getDashboardStats);

bookingRouter.get("/admin/revenue-details", authMiddleware, getRevenueDetails);

bookingRouter.post("/admin/delete", authMiddleware, deleteBooking );


export default bookingRouter;
