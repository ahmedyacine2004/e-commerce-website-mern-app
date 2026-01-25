/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCheck, FaRegHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import QtyBox from "../QtyBox";
import DrawerContext from "../../Contexts/DrawerContext";
import ModalContext from "../../Contexts/ModalContext";

function ProductDetailsComponent({ selectedProduct }) {
  // ==================== Guard Clause ====================
  const info = selectedProduct?.info || {};

  // ==================== State Initialization ====================
  const [orderInfo, setOrderInfo] = useState({
    amount: 1,
    selectedColor: "",
    selectedSize: "",
  });

  // ==================== Context Destruction ====================
  const { orders } = useContext(DrawerContext);
  const { handleCloseProductDetailsModal } = useContext(ModalContext);

  // ==================== Set default color & size on product change ====================
  useEffect(() => {
    if (!info) return;
    setOrderInfo({
      amount: 1,
      selectedColor: info.colors?.[0] || "",
      selectedSize: info.sizes?.[0] || "",
    });
  }, [selectedProduct]);

  // ==================== Handlers for Quantity ====================
  const increaseAmount = () => {
    setOrderInfo((prev) => ({
      ...prev,
      amount: prev.amount < (info.stock || 1) ? prev.amount + 1 : prev.amount,
    }));
  };

  const decreaseAmount = () => {
    setOrderInfo((prev) => ({
      ...prev,
      amount: prev.amount > 1 ? prev.amount - 1 : prev.amount,
    }));
  };

  // ==================== Map color names to Tailwind classes ====================
  const getBgClass = (color) => {
    const map = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      "heather gray": "bg-gray-400",
      red: "bg-red-500",
      yellow: "bg-yellow-400",
      blue: "bg-blue-500",
      "navy blue": "bg-blue-900",
      green: "bg-green-500",
      "light gray": "bg-gray-300",
    };
    return map[color.toLowerCase()] || "bg-gray-300";
  };

  return (
    <div key={selectedProduct.id} className="product-details">
      {/* ==================== Product Name ==================== */}
      <h1 className="text-[22px] font-[600] mb-3">{info.name}</h1>

      {/* ==================== Brand & Rating ==================== */}
      <div className="flex gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands: <span className="text-black font-[500]">{info.brand}</span>
        </span>
        <Rating value={info.rating || 0} size="small" readOnly />
        <span className="text-[13px] cursor-pointer">
          Rating ({info.rating})
        </span>
      </div>

      {/* ==================== Price & Stock ==================== */}
      <div className="flex items-baseline mt-2">
        <h5 className="text-[16px] font-[400] line-through text-gray-500 mr-2">
          ${info.oldPrice}
        </h5>
        <span className="text-[22px] font-[600] mt-1 text-primary mr-2">
          ${info.newPrice}
        </span>
        <span className="text-[13px] cursor-pointer ml-5">
          Available in Stock:{" "}
          <span
            className={`font-bold ${
              info.available ? "text-green-500" : "text-red-500"
            }`}
          >
            ({info.stock})
          </span>
        </span>
      </div>

      {/* ==================== Description ==================== */}
      <p className="text-[14px] mt-3">{info.desc}</p>

      {/* ==================== Colors ==================== */}
      <div className="colors flex items-center gap-3 mt-4">
        {info.colors?.map((color) => (
          <span
            key={color}
            className={`w-[35px] h-[35px] rounded-full ${getBgClass(color)} flex items-center justify-center cursor-pointer`}
            onClick={() =>
              setOrderInfo((prev) => ({ ...prev, selectedColor: color }))
            }
          >
            <FaCheck
              className={`${
                orderInfo.selectedColor === "white"
                  ? "text-black"
                  : "text-white"
              } transition-all ${
                orderInfo.selectedColor === color ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        ))}
      </div>

      {/* ==================== Sizes ==================== */}
      <div className="sizes flex items-baseline gap-3 mt-4">
        <span className="text-[16px] font-bold">Sizes:</span>
        {info.sizes?.map((size, index) => (
          <Button
            key={index}
            className={`!w-auto !h-[40px] !min-w-[50px] !text-primary ${
              orderInfo.selectedSize === size && "!bg-primary !text-white"
            }`}
            onClick={() =>
              setOrderInfo((prev) => ({ ...prev, selectedSize: size }))
            }
          >
            {size}
          </Button>
        ))}
      </div>

      {/* ==================== Quantity + Add to Cart ==================== */}
      <div className="flex items-center gap-5 mt-3">
        <QtyBox
          amount={orderInfo.amount}
          onIncrease={increaseAmount}
          onDecrease={decreaseAmount}
        />
        <div className="cta">
          <Button
            onClick={() => {
              orders.addAndOpen(selectedProduct, {
                amount: orderInfo.amount,
                color: orderInfo.selectedColor,
                size: orderInfo.selectedSize,
                category: selectedProduct.category,
              });
              handleCloseProductDetailsModal();
            }}
            startIcon={<MdOutlineShoppingCart />}
            className="!h-auto !w-auto !min-w-auto !py-[12px] !px-[24px] !bg-primary !text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* ==================== Wishlist + Compare ==================== */}
      <div className="flex items-center gap-4 mt-4">
        <span className="link cursor-pointer text-[15px] flex items-center gap-3 font-[500]">
          <FaRegHeart className="text-[18px]" /> Add to Wishlist
        </span>
        <span className="link cursor-pointer text-[15px] flex items-center gap-3 font-[500]">
          <IoGitCompareOutline className="text-[18px]" /> Add to Compare
        </span>
      </div>
    </div>
  );
}

export default ProductDetailsComponent;
