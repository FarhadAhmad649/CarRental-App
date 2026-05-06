import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv"; // 1. Import dotenv

dotenv.config(); // 2. Force load the .env variables right here, right now

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer
const storage = multer.diskStorage({});
export const upload = multer({ storage });

export { cloudinary };
