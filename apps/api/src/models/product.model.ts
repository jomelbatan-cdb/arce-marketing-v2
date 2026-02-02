import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: Types.ObjectId;
  tags?: string[];
  images: string[];

  stock?: number;
  solds: number;
  sku?: string;

  variations?: Types.ObjectId[]; // <-- references only

  ratings?: {
    average: number;
    count: number;
  };

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true },

    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },

    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    tags: { type: [String] },

    images: {
      type: [String],
      required: true,
      validate: [arrayLimit, "Product must have at least one image"],
    },

    stock: { type: Number, min: 0 },
    solds: { type: Number, default: 0, min: 0 },

    sku: { type: String },

    variations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variation",
      },
    ],

    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

function arrayLimit(val: string[]) {
  return val.length > 0;
}

ProductSchema.index({
  name: "text",
  description: "text",
  tags: 1,
});

export default mongoose.model<IProduct>("Product", ProductSchema);
