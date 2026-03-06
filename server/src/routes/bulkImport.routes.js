import express from "express";
import { bulkImportCategories } from "../controllers/bulkImport.controller.js";

const router = express.Router();

// POST /api/bulk-import
router.post("/", bulkImportCategories);

export default router;