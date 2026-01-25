// ==================== QtyBox Component ====================

import Button from "@mui/material/Button";
import { FaPlus, FaMinus } from "react-icons/fa";

function QtyBox({ amount, onIncrease, onDecrease }) {
  return (
    <>
      {/* ==================== Quantity Container ==================== */}
      <div className="qty flex items-center">
        {/* ==================== Display Current Amount ==================== */}
        <span className="flex items-center justify-center text-[16px] px-4 border-[1px] border-gray-700 h-[50px] w-[70px] rounded-l-md">
          {amount}
        </span>

        {/* ==================== Increment/Decrement Buttons ==================== */}
        <div className="btns flex flex-col">
          {/* Increase Button */}
          <Button
            onClick={onIncrease}
            className="!h-[25px] !w-[40px] !min-w-[35px] !bg-primary !text-white !rounded-l-none !rounded-br-none hover:opacity-75"
          >
            <FaPlus size={10} />
          </Button>

          {/* Decrease Button */}
          <Button
            onClick={onDecrease}
            className="!h-[25px] !w-[40px] !min-w-[35px] !bg-primary !text-white !rounded-l-none !rounded-tr-none hover:opacity-75"
          >
            <FaMinus size={10} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default QtyBox;
