<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from "mongoose"
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
<<<<<<< HEAD
    image: { type: String, required: true } 
=======
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59
  },
  { timestamps: true },
);

<<<<<<< HEAD
export default mongoose.model("Car", carSchema);
=======
export default mongoose.model("Car", carSchema)
>>>>>>> cb5ac71e7aef8db46245261959c8c610590cfb59
