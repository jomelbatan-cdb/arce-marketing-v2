import { Request, Response } from "express";
import mongoose from "mongoose";
import Variation from "../models/variation.model";
import Product from "../models/product.model";
import { uploadToCloudinary } from "../config/cloudinary";

// CREATE variation
export const createVariation = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { sku, color, attributes, stock, price, discount, images } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const product = await Product.findById(productId).select("_id");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Upload product images
    const variationImageFiles = files.filter((f) => f.fieldname === "images");
    const variationImageUrls = await Promise.all(
      variationImageFiles.map(async (file) => {
        const uploaded = await uploadToCloudinary(file.buffer);
        return (uploaded as any).secure_url;
      }),
    );

    const variation = new Variation({
      productId: product._id, // ✅ correct
      sku,
      color,
      attributes,
      stock,
      price,
      discount,
      images: variationImageUrls,
    });

    const saved = await variation.save();

    await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { variations: variation._id },
      },
      { new: false },
    );
    return res.status(201).json(saved);
  } catch (error) {
    console.error("Create variation error:", error);
    return res.status(500).json({
      error: "Failed to create variation",
    });
  }
};

// GET all variations with cursor-based pagination
export const getVariations = async (req: Request, res: Response) => {
  try {
    // Query params: limit, cursor (optional)
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string | undefined;

    const query: any = {};
    if (cursor) {
      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return res.status(400).json({ error: "Invalid cursor" });
      }
      query._id = { $gt: cursor }; // Fetch documents _after_ the cursor
    }

    const variations = await Variation.find(query)
      .sort({ _id: 1 }) // Ascending order for cursor pagination
      .limit(limit + 1) // Fetch one extra to check if there is a next page
      .populate("productId", "name");

    let nextCursor: string | null = null;
    if (variations.length > limit) {
      const nextItem = variations.pop(); // remove extra item
      nextCursor = nextItem!._id.toString();
    }

    res.json({
      data: variations,
      nextCursor,
      limit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch variations", details: error });
  }
};
// GET variations by productId with optional cursor-based pagination
export const getVariationsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string | undefined;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const query: any = { productId };

    // Cursor for pagination
    if (cursor) {
      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return res.status(400).json({ error: "Invalid cursor" });
      }
      query._id = { $gt: cursor };
    }

    const variations = await Variation.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1)
      .populate("productId", "name");

    let nextCursor: string | null = null;
    if (variations.length > limit) {
      const nextItem = variations.pop();
      nextCursor = nextItem!._id.toString();
    }

    res.json({
      data: variations,
      nextCursor,
      limit,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch variations for product",
      details: error,
    });
  }
};

// GET single variation
export const getVariation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid variation ID" });
    }

    const variation = await Variation.findById(id).populate(
      "productId",
      "name",
    );
    if (!variation)
      return res.status(404).json({ error: "Variation not found" });

    res.json(variation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch variation", details: error });
  }
};

// UPDATE variation
export const updateVariation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = (req.files as Express.Multer.File[]) || [];
    const { sku, color, attributes, stock, price, discount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid variation ID" });
    }

    // Build update object
    const updateData: any = { sku, color, attributes, stock, price, discount };

    // Handle optional uploaded images
    const imageFiles = files.filter((f) => f.fieldname === "images");
    if (imageFiles.length > 0) {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const uploaded = await uploadToCloudinary(file.buffer);
          return (uploaded as any).secure_url;
        }),
      );
      updateData.images = imageUrls;
    }

    // Remove undefined keys (fields that weren't sent)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    // Update the variation
    const updated = await Variation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Variation not found" });

    res.json(updated);
  } catch (error) {
    console.error("Update variation error:", error);
    res.status(500).json({
      error: "Failed to update variation",
      details: error,
    });
  }
};

// DELETE variation
export const deleteVariation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid variation ID" });
    }

    // 1️⃣ Find and delete the variation
    const deleted = await Variation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Variation not found" });
    }

    // 2️⃣ Remove variation reference from Product
    await Product.findByIdAndUpdate(deleted.productId, {
      $pull: { variations: deleted._id },
    });

    res.json({ message: "Variation deleted successfully" });
  } catch (error) {
    console.error("Delete variation error:", error);
    res
      .status(500)
      .json({ error: "Failed to delete variation", details: error });
  }
};
