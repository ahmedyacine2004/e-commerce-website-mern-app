import { useState, useEffect } from "react";
import { getMainBanners } from "../api/mainBanners";

const useMainBanners = () => {
  const [MainBanners, setMainBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainBanners = async () => {
      try {
        setLoading(true);
        const data = await getMainBanners();
        setMainBanners(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching main banners:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMainBanners();
  }, []);

  return { MainBanners, loading, error };
};

export default useMainBanners;
