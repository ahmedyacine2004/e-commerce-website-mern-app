import mongoose from "mongoose";

const mainBannerSchema = new mongoose.Schema(
  {
    imgSrc: {
      type: String,
      required: [true, "Image is required"],
    },
    alt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("MainBanner", mainBannerSchema);
