import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Custom hook to fetch categories with submenus from backend
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      // Ensure we always work with an array
      const data = Array.isArray(res.data) ? res.data : [];
      setCategories(data);
    } catch (err) {
      setError(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Debug effect: logs error whenever it changes
  useEffect(() => {
    if (error) console.error("useCategories error:", error);
  }, [error]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories, // optional: allow manual refresh
  };
};
