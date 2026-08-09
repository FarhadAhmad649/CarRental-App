import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "carRental",
    });

    console.log("✅ MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.log("❌ DB connection failed");
    console.log("Error:", error.message);
  }
};
