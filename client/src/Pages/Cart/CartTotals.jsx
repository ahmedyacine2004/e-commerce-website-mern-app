import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";

function CartTotals({ orders }) {
  const itemsQty = orders.reduce((sum, o) => sum + o.qty, 0);
  const subtotal = orders.reduce((sum, o) => sum + o.newPrice * o.qty, 0);
  const shipping = orders.reduce((sum, o) => sum + o.shipPerUnit * o.qty, 0);
  const savings = orders.reduce((sum, o) => sum + (o.oldPrice - o.newPrice) * o.qty, 0);
  const base = subtotal + shipping;
  const tax = (base * 0.1).toFixed(2);
  const total = (base + base * 0.1).toFixed(2);

  return (
    <div className="shadow-md rounded-md bg-[#f1f1f1] p-5 mt-2 lg:min-h-[430px]">
      <h2 className="text-[18px] font-[600]">Cart Totals</h2>
      <hr className="my-2" />
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-gray-600">Items</span>
        <span className="text-[14px] font-[600]">{itemsQty}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-gray-600">Subtotal</span>
        <span className="text-[14px] font-[600]">${subtotal}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-gray-600">Shipping</span>
        <span className="text-[14px] font-[600]">${shipping}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-green-600">You Save</span>
        <span className="text-[14px] font-[600] text-green-600">-${savings}</span>
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-between py-1">
        <span className="text-[14px] text-gray-600">Tax (10%)</span>
        <span className="text-[14px] font-[600]">${tax}</span>
      </div>
      <hr className="my-3" />
      <div className="flex items-center justify-between py-2 mt-1">
        <span className="text-[15px] font-[600]">Total</span>
        <span className="text-[16px] font-[700] text-primary">${total}</span>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Link to="/checkout">
          <Button endIcon={<BsFillBagCheckFill size={16} />} className="!w-full !py-2 !bg-primary !text-white !font-[600]">
            Proceed to Checkout
          </Button>
        </Link>
        <Link to="/">
          <button className="w-full text-[14px] py-2 rounded border border-primary text-primary font-[600]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartTotals;
