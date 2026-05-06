import express from "express";
import { allOrders, updateStatus, placeOrder, userOrders } from "../controllers/bookingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const bookingRouter = express.Router()

bookingRouter.post("/list", authMiddleware, requireRole("admin"), allOrders);

bookingRouter.post("/status", authMiddleware, requireRole("admin"), updateStatus);

bookingRouter.post("/place", authMiddleware, placeOrder)

bookingRouter.post("/userorders", authMiddleware, userOrders);

export default bookingRouter