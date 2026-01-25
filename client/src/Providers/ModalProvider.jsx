/* eslint-disable no-unused-vars */
import { useState } from "react";
import ModalContext from "../Contexts/ModalContext";

function ModalProvider({ children }) {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);

  const handleClickOpenProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setOpenProductDetailsModal(true);
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
    setSelectedProduct(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openProductDetailsModal,
        selectedProduct,
        handleClickOpenProductDetailsModal,
        handleCloseProductDetailsModal,
        maxWidth,
        fullWidth,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
