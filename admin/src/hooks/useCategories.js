import { useState, useEffect } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories`,
      );
      setCategories(res.data || []); // ensure it's always an array
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories`,
        data,
      );
      fetchCategories(); // refresh after creation
      return res.data;
    } catch (err) {
      console.error("Failed to create category:", err);
      throw err;
    }
  };

  // Delete a category by id
  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${id}`,
      );
      fetchCategories(); // refresh after deletion
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  // Update a category
  const updateCategory = async (id, data) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${id}`,
        data,
      );
      fetchCategories(); // refresh after update
      return res.data;
    } catch (err) {
      console.error("Failed to update category:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    refetch: fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory,
  };
};
