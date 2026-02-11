import axios from "axios";

export const getMainBanners = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/main-banners`);
  return res.data;
};

export const createMainBanner = async (banner) => {
  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/main-banners`, banner);
  return res.data;
};

export const updateMainBanner = async (id, banner) => {
  const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/main-banners/${id}`, banner);
  return res.data;
};

export const deleteMainBanner = async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/main-banners/${id}`);
  return res.data;
};