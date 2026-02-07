import express from "express";
import {
  signupClient,
  loginClient,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/clientAuthController.js";

const router = express.Router();

router.post("/signup", signupClient);
router.post("/verify-otp", verifyOtp); // OTP verification creates the user
router.post("/login", loginClient);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
