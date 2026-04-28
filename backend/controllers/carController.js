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
