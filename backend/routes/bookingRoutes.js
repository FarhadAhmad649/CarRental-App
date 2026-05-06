import express from "express";
<<<<<<< HEAD
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

// Both routes require the user to be logged in
bookingRouter.post("/add", authMiddleware, createBooking);
bookingRouter.get("/my-bookings", authMiddleware, getUserBookings);

export default bookingRouter;
=======
import { allOrders, updateStatus, placeOrder, userOrders } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const bookingRouter = express.Router()

bookingRouter.post("/list", authMiddleware, requireRole("admin"), allOrders);

bookingRouter.post("/status", authMiddleware, requireRole("admin"), updateStatus);

bookingRouter.post("/place", authMiddleware, placeOrder)

bookingRouter.post("/userorders", authMiddleware, userOrders);

export default bookingRouter
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59
