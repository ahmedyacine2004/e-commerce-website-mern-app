import { createContext, useContext } from "react";

export const ListContext = createContext(null);

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};