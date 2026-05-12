import express from "express";
import carModel from "../models/carModel.js";
import { cloudinary } from "../config/cloudinary.js";


// Fetch a single car by ID
export const getSingleCar = async (req, res) => {
  try {
    // req.params.id grabs the ID straight from the URL string
    const carId = req.params.id; 
    console.log(carId)
    
    // Search your MongoDB collection
    const car = await carModel.findById(carId); 

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({ success: true, car });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching car details" });
  }
};

// .......Create car.............
export const createCar = async (req, res) => {
  try {
    let image = "";

    // Check if an image file was uploaded
    if (req.file) {
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "car_rental_app",
      });
      image = result.secure_url;
    } else {
      return res.status(400).json({ message: "Car image is required" });
    }

    // Combine the text data with the new image URL
    const carData = {
      ...req.body,
      image: image,
    };

    const car = await Car.create(carData);
    res.status(201).json({ message: "Car has been added", car });

  } catch (error) {
    console.log("Error creating car:", error.message);
    res
      .status(500)
      .json({ error: "Failed to create car", message: error.message });
  }
};

// .......Delete car.............
export const removeCar = async (req, res) => {
  try {
    const { id } = req.body;
    await Car.findByIdAndDelete(id);
    res.status(200).json({ message: "Car removed successfully" });
  } catch (error) {
    console.log("Error removing car:", error.message);
    res.status(500).json({ error: "Failed to remove car", message: error.message });
  }
};

// .......Update car.............

export const updateCar = async (req, res) => {
  try {
    const { id, brand, model, price, category } = req.body;
    const imageFile = req.file;

    let updateData = { brand, model, price, category };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await carModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Car Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// .......Car list.............
export const carList = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);
  } catch (error) {
    console.log("Error fetching car list:", error.message);
    res.status(500).json({ error: "Failed to fetch car list", message: error.message });
  }
};


