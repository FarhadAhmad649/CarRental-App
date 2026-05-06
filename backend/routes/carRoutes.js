import express from "express";
import * as carController from "../controllers/carController.js";
import { validateCar } from "../middlewares/validateCar.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
<<<<<<< HEAD
import { upload } from "../config/cloudinary.js"; // Import the upload middleware
=======
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59

const carRouter = express.Router();

carRouter.get("/", carController.getCar);

<<<<<<< HEAD
// Add upload.single('image') before the controller
// 'image' is the field name you will use in Postman/Frontend when uploading the file
carRouter.post(
  "/add",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"), 
  validateCar,
  carController.createCar,
);

carRouter.post(
  "/remove",
  authMiddleware,
  requireRole("admin"),
  carController.removeCar,
);

carRouter.post(
  "/update",
  authMiddleware,
  requireRole("admin"),
  carController.updateCar,
);

carRouter.get("/list", carController.carList);

export default carRouter;
=======
carRouter.post("/add", authMiddleware, requireRole("admin"), validateCar, carController.createCar);

carRouter.post("/remove", authMiddleware, requireRole("admin"), carController.removeCar);

carRouter.post("/update", authMiddleware, requireRole("admin"), carController.updateCar);

carRouter.get("/list", carController.carList);

export default carRouter
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59
