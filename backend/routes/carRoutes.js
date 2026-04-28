import express from "express";
import { createCar, getCar } from "../controllers/carController.js";
import { validateCar } from "../middlewares/validateCar.js";

const router = express.Router()

router.get("/", getCar)
router.post("/add", validateCar, createCar)

export default router