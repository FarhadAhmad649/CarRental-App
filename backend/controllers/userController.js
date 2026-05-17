import userModel from "../models/userModel.js";
import { cloudinary } from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Generate JWT token
    const authToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", token: authToken });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const authToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({ message: "Login successfully", token: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    // Generate token
    const authToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res
      .status(200)
      .json({ message: "Admin login successful", token: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get user profile data for frontend synchronization
export const getProfile = async (req, res) => {
  try {
    // req.user.id comes from your authMiddleware
    const userId = req.user.id;

    // Find user by ID but don't send the password back!
    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, gender, dob } = req.body;
    const userId = req.user.id;

    // 1. Basic Validation - Check if user exists and name is provided
    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }

    // 2. Prepare update object with defaults
    const updateData = {
      name,
      phone: phone || "0000000000",
      gender: gender || "Male",
      dob: dob || "2000-01-01",
    };

    // 3. Update the text fields
    await userModel.findByIdAndUpdate(userId, updateData);

    // 4. Handle Image if it exists
    if (req.file) {
      try {
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      } catch (imageError) {
        console.log("Image upload error:", imageError);
        // Don't fail the whole request if image upload fails
      }
    }

    // 5. Fetch the FRESH user data to send back to frontend
    const updatedUserData = await userModel
      .findById(userId)
      .select("-password");

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      userData: updatedUserData, // 👈 This ensures the frontend UI updates immediately
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

