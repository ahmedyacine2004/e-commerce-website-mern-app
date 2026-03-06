import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";

export const bulkImportCategories = async (req, res) => {
  try {
    const data = req.body; // expect an array like your JSON

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Body must be an array of categories" });
    }

    // Remove all existing categories & subcategories first (optional)
    await SubCategory.deleteMany({});
    await Category.deleteMany({});

    const createdCategories = [];

    for (const cat of data) {
      const { title, icon, submenus } = cat;

      const newCat = await Category.create({ title, icon });

      if (Array.isArray(submenus)) {
        for (const sub of submenus) {
          await SubCategory.create({
            title: sub.title,
            category: newCat._id,
            inner: Array.isArray(sub.inner) ? sub.inner : [],
          });
        }
      }

      createdCategories.push(newCat);
    }

    res.status(201).json({ message: "Bulk import successful", categories: createdCategories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bulk import failed", error: err.message });
  }
};