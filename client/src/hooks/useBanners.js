import { useEffect, useState } from "react";
import { getBanners } from "../api/banners.api";

export default function useBanners() {
  const [Banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        setError(err.message || "Failed to load Banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { Banners, loading, error };
}
