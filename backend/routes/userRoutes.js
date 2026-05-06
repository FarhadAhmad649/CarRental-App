import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.get(
  "/admin",
  authMiddleware,
  requireRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

export default userRouter
