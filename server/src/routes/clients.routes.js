import express from "express";
import { getClients, toggleBlockedIP } from "../controllers/clients.controller.js";

const router = express.Router();

// GET all clients
router.get("/", getClients);

// BLOCK/UNBLOCK a specific IP for a client
router.put("/:id/block-ip", toggleBlockedIP);

export default router;