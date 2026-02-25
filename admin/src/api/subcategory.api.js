import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/subcategories`;

export const getSubCategoriesByCategory = async (categoryId) => {
  const res = await axios.get(`${BASE_URL}/${categoryId}`);
  return res.data;
};

export const createSubCategory = async (subcategory) => {
  const res = await axios.post(BASE_URL, subcategory);
  return res.data;
};

export const updateSubCategory = async (id, subcategory) => {
  const res = await axios.put(`${BASE_URL}/${id}`, subcategory);
  return res.data;
};

export const deleteSubCategory = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
