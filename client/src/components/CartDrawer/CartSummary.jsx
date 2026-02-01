import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CartSummary({ orders, onClose }) {
  const items = orders.reduce((s, o) => s + o.qty, 0);
  const subtotal = orders.reduce(
    (s, o) => s + o.newPrice * o.qty,
    0,
  );
  const shipping = orders.reduce(
    (s, o) => s + o.shipPerUnit * o.qty,
    0,
  );
  const total = subtotal + shipping;
  const tax = total * 0.1;

  return (
    <div className="border-t flex flex-col bg-white">
      <div className="px-4 py-2 border-b">
        <div className="flex justify-between text-sm">
          <span>{items} item(s)</span>
          <span className="text-primary font-[600]">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-primary font-[600]">${shipping}</span>
        </div>
      </div>

      <div className="px-4 py-2 border-b">
        <div className="flex justify-between text-sm">
          <span>Total (Tax exclu)</span>
          <span className="text-primary font-[600]">${total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total (Tax inclu)</span>
          <span className="text-primary font-[600]">
            ${(total + tax).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes</span>
          <span className="text-primary font-[600]">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-2 p-3">
        <Link to="/cart" className="w-1/2" onClick={onClose}>
          <Button className="btn-org-v2 w-full">View Cart</Button>
        </Link>
        <Link to="/checkout" className="w-1/2">
          <Button className="btn-org-v2 w-full">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
