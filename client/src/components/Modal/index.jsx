// ==================== Modal Component ====================

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ProductZoom from "../ProductZoom";
import { IoClose } from "react-icons/io5";
import ProductDetailsComponent from "../ProductDetailsComponent";

function Modal({
  handleCloseProductDetailsModal,
  openProductDetailsModal,
  selectedProduct,
  maxWidth,
}) {
  // ==================== Guard Clause ====================
  // If no product is selected, render nothing
  if (!selectedProduct) return null;

  return (
    <div>
      {/* ==================== MUI Dialog ==================== */}
      <Dialog
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={maxWidth}
      >
        {/* ==================== Modal Container ==================== */}
        <div className="flex items-center w-full productDetailsModalContainer p-5 relative">
          {/* ==================== Close Button ==================== */}
          <Button
            className="!absolute top-[20px] right-[20px] !w-[35px] !min-w-[35px] !h-[35px] !rounded-full !bg-primary !text-white"
            onClick={() => handleCloseProductDetailsModal()}
          >
            <IoClose size={"20px"} />
          </Button>

          {/* ==================== Product Zoom Section ==================== */}
          <div className="col-1 w-[40%]">
            <ProductZoom product={selectedProduct} />
          </div>

          {/* ==================== Product Details Section ==================== */}
          <div className="col-2 w-[60%] px-10">
            <ProductDetailsComponent selectedProduct={selectedProduct} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Modal;
