import express from "express";
import {
  getMainBanners,
  getMainBannerById,
  createMainBanner,
  updateMainBanner,
  deleteMainBanner,
} from "../controllers/mainBannerController.js";

const router = express.Router();

router.get("/", getMainBanners);
router.get("/:id", getMainBannerById);
router.post("/", createMainBanner);
router.put("/:id", updateMainBanner);
router.delete("/:id", deleteMainBanner);

export default router;
