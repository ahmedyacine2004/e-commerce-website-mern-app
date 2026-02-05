import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      subcategory,
      price,
      comparePrice,
      stock,
      description,
      active,
      media,
      tags,
      options,
      variants,
      characteristics,
      colors,
      sizes,
    } = req.body;

    // Validation
    if (
      !name ||
      !sku ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      sku,
      category,
      brand: brand || "",
      subcategory: subcategory || "",
      price,
      comparePrice: comparePrice || 0,
      stock,
      description: description || "",
      active: active !== undefined ? active : true,
      media: Array.isArray(media) ? media : [],
      tags: Array.isArray(tags) ? tags : [],
      options: Array.isArray(options) ? options : [],
      variants: Array.isArray(variants) ? variants : [],
      characteristics: Array.isArray(characteristics) ? characteristics : [],
      colors: Array.isArray(colors) ? colors : [],
      sizes: Array.isArray(sizes) ? sizes : [],
      sales: 0,
      rating: 0,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    next(err); // This will be handled by your errorHandler middleware
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
