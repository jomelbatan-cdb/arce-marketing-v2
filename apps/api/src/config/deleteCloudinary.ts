import cloudinary from "./cloudinary.js";

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    if (!imageUrl.includes("/upload/")) {
      throw new Error("Invalid Cloudinary URL format");
    }

    // Extract everything after /upload/
    const parts = imageUrl.split("/upload/")[1];

    // Remove version prefix (e.g., v123456/)
    const pathParts = parts.split("/");
    const startIndex = pathParts[0].startsWith("v") ? 1 : 0;
    const relevantParts = pathParts.slice(startIndex);

    // Rebuild path and strip file extension
    const fileWithExt = relevantParts.pop()!;
    const fileName = fileWithExt.replace(/\.[^/.]+$/, "");
    const folderPath = relevantParts.join("/");
    const publicId = folderPath ? `${folderPath}/${fileName}` : fileName;

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary delete result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};
