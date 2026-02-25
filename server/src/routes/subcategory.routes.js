import express from "express";
import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subcategory.controller.js";

const router = express.Router();

// Create subcategory
router.post("/", createSubCategory);

// Get all subcategories (optional filter by category via query)
router.get("/", getSubCategories);

// Update subcategory
router.put("/:id", updateSubCategory);

// Delete subcategory
router.delete("/:id", deleteSubCategory);

export default router;
