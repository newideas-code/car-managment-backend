const Car = require("../Models/Car.js");

exports.createCar = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("User ID:", req.user.id);

        const { title, description, tags, car_type, company, dealer } = req.body;
        const car = await Car.create({
            title,
            description,
            tags,
            car_type,
            company,
            dealer,
            user: req.user.id,
            images: req.files ? req.files.map(file => file.path) : []
        });

        res.status(201).json({ car });
    } catch (error) {
        console.error("Car creation error:", error);
        res.status(500).json({ error: "Failed to create car" });
    }
};


// Additional functions for listing, updating, and deleting cars follow a similar pattern.

// List all cars for the authenticated user
exports.listCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ error: "Failed to list cars" });
    }
};

// View a specific car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ error: "Car not found" });
        res.status(200).json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({ error: "Failed to fetch car" });
    }
};

// Update a specific car by ID
exports.updateCar = async (req, res) => {
    try {
        const { title, description, tags, car_type, company, dealer } = req.body;
        const updatedCar = await Car.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, description, tags, car_type, company, dealer },
            { new: true, runValidators: true }
        );
        if (!updatedCar) return res.status(404).json({ error: "Car not found or unauthorized" });
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ error: "Failed to update car" });
    }
};

// Delete a specific car by ID
exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedCar) return res.status(404).json({ error: "Car not found or unauthorized" });
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ error: "Failed to delete car" });
    }
};