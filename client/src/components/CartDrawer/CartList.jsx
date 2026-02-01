import CartItem from "./CartItem";

function CartList({ orders, ordersContext }) {
  return (
    <div className="p-3 space-y-3 overflow-y-auto pb-4 flex-1">
      {orders.map((order) => (
        <CartItem
          key={order.id}
          order={order}
          ordersContext={ordersContext}
        />
      ))}
    </div>
  );
}

export default CartList;
