import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MdOutlineShoppingCart } from "react-icons/md";

function ProductInfo({ product }) {
  const { info } = product;

  return (
    <div className="info !text-black p-3">
      {/* Category */}
      <h2 className="text-start link text-[14px]">
        <Link to="/">{info.category}</Link>
      </h2>

      {/* Name */}
      <h3 className="text-start title link text-[18px] font-[600] mb-2 min-h-[50px]">
        <Link to="/">{info.name}</Link>
      </h3>

      {/* Rating */}
      <Stack spacing={1}>
        <Rating value={info.rating} size="small" readOnly />
      </Stack>

      {/* Price */}
      <div className="flex items-baseline py-2">
        <h5 className="line-through text-gray-500 mr-2">
          ${info.oldPrice}
        </h5>
        <span className="text-[22px] font-[600] text-primary">
          ${info.newPrice}
        </span>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <Button variant="outlined" className="!text-primary !border-primary">
          Add to List
        </Button>

        <Button
          startIcon={<MdOutlineShoppingCart />}
          variant="outlined"
          className="!bg-primary !text-white !border-primary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
