/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import ModalContext from "../../Contexts/ModalContext";

import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";
import ProductOptions from "./ProductOptions";
import ProductActions from "./ProductActions";

function ProductDetails({ selectedProduct }) {
  const { colors, sizes, stock } = selectedProduct;

  const [orderInfo, setOrderInfo] = useState({
    amount: 1,
    selectedColor: "",
    selectedSize: "",
  });

  const { orders } = useContext(DrawerContext);
  const { handleCloseProductDetailsModal } = useContext(ModalContext);

  useEffect(() => {
    if (!colors || !sizes) return;
    setOrderInfo({
      amount: 1,
      selectedColor: colors?.[0] || "",
      selectedSize: sizes?.[0] || "",
    });
  }, [selectedProduct]);

  const increaseAmount = () => {
    setOrderInfo((p) => ({
      ...p,
      amount: p.amount < (stock || 1) ? p.amount + 1 : p.amount,
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
      <ProductHeader product={selectedProduct} />
      <ProductPrice product={selectedProduct} />
      <p className="text-[14px] mt-3">{selectedProduct.desc}</p>

      <ProductOptions
        info={{ colors, sizes }}
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
