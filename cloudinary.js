const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = async (file, folder) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder
        });
        return {
            url: result.secure_url,  // Use secure_url for HTTPS links
            id: result.public_id
        };
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message);
        throw new Error("Failed to upload to Cloudinary");
    }
};
