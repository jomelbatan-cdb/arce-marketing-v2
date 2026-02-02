import multer from "multer";

const storage = multer.memoryStorage(); // buffer for Cloudinary upload

export const upload = multer({ storage });
