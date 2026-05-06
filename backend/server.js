import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import carRoutes from "./routes/carRoutes.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load env variables first
dotenv.config();

const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];
const missingEnvs = requiredEnvs.filter((name) => !process.env[name]);
if (missingEnvs.length) {
  console.error(
    `Missing required environment variables: ${missingEnvs.join(", ")}`,
  );
  process.exit(1);
}

// App config
const app = express();
const port = process.env.PORT || 8000;

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api endpoints
app.use("/api/car", carRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is alive");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
