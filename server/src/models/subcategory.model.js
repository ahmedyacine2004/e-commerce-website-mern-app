import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    inner: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subcategorySchema);

export default SubCategory;
