import { createContext, useContext } from "react";

const OrdersContext = createContext();

// Hook for easier usage
export const useOrders = () => useContext(OrdersContext);

export default OrdersContext;
