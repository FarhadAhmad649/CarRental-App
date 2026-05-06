import express from "express";
import * as carController from "../controllers/carController.js";
import { validateCar } from "../middlewares/validateCar.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const carRouter = express.Router();

carRouter.get("/", carController.getCar);

carRouter.post("/add", authMiddleware, requireRole("admin"), validateCar, carController.createCar);

carRouter.post("/remove", authMiddleware, requireRole("admin"), carController.removeCar);

carRouter.post("/update", authMiddleware, requireRole("admin"), carController.updateCar);

carRouter.get("/list", carController.carList);

export default carRouter