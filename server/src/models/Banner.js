import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    imgSrc: { type: String, required: true },
    alt: { type: String, default: "" },
    h4: { type: String, default: "" },
    h2: { type: String, default: "" },
    h3Text: { type: String, default: "" },
    h3Price: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
