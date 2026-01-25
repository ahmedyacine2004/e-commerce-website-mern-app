// ==================== ProductItemListView Component ====================

import { Link } from "react-router-dom";
import { useContext } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineZoomOutMap, MdOutlineShoppingCart } from "react-icons/md";
import { RiShareCircleLine } from "react-icons/ri";

import ModalContext from "../../Contexts/ModalContext";

import "./style.css";

function ProductItemListView({ product }) {
  const { handleClickOpenProductDetailsModal } = useContext(ModalContext);

  return (
    <div className="ProductItemListView rounded-md overflow-hidden border-[1px] bg-[#f1f1f1] shadow-lg border-primary flex items-center">
      {/* ==================== Product Image & Hover Actions ==================== */}
      <div className="group imgWrapper !w-[30%] rounded-md overflow-hidden relative transition-all">
        <Link to={"/"}>
          <div className="img !w-full overflow-hidden">
            <img
              src={product.img.url1}
              alt={product.alt}
              className="w-full object-cover group-hover:opacity-0"
            />
            <img
              src={product.img.url2}
              alt={product.alt}
              className="w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            />
          </div>
        </Link>

        {/* Discount Badge */}
        <div className="flex items-center justify-center absolute top-2 left-2">
          <span className="discount text-[10px] bg-red-500 text-white font-[600] px-2 py-1 rounded-md">
            {product.info.discountAmount}$ OFF
          </span>
        </div>

        {/* Hover Action Buttons */}
        <div className="actions absolute top-[-70%] right-2 group-hover:top-2 flex flex-col items-center justify-center gap-2 transition-all">
          {/* Wishlist */}
          <Tooltip
            title="Add to Wishlist"
            placement="left"
            arrow
            slotProps={{
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
              },
            }}
          >
            <Button
              variant="filled"
              className="!min-w-8 !min-h-8 !p-1 !bg-white !text-primary !rounded-full !shadow-md hover:!bg-primary hover:!text-white transition-all"
            >
              <FaRegHeart />
            </Button>
          </Tooltip>

          {/* Compare */}
          <Tooltip
            title="Compare"
            placement="left"
            arrow
            slotProps={{
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
              },
            }}
          >
            <Button
              variant="filled"
              className="!min-w-8 !min-h-8 !p-1 !bg-white !text-primary !rounded-full !shadow-md ml-2 hover:!bg-primary hover:!text-white transition-all"
            >
              <IoGitCompareOutline />
            </Button>
          </Tooltip>

          {/* Zoom */}
          <Tooltip
            title="Zoom"
            placement="left"
            arrow
            slotProps={{
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
              },
            }}
          >
            <Button
              onClick={() => handleClickOpenProductDetailsModal(product)}
              variant="filled"
              className="!min-w-8 !min-h-8 !p-1 !bg-white !text-primary !rounded-full !shadow-md hover:!bg-primary hover:!text-white transition-all"
            >
              <MdOutlineZoomOutMap />
            </Button>
          </Tooltip>

          {/* Share */}
          <Tooltip
            title="Share"
            placement="left"
            arrow
            slotProps={{
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
              },
            }}
          >
            <Button
              variant="filled"
              className="!min-w-8 !min-h-8 !p-1 !bg-white !text-primary !rounded-full !shadow-md ml-2 hover:!bg-primary hover:!text-white transition-all"
            >
              <RiShareCircleLine />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* ==================== Product Info ==================== */}
      <div className="info w-[75%] !text-black p-3 flex flex-col justify-start gap-2 px-8">
        {/* Category */}
        <h2 className="link text-start text-[14px] font-[400]">
          <Link to={"/"}>{product.info.category}</Link>
        </h2>

        {/* Name / Title */}
        <h3 className="title link text-start text-[24px] font-[600]">
          <Link to={"/"}>{product.info.name}</Link>
        </h3>

        {/* Description */}
        <p>
          <Link to={"/"}>{product.info.desc}</Link>
        </p>

        {/* Rating */}
        <Stack spacing={1}>
          <Rating
            name="size-small"
            defaultValue={1}
            size="small"
            readOnly={true}
          />
        </Stack>

        {/* Price */}
        <div className="flex items-baseline">
          <h5 className="text-[15px] font-[400] line-through text-gray-500 mr-2">
            ${product.info.oldPrice}
          </h5>
          <span className="text-[26px] font-[600] mt-1 text-primary mr-2">
            ${product.info.newPrice}
          </span>
        </div>

        {/* Add to Cart */}
        <Button
          startIcon={<MdOutlineShoppingCart />}
          variant="outlined"
          className="!text-primary !border-primary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductItemListView;
