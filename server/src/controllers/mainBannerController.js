import MainBanner from "../models/MainBanner.js";

// @desc    Get all main banners
// @route   GET /api/main-banners
export const getMainBanners = async (req, res) => {
  try {
    const banners = await MainBanner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single main banner
// @route   GET /api/main-banners/:id
export const getMainBannerById = async (req, res) => {
  try {
    const banner = await MainBanner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a main banner
// @route   POST /api/main-banners
export const createMainBanner = async (req, res) => {
  try {
    const { imgSrc, alt } = req.body;

    const banner = await MainBanner.create({
      imgSrc,
      alt: alt || "",
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a main banner
// @route   PUT /api/main-banners/:id
export const updateMainBanner = async (req, res) => {
  try {
    const banner = await MainBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const { imgSrc, alt } = req.body;

    banner.imgSrc = imgSrc || banner.imgSrc;
    banner.alt = alt !== undefined ? alt : banner.alt;

    const updatedBanner = await banner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a main banner
// @route   DELETE /api/main-banners/:id
export const deleteMainBanner = async (req, res) => {
  try {
    const banner = await MainBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await banner.deleteOne();
    res.status(200).json({ message: "Main banner removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
