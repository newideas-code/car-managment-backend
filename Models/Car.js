const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],
    car_type: { type: String },
    company: { type: String },
    dealer: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Car", carSchema);
