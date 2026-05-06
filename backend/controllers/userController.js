import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await userModel.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({ name, email, password: hashedPassword, role: "admin" });

    // Generate JWT token
    const authToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({ message: "User registered successfully", token: authToken })

  } catch (error) {
    console.log("Register Error:", error)
    return res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {

    const { password, email } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user =await userModel.findOne({email})
    if(!user){
      return res.status(400).json({message: "Invalid email"})
    }

    const matchUser = await bcrypt.compare(password, user.password)
    if(!matchUser){
      return res.status(400).json({message: "Invalid password"})
    }

    // Generate token
    const authToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({message: "Login successfully", token: authToken})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


// testing user
export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};