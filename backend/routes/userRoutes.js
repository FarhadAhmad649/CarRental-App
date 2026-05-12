import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  registerUser,
  loginUser,
  adminLogin,
  getProfile,
  updateProfile
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

// userRouter.get("/me", authMiddleware, getCurrentUser);

userRouter.post("/admin_login", adminLogin);

userRouter.get("/get-profile", authMiddleware, getProfile);

userRouter.post("/update-profile", authMiddleware,upload.single("image"), updateProfile);

export default userRouter
