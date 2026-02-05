import mongoose from "mongoose";

// Sub-schema for product variants
const variantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  sku: { type: String, default: "" },
});

// Sub-schema for product characteristics/features
const characteristicSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  value: { type: String, default: "" },
  description: { type: String, default: "" },
});

const productSchema = new mongoose.Schema(
  {
    // Basic info
    name: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, default: "" },
    brand: { type: String, default: "" },

    // Pricing & stock
    price: { type: Number, required: true },
    comparePrice: { type: Number, default: 0 },
    stock: { type: Number, required: true },

    // Content & media
    description: { type: String, default: "" }, // will store HTML from Froala
    media: { type: [String], default: [] },

    // Attributes
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    options: { type: Array, default: [] }, // optional for frontend
    variants: { type: [variantSchema], default: [] },
    characteristics: { type: [characteristicSchema], default: [] },

    // Analytics
    sales: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },

    // Status
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
