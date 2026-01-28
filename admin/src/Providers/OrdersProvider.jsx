import { useState } from "react";
import OrdersContext from "../Contexts/OrdersContext";

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      user: {
        id: "USR001",
        fullName: "Ahmed Yassine Abbane",
        email: "ahmed@example.com",
        pfp: "https://i.pravatar.cc/150?img=32",
      },
      paymentId: "PAY12345",
      status: "pending",
      totalAmount: 3298,
      orderDate: new Date().toISOString(),
      products: [
        {
          id: "PRD001",
          name: 'Apple MacBook Pro 17"',
          img: "https://via.placeholder.com/150?text=MacBook",
          category: "Laptop",
          selectedColor: "Silver",
          selectedSize: null,
          qty: 1,
          newPrice: 2999,
          rating: 4.5,
        },
        {
          id: "PRD002",
          name: "Magic Mouse 2",
          img: "https://via.placeholder.com/150?text=Mouse",
          category: "Accessories",
          selectedColor: "Black",
          selectedSize: null,
          qty: 1,
          newPrice: 299,
          rating: 4,
        },
      ],
    },
    {
      id: "ORD002",
      user: {
        id: "USR002",
        fullName: "Sara Ahmed",
        email: "sara@example.com",
        pfp: "https://i.pravatar.cc/150?img=12",
      },
      paymentId: "PAY12346",
      status: "determined",
      totalAmount: 799,
      orderDate: new Date().toISOString(),
      products: [
        {
          id: "PRD003",
          name: "Google Pixel Phone",
          img: "https://via.placeholder.com/150?text=Pixel+Phone",
          category: "Phone",
          selectedColor: "Gray",
          selectedSize: null,
          qty: 1,
          newPrice: 799,
          rating: 4,
        },
      ],
    },
  ]);

  // Update order status by order id
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  // Add new order
  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <OrdersContext.Provider value={{ orders, updateOrderStatus, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
