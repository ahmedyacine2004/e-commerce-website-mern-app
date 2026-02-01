import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MdOutlineShoppingCart } from "react-icons/md";

function ProductListInfo({ product }) {
  const { info } = product;

  return (
    <div className="info w-[75%] !text-black p-3 flex flex-col gap-2 px-8">
      {/* Category */}
      <h2 className="link text-[14px]">
        <Link to="/">{info.category}</Link>
      </h2>

      {/* Name */}
      <h3 className="title link text-[24px] font-[600]">
        <Link to="/">{info.name}</Link>
      </h3>

      {/* Description */}
      <p>
        <Link to="/">{info.desc}</Link>
      </p>

      {/* Rating */}
      <Stack spacing={1}>
        <Rating value={info.rating} size="small" readOnly />
      </Stack>

      {/* Price */}
      <div className="flex items-baseline">
        <h5 className="line-through text-gray-500 mr-2">
          ${info.oldPrice}
        </h5>
        <span className="text-[26px] font-[600] text-primary">
          ${info.newPrice}
        </span>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Button variant="outlined" className="!text-primary !border-primary flex-1">
          Add to List
        </Button>

        <Button
          startIcon={<MdOutlineShoppingCart />}
          variant="outlined"
          className="!bg-primary !text-white !border-primary flex-1"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductListInfo;
