import { useState, useEffect } from "react";
import SalesContext from "../Contexts/SalesContext";
import salesData from "../data/sales.json";

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSales(salesData); // simulate fetching
  }, []);

  return (
    <SalesContext.Provider value={{ sales }}>{children}</SalesContext.Provider>
  );
};
