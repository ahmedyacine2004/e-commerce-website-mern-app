/* eslint-disable no-unused-vars */
import { useState } from "react";
import ModalContext from "../Contexts/ModalContext";

function ModalProvider({ children }) {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);

  // ===== NEW GENERIC MODAL STATE =====
  const [open, setOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const handleClickOpenProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setOpenProductDetailsModal(true);
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
    setSelectedProduct(null);
  };

  // ===== GENERIC OPEN / CLOSE =====
  const openModal = ({ payload = null, content = null }) => {
    setModalPayload(payload);
    setModalContent(content);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalPayload(null);
    setModalContent(null);
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
        setSelectedProduct,

        // ===== NEW GENERIC API =====
        open,
        modalPayload,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
