import Rating from "@mui/material/Rating";

function ProductHeader({ info }) {
  return (
    <>
      <h1 className="text-[22px] font-[600] mb-3">{info.name}</h1>

      <div className="flex gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands: <span className="text-black font-[500]">{info.brand}</span>
        </span>
        <Rating value={info.rating || 0} size="small" readOnly />
        <span className="text-[13px]">Rating ({info.rating})</span>
      </div>
    </>
  );
}

export default ProductHeader;
