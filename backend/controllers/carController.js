import express from "express";
import Car from "../models/carModel.js";

// ......Get all cars
export const getCar = async (req, res) => {
  try {
    const cars = await Car.find();
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
    const car = await Car.create(req.body);
    res.status(201).json("Car has been added");
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


