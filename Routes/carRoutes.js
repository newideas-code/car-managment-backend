const express = require("express");
const {
  createCar,
  listCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { authMiddleware } = require("../utilities/authMiddleware");
const upload = require("../Utilities/multer");
const router = express.Router();

router.post("/create", authMiddleware,upload.array("images",10), createCar);
router.get("/", authMiddleware, listCars); // List all cars for the user
router.get("/:id", authMiddleware, getCarById); // View a specific car by ID
router.put("/:id", authMiddleware,upload.array("images", 10), updateCar); // Update a specific car by ID
router.delete("/:id", authMiddleware, deleteCar); // Delete a specific car by ID

module.exports = router;
