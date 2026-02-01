import { Button } from "@mui/material";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function CartItem({ order, ordersContext }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="flex items-center gap-4">
        <div className="imgWrapper min-w-[75px] flex items-center justify-center bg-[#f1f1f1] border rounded-[8px] group overflow-hidden">
          <img
            src={order.img}
            alt={order.name}
            className="h-[80px] group-hover:scale-110 transition-all"
          />
        </div>

        <div>
          <Link to={`/product-details/${order.id}`}>
            <p className="font-[500] line-clamp-1 link">{order.name}</p>
          </Link>
          <p className="text-sm text-gray-500">Qty: {order.qty}</p>
          <p className="text-sm text-gray-500">
            Price per unit: ${order.newPrice}
          </p>
          <p className="font-[600] text-primary">
            Total: ${(order.newPrice * order.qty).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col ml-3">
        <Button
          onClick={() => ordersContext.addOnly(order)}
          className="!bg-primary !text-white !rounded-b-none"
        >
          <FaPlus />
        </Button>
        <Button
          onClick={() => ordersContext.delete(order)}
          className="!bg-red-600 !text-white !rounded-none"
        >
          <FaRegTrashAlt />
        </Button>
        <Button
          onClick={() => ordersContext.reduce(order)}
          className="!bg-primary !text-white !rounded-t-none"
        >
          <FaMinus />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
