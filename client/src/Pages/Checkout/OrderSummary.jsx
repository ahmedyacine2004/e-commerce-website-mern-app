import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";

function OrderSummary({ orders }) {
  return (
    <div className="shadow-md rounded-md bg-[#f1f1f1] p-5 mt-2">
      <h2 className="text-[18px] font-[600]">Order Summary</h2>
      <hr className="my-2" />

      <div className="flex flex-col gap-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
        {orders.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-[14px]">
            <div className="flex items-center gap-3">
              <img src={item.img} alt={item.name} className="w-10 h-10 object-cover rounded-md bg-white border" />
              <div className="flex flex-col">
                <span className="text-gray-700 line-clamp-1 max-w-[140px]">{item.name}</span>
                <span className="text-[12px] text-gray-500">${item.newPrice} × {item.qty}</span>
              </div>
            </div>
            <span className="font-[600] text-gray-800">${(item.newPrice * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      {/* Total items */}
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-gray-600">Total Items</span>
        <span className="text-[14px] font-[600]">{orders.reduce((sum, o) => sum + o.qty, 0)}</span>
      </div>

      {/* Total price */}
      <div className="flex items-center justify-between py-2 mt-2">
        <span className="text-[15px] font-[600]">Total Price</span>
        <span className="text-[16px] font-[700] text-primary">
          ${orders.reduce((sum, o) => sum + o.newPrice * o.qty, 0).toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-4">
        <Link to="/checkout">
          <Button endIcon={<BsFillBagCheckFill size={16} />} className="!w-full !py-2 !bg-primary !text-white !font-[600]">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSummary;
