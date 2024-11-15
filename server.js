const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./Routes/authRoutes");
const carRoutes = require("./Routes/carRoutes");
const multer  = require('multer')

const app = express();
require("dotenv").config();
connectDB();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cars", carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
