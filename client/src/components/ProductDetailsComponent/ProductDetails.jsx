/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import ModalContext from "../../Contexts/ModalContext";

import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";
import ProductOptions from "./ProductOptions";
import ProductActions from "./ProductActions";

function ProductDetails({ selectedProduct }) {
  const info = selectedProduct?.info || {};

  const [orderInfo, setOrderInfo] = useState({
    amount: 1,
    selectedColor: "",
    selectedSize: "",
  });

  const { orders } = useContext(DrawerContext);
  const { handleCloseProductDetailsModal } = useContext(ModalContext);

  useEffect(() => {
    if (!info) return;
    setOrderInfo({
      amount: 1,
      selectedColor: info.colors?.[0] || "",
      selectedSize: info.sizes?.[0] || "",
    });
  }, [selectedProduct]);

  const increaseAmount = () => {
    setOrderInfo((p) => ({
      ...p,
      amount: p.amount < (info.stock || 1) ? p.amount + 1 : p.amount,
    }));
  };

  const decreaseAmount = () => {
    setOrderInfo((p) => ({
      ...p,
      amount: p.amount > 1 ? p.amount - 1 : p.amount,
    }));
  };

  const handleAddToCart = () => {
    orders.addAndOpen(selectedProduct, {
      amount: orderInfo.amount,
      color: orderInfo.selectedColor,
      size: orderInfo.selectedSize,
      category: selectedProduct.category,
    });
    handleCloseProductDetailsModal();
  };

  return (
    <div className="product-details">
      <ProductHeader info={info} />
      <ProductPrice info={info} />
      <p className="text-[14px] mt-3">{info.desc}</p>

      <ProductOptions
        info={info}
        orderInfo={orderInfo}
        setOrderInfo={setOrderInfo}
      />

      <ProductActions
        amount={orderInfo.amount}
        increase={increaseAmount}
        decrease={decreaseAmount}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ProductDetails;
