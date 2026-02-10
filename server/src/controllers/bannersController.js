import Banner from "../models/Banner.js";
import mongoose from "mongoose";

// Get all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get banner by ID
export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new banner
export const createBanner = async (req, res) => {
  try {
    const { imgSrc, alt, h4, h2, h3Text, h3Price } = req.body;
    const newBanner = new Banner({ imgSrc, alt, h4, h2, h3Text, h3Price });
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update existing banner
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    Object.assign(banner, req.body);
    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete banner

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }

    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await banner.deleteOne(); // safer than remove()
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Delete Banner Error:", err);
    res.status(500).json({ message: "Server error while deleting banner" });
  }
};
