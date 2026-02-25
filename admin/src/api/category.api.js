import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/categories`;

export const getCategories = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createCategory = async (category) => {
  const res = await axios.post(BASE_URL, category);
  return res.data;
};

export const updateCategory = async (id, category) => {
  const res = await axios.put(`${BASE_URL}/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
