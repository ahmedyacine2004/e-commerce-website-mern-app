import { Button } from "@mui/material";
import { FaCheck } from "react-icons/fa";

const colorMap = {
  black: "bg-black",
  white: "bg-white border border-gray-300",
  gray: "bg-gray-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
};

function ProductOptions({ info, orderInfo, setOrderInfo }) {
  return (
    <>
      {/* Colors */}
      <div className="flex gap-3 mt-4">
        {info.colors?.map((color) => (
          <span
            key={color}
            className={`w-[35px] h-[35px] rounded-full ${
              colorMap[color.toLowerCase()] || "bg-gray-300"
            } flex items-center justify-center cursor-pointer`}
            onClick={() =>
              setOrderInfo((p) => ({ ...p, selectedColor: color }))
            }
          >
            <FaCheck
              className={`${
                orderInfo.selectedColor === color
                  ? "opacity-100"
                  : "opacity-0"
              } ${
                color === "white" ? "text-black" : "text-white"
              }`}
            />
          </span>
        ))}
      </div>

      {/* Sizes */}
      <div className="flex items-center gap-3 mt-4">
        <span className="font-bold">Sizes:</span>
        {info.sizes?.map((size) => (
          <Button
            key={size}
            className={`!min-w-[50px] ${
              orderInfo.selectedSize === size &&
              "!bg-primary !text-white"
            }`}
            onClick={() =>
              setOrderInfo((p) => ({ ...p, selectedSize: size }))
            }
          >
            {size}
          </Button>
        ))}
      </div>
    </>
  );
}

export default ProductOptions;
