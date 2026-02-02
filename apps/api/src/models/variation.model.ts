import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProductVariation extends Document {
  productId: Types.ObjectId;
  sku?: string;
  color?: string;
  attributes?: { name: string; value: string }[];
  stock: number;
  price?: number;
  discount?: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariationSchema = new Schema<IProductVariation>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    sku: { type: String },
    color: { type: String, trim: true },
    attributes: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100 },
    images: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model<IProductVariation>(
  "Variation",
  ProductVariationSchema,
);
