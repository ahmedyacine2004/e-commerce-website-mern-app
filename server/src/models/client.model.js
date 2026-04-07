// src/models/client.model.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png",
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    ipAddress: { type: String, default: null }, // updated for real-time IP
    status: { type: String, enum: ["online", "offline"], default: "offline" }, // updated for real-time status
    ipBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Client", clientSchema);
