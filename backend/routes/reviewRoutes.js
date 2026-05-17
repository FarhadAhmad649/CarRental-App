import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Your login check

const router = express.Router();

// GET all reviews (Public - anyone can see them)
router.get("/", getReviews);

// POST a new review (Protected - only logged-in users can post)
router.post("/add", authMiddleware, createReview);

export default router;
