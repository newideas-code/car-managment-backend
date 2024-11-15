const Car = require("../Models/Car.js");
const cloudinary = require("../cloudinary.js");
const fs = require("fs");

// exports.createCar = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("User ID:", req.user.id);
//         // console.log("Request Files:", req.files);

//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ error: "No images uploaded." });
//         }

//         const uploader = async (path) => await cloudinary.uploads(path, "Images");
//         const urls = [];

//         for (const file of req.files) {
//             const { path } = file;
//             const newPath = await uploader(path);
//             urls.push(newPath.url);
//             fs.unlinkSync(path); // Remove temporary file
//         }

//         console.log("========== > URLS < =============== : ",urls);

//         const { title, description, tags, car_type, company, dealer } = req.body;

//         const car = await Car.create({
//             title,
//             description,
//             tags,
//             car_type,
//             company,
//             dealer,
//             user: req.user.id,
//             images: urls,
//         });

//         res.status(201).json({
//             status: "success",
//             message: "Car created successfully",
//             car,
//         });
//     } catch (error) {
//         console.error("Car creation error:", error);
//         res.status(500).json({ error: "Failed to create car" });
//     }
// };



// Additional functions for listing, updating, and deleting cars follow a similar pattern.

// List all cars for the authenticated user

exports.createCar = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("User ID:", req.user.id);
        // console.log(req)

        // Check if required fields are present in the request body
        const { title, description, tags, car_type, company, dealer } = req.body;
        if (!title || !description || !car_type || !company || !dealer) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded." });
        }

        const uploader = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];

        for (const file of req.files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath.url);
            fs.unlinkSync(path); // Remove temporary file
        }

        console.log("Uploaded URLs:", urls);

        const car = await Car.create({
            title,
            description,
            tags,
            car_type,
            company,
            dealer,
            user: req.user.id,
            images: urls,
        });

        res.status(201).json({
            status: "success",
            message: "Car created successfully",
            car,
        });
    } catch (error) {
        console.error("Car creation error:", error);
        res.status(500).json({ error: "Failed to create car" });
    }
};

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