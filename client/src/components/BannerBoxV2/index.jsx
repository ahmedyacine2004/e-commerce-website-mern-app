import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

/**
 * BannerBoxV2 Component
 * ---------------------
 * Displays a product banner with image, overlay, and product info.
 *
 * Props:
 * - url: Image URL
 * - direction: "left" or "right" for info alignment
 * - productName: Name of the product
 * - productPrice: Price of the product
 */
function BannerBoxV2({ url, direction, productName, productPrice }) {
  return (
    <div className="BannerBoxV2 w-full overflow-hidden rounded-md h-[50%] group relative">
      {/* Semi-transparent overlay */}
      <div className="overlay absolute top-0 !h-full !w-full bg-[rgba(255,255,255,0.2)] z-40"></div>

      {/* Banner image with hover scale effect */}
      <img
        src={url}
        alt="Banner box"
        className="w-full transition-all duration-300 group-hover:scale-110"
      />

      {/* Product info container */}
      <div
        className={`info flex flex-col justify-center items-start h-full p-5 w-[70%] absolute top-0 z-50 ${
          direction === "right" ? "right-0" : "left-0"
        }`}
      >
        {/* Product Name */}
        <h2 className="text-[24px] font-[600] mb-2">{productName}</h2>

        {/* Product Price */}
        <span className="text-primary text-[20px] font-[800] mb-2">
          {productPrice}
        </span>

        {/* Shop Now Link */}
        <Link to={"/"} className="link text-[16px] font-[600] underline">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}

export default BannerBoxV2;
