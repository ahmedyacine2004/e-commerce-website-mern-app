import Rating from "@mui/material/Rating";

function ProductHeader({ product }) {
  return (
    <>
      <h1 className="text-[22px] font-[600] mb-3">{product.name}</h1>

      <div className="flex gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands: <span className="text-black font-[500]">{product.brand}</span>
        </span>
        <Rating value={product.rating || 0} size="small" readOnly />
        <span className="text-[13px]">Rating ({product.rating})</span>
      </div>
    </>
  );
}

export default ProductHeader;
