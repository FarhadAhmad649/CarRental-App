import express from "express";
import Car from "../models/carModel.js";
import { cloudinary } from "../config/cloudinary.js";


// ......Get all cars
export const getCar = async (req, res) => {
  try {

    const { id } = req.body
    const cars = await Car.findById(id);

    res.json(cars);
  } catch (error) {
    console.log("Error fetching cars:", error.message);
    res
      .status(500)
      .json({ error: "Database connection failed", message: error.message });
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
    const { id, ...updateData } = req.body;
    await Car.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    console.log("Error updating car:", error.message);
    res.status(500).json({ error: "Failed to update car", message: error.message });
  }
};

// .......Car list.............
export const carList = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.log("Error fetching car list:", error.message);
    res.status(500).json({ error: "Failed to fetch car list", message: error.message });
  }
};


