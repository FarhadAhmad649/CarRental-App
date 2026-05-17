import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    // --- ADD THESE MISSING FIELDS ---
    image: { type: String, default: "" },
    phone: { type: String, default: "0000000000" },
    gender: { type: String, default: "Not Specified" },
    dob: { type: String, default: "Not Specified" },
    address: { type: Object, default: { line1: "", line2: "" } },
  },
  { minimize: false },
); // minimize: false ensures empty objects are saved

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
