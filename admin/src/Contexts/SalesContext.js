import { createContext, useContext } from "react";

const SalesContext = createContext(null);

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};

export default SalesContext;
