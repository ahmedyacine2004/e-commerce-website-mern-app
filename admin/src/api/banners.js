import axios from "axios";

export const getBanners = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/banners`);
  return res.data;
};

export const createBanner = async (banner) => {
  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/banners`, banner);
  return res.data;
};

export const updateBanner = async (id, banner) => {
  const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/banners/${id}`, banner);
  return res.data;
};

export const deleteBanner = async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/banners/${id}`);
  return res.data;
};
