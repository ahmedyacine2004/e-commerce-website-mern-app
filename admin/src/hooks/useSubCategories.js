import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/subcategories`;

export const useSubCategories = (categoryId = "") => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const url = categoryId ? `${BASE_URL}?category=${categoryId}` : BASE_URL;
      const res = await axios.get(url);
      console.log("Fetched Subcategories:", res.data);
      setSubcategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const createSubCategory = async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      await fetchSubCategories(); // refresh after create
      return res.data;
    } catch (err) {
      console.error("Failed to create subcategory:", err);
      throw err;
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      await fetchSubCategories(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete subcategory:", err);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  return {
    subcategories,
    loading,
    createSubCategory,
    deleteSubCategory,
    refetch: fetchSubCategories,
  };
};
