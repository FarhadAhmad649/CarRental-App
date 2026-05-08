import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  adminLogin,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", authMiddleware, getCurrentUser);

userRouter.post("/admin_login", adminLogin);

export default userRouter
