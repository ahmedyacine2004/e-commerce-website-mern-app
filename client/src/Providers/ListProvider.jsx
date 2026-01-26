import { useState } from "react";
import { ListContext } from "../Contexts/ListContext";

const initialProducts = [
  {
    id: 20,
    name: "Product One",
    category: "Electronics",
    qty: 1,
    newPrice: 30,
    oldPrice: 90,
    shipPerUnit: 7,
    img: "https://m.media-amazon.com/images/I/51VDYCFi-KL._AC_SY300_SX300_QL70_ML2_.jpg",
    selectedColor: "purple",
    colors: ["red", "black", "yellow", "purple"],
    sizes: ["Medium", "Large", "Small"],
    selectedSize: "Large",
    rating: 4,
  },
  {
    id: 21,
    name: "Product Two",
    category: "Electronics",
    qty: 1,
    newPrice: 25,
    oldPrice: 50,
    shipPerUnit: 5,
    img: "https://m.media-amazon.com/images/I/71xffJfvWVL._AC_SX679_.jpg",
    selectedColor: "black",
    colors: ["red", "black", "purple"],
    sizes: ["Medium", "Large", "Small"],
    selectedSize: "Medium",
    rating: 5,
  },
];

export default function ListProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const updateColor = (id, color) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedColor: color } : p)),
    );
  };

  const updateSize = (id, size) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedSize: size } : p)),
    );
  };

  // ⭐ THIS IS THE KEY PART
  const clearList = () => {
    setProducts([]);
  };

  return (
    <ListContext.Provider
      value={{
        products,
        updateColor,
        updateSize,
        clearList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
