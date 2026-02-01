import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import QtyBox from "../QtyBox";

function ProductActions({ amount, increase, decrease, onAddToCart }) {
  return (
    <>
      <div className="flex items-center gap-5 mt-4">
        <QtyBox
          amount={amount}
          onIncrease={increase}
          onDecrease={decrease}
        />

        <Button
          startIcon={<MdOutlineShoppingCart />}
          onClick={onAddToCart}
          className="!py-[12px] !px-[24px] !bg-primary !text-white"
        >
          Add to Cart
        </Button>
      </div>

      <div className="flex gap-4 mt-4">
        <span className="link flex items-center gap-2 cursor-pointer">
          <FaRegHeart /> Add to Wishlist
        </span>
        <span className="link flex items-center gap-2 cursor-pointer">
          <IoGitCompareOutline /> Add to Compare
        </span>
      </div>
    </>
  );
}

export default ProductActions;
