import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/carRental`);
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.log("❌ DB connection failed");
    console.log("Error:", error.message);
    console.log("Code:", error.code);
    // Don't crash - server continues to run
    return false;
  }
};
