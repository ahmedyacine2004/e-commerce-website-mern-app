import mongoose from "mongoose";

// Variant schema
const variantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  sku: { type: String, default: "" },
});

// Review schema
const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    avatar: { type: String, default: "" },
    rating: { type: Number, required: true },
    title: { type: String, default: "" },
    comment: { type: String, default: "" },
    verifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Additional info schema
const additionalInfoSchema = new mongoose.Schema({
  alt: { type: String, default: "" },
  desc: { type: String, default: "" },
  oldPrice: { type: Number, default: 0 },
  shipPerUnit: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  reviewsNmb: { type: Number, default: 0 },

  // Dynamic product details as key-value object
  productDetails: {
    type: Map,
    of: String,
    default: {},
  },

  reviews: { type: [reviewSchema], default: [] },
});

// Product schema
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
    description: { type: String, default: "" },
    media: { type: [String], default: [] },

    // Attributes
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    options: { type: Array, default: [] },
    variants: { type: [variantSchema], default: [] },

    // Analytics - rating is derived from reviews
    sales: { type: Number, default: 0 },
    rating: {
      type: Number,
      default: null,
      get: function () {
        const reviews = this.additionalInfo?.reviews || [];
        if (!reviews.length) return null;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return sum / reviews.length;
      },
    },

    // Extra frontend data
    additionalInfo: { type: additionalInfoSchema, default: {} },

    // Status
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // ensures getter works when sending JSON
    toObject: { getters: true },
  },
);

export default mongoose.model("Product", productSchema);
