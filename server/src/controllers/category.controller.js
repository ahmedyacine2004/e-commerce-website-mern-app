import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";

/* CREATE CATEGORY */
export const createCategory = async (req, res) => {
  try {
    const { title, icon } = req.body;

    const existing = await Category.findOne({ title });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ title, icon });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL CATEGORIES WITH SUBCATEGORIES */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    const subcategories = await SubCategory.find().lean();

    const result = categories.map((cat) => ({
      ...cat,
      submenus: subcategories.filter(
        (sub) => sub.category.toString() === cat._id.toString()
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE CATEGORY */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE CATEGORY + ITS SUBCATEGORIES */
export const deleteCategory = async (req, res) => {
  try {
    await SubCategory.deleteMany({ category: req.params.id });
    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: "Category and related subcategories deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
