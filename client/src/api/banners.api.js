import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getBanners = async () => {
  const res = await axios.get(`${API_BASE_URL}/banners`);
  return res.data;
};