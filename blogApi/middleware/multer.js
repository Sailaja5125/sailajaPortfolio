import fs from "fs";
import multer from "multer";
import path from "path";

// Ensure the uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Destination folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".jpeg", ".jpg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

// Configure Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
    fileFilter: fileFilter,
});

export { upload };