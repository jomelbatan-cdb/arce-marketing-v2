import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";
import Variation from "../models/variation.model";
import Category from "../models/category.model";
import { uploadToCloudinary } from "../config/cloudinary";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    const {
      name,
      description,
      price,
      category,
      stock,
      sku,
      variations,
      discount,
      tags,
      isActive,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const priceNum = Number(price);
    const discountNum = discount ? Number(discount) : 0;

    if (Number.isNaN(priceNum)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags || [];
    const parsedVariations = variations ? JSON.parse(variations) : [];

    // Upload product images
    const productImageFiles = files.filter((f) => f.fieldname === "images");
    const productImageUrls = await Promise.all(
      productImageFiles.map(async (file) => {
        const uploaded = await uploadToCloudinary(file.buffer);
        return (uploaded as any).secure_url;
      }),
    );

    // 1️⃣ Create product first (without variations)
    const product = new Product({
      name,
      description,
      price: priceNum,
      discount: discountNum,
      category,
      tags: parsedTags,
      isActive: isActive ?? true,
      images: productImageUrls,
      stock: parsedVariations.length ? undefined : Number(stock),
      sku: parsedVariations.length ? undefined : sku,
    });

    const savedProduct = await product.save();

    // 2️⃣ Create variations WITH productId
    let variationIds: any[] = [];

    if (parsedVariations.length > 0) {
      const createdVariations = await Promise.all(
        parsedVariations.map(async (v: any, idx: number) => {
          const varFiles = files.filter(
            (f) => f.fieldname === `variationImages-${idx}`,
          );

          const variationImageUrls = await Promise.all(
            varFiles.map(async (file) => {
              const uploaded = await uploadToCloudinary(file.buffer);
              return (uploaded as any).secure_url;
            }),
          );

          const variation = await Variation.create({
            productId: savedProduct._id, // ✅ FIXED: assign productId here
            sku: v.sku,
            color: v.color,
            attributes: v.attributes || [],
            stock: Number(v.stock),
            price: v.price ? Number(v.price) : undefined,
            discount: v.discount ? Number(v.discount) : undefined,
            images: variationImageUrls,
          });

          return variation._id;
        }),
      );

      variationIds = createdVariations;
    }

    // 3️⃣ Update product with variation IDs
    if (variationIds.length) {
      savedProduct.variations = variationIds;
      await savedProduct.save();
    }

    res.status(201).json(savedProduct);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find()
        .populate("category")
        .populate("variations")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(),
    ]);

    res.json({
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getShowcaseProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const category = req.query.category as string | undefined;

    // Build dynamic filter
    const filter: any = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate("category")
      .select({
        images: 1,
        name: 1,
        discount: 1,
        price: 1,
        solds: 1,
      })
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("variations");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { existing = [] } =
      typeof req.body.images === "string"
        ? JSON.parse(req.body.images)
        : req.body.images || {};

    const files = req.files as Express.Multer.File[] | undefined;
    console.log("Body: ", req.body);
    const {
      name,
      description,
      price,
      category,
      stock,
      sku,
      variations,
      discount,
      tags,
      isActive,
    } = req.body;

    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags || [];
    const parsedVariations = variations ? JSON.parse(variations) : [];

    // Validate stock vs variations
    if (parsedVariations.length && stock != 0) {
      return res.status(400).json({
        error: "Product cannot have both stock and variations",
      });
    }

    if (!parsedVariations.length && stock == 0) {
      return res.status(400).json({
        error: "Product must have either stock or variations",
      });
    }

    // Upload ONLY new images
    let uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const uploaded = await uploadToCloudinary(file.buffer);
        uploadedUrls.push((uploaded as any).secure_url);
      }
    }

    // Merge existing + uploaded
    const mergedImages = [...existing, ...uploadedUrls];

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price: price ? Number(price) : undefined,
        discount: discount ? Number(discount) : undefined,
        category,
        tags: parsedTags,
        isActive: isActive ?? true,
        images: mergedImages,
        stock: parsedVariations.length ? undefined : Number(stock),
        sku: parsedVariations.length ? undefined : sku,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If variations exist, update them properly
    if (parsedVariations.length > 0) {
      const variationIds = await Promise.all(
        parsedVariations.map(async (v: any) => {
          const variation = await Variation.findById(v._id);

          // If variation exists -> update
          if (variation) {
            variation.color = v.color;
            variation.attributes = v.attributes || [];
            variation.stock = Number(v.stock);
            variation.price = v.price ? Number(v.price) : variation.price;
            variation.discount = v.discount
              ? Number(v.discount)
              : variation.discount;
            await variation.save();
            return variation._id;
          }

          // If variation doesn't exist -> create
          const newVariation = await Variation.create({
            productId: updatedProduct._id,
            sku: v.sku,
            color: v.color,
            attributes: v.attributes || [],
            stock: Number(v.stock),
            price: v.price ? Number(v.price) : undefined,
            discount: v.discount ? Number(v.discount) : undefined,
            images: v.images || [],
          });

          return newVariation._id;
        }),
      );

      updatedProduct.variations = variationIds;
      await updatedProduct.save();
    }

    res.json(updatedProduct);
  } catch (error: any) {
    console.error("Update product error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Variation.deleteMany({ productId: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecommendation = async (req: Request, res: Response) => {
  try {
    const { categoryId, productId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
          _id: { $ne: new mongoose.Types.ObjectId(productId) },
        },
      },
      { $sample: { size: 18 } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
    ]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
