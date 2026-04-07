import SubCategory from "../models/subcategory.model.js";

/* CREATE SUBCATEGORY */
// Create subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { title, categoryId, inner } = req.body;

    if (!title || !categoryId) {
      return res
        .status(400)
        .json({ message: "Title and category are required." });
    }

    const newSub = new SubCategory({
      title,
      category: categoryId,
      inner: inner || [], // optional array
    });

    const savedSub = await newSub.save();
    res.status(201).json(savedSub);
  } catch (err) {
    console.error("Create subcategory error:", err);
    res
      .status(500)
      .json({ message: "Failed to create subcategory", error: err.message });
  }
};

/* GET SUBCATEGORIES BY CATEGORY */
export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({
      category: req.params.categoryId,
    }).populate("category");

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE SUBCATEGORY */
export const updateSubCategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE SUBCATEGORY */
export const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const { category } = req.query; // optional filter
    const filter = category ? { category } : {};

    // populate category for frontend filtering
    const subcategories = await SubCategory.find(filter).populate(
      "category",
      "title",
    );
    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
};
