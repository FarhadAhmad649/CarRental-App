import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword =await bcrypt.hash(password, 10)

    const user = await userModel.create({ name, email, password: hashedPassword });

    res.status(201).json("Added successfully")

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    const user =await userModel.findOne({email})
    if(!user){
      res.status(400).json({message: "Invalid email"})
    }

    const matchUser = await bcrypt.compare(password, user.password)
    if(!matchUser){
      res.status(400).json({message: "Invalid password"})
    }

    res.status(200).json({message: "Login successfully"})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
