import { useState } from "react";
import OrdersContext from "../Contexts/OrdersContext";
import ordersData from "../data/oldOrders.json";

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(ordersData);

  // Add new order
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(), // simple unique id
      orderDate: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  // Update status of an order
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  // Get orders by status
  const getOrdersByStatus = (status) =>
    orders.filter((o) => o.status === status);

  // Get orders by userId
  const getOrdersByUser = (userId) => orders.filter((o) => o.userId === userId);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByStatus,
        getOrdersByUser,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
