import { Button } from "@mui/material";
import { IoClose } from "react-icons/io5";

function CartHeader({ orders, onClose }) {
  const totalQty = orders.reduce((sum, o) => sum + o.qty, 0);

  return (
    <h3 className="p-3 text-[18px] font-[500] flex items-center justify-between">
      <span>
        Shopping Cart&nbsp;
        <span className="text-primary">({totalQty})</span>
      </span>
      <Button
        className="!w-[35px] !min-w-[35px] !h-[35px] !rounded-full !bg-primary !text-white"
        onClick={onClose}
      >
        <IoClose size="20px" />
      </Button>
    </h3>
  );
}

export default CartHeader;
