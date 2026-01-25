import DrawerContext from "../Contexts/DrawerContext";
import ordersJSON from "../data/orders.json";
import { useState } from "react";

function DrawerProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orders, setOrders] = useState(ordersJSON);

  const reduceOrder = (orderToReduce) => {
    setOrders((prevOrders) => {
      const orderExists = prevOrders.find(
        (order) => order.id === orderToReduce.id,
      );

      if (orderExists && orderExists.qty > 1) {
        return prevOrders.map((order) =>
          order.id === orderToReduce.id
            ? { ...order, qty: order.qty - 1 }
            : order,
        );
      }

      // qty === 1 → remove item
      return prevOrders.filter((order) => order.id !== orderToReduce.id);
    });
  };

  const deleteOrder = (orderToDelete) => {
    setOrders((prevOrders) => {
      return prevOrders.filter((order) => order.id !== orderToDelete.id);
    });
  };

  const addOrderAndOpenDrawer = (orderToAdd, object) => {
    setOrders((prevOrders) => {
      const orderExists = prevOrders.find(
        (order) => order.id === orderToAdd.id,
      );

      if (orderExists) {
        return prevOrders.map((order) =>
          order.id === orderToAdd.id
            ? { ...order, qty: order.qty + object.amount }
            : order,
        );
      }
      // Add new product with only 4 fields + qty
      const newCartItem = {
        id: orderToAdd.id,
        name: orderToAdd.info.name,
        newPrice: orderToAdd.info.newPrice,
        oldPrice: orderToAdd.info.oldPrice,
        shipPerUnit: orderToAdd.info.shipPerUnit,
        img: orderToAdd.img.url1,
        qty: object.amount,
        selectedColor: object.color,
        sizes: orderToAdd.info.sizes,
        selectedSize: object.size,
        colors: orderToAdd.info.colors,
        category: object.category,
        rating: orderToAdd.info.rating,
      };

      return [...prevOrders, newCartItem];
    });
    setIsDrawerOpen(true);
  };

  const addOrder = (orderToAdd) => {
    setOrders((prevOrders) => {
      const orderExists = prevOrders.find(
        (order) => order.id === orderToAdd.id,
      );

      if (orderExists) {
        return prevOrders.map((order) =>
          order.id === orderToAdd.id ? { ...order, qty: order.qty + 1 } : order,
        );
      }
    });
  };

  const updateOrderColor = (orderId, color) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, selectedColor: color } : order,
      ),
    );
  };

  const updateOrderSize = (orderId, size) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, selectedSize: size } : order,
      ),
    );
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const contextValue = {
    drawer: {
      isOpen: isDrawerOpen,
      open: setIsDrawerOpen,
      close: closeDrawer,
    },
    orders: {
      list: orders,
      set: setOrders,
      addAndOpen: addOrderAndOpenDrawer,
      addOnly: addOrder,
      reduce: reduceOrder,
      open: openDrawer,
      delete: deleteOrder,
      updateColor: updateOrderColor,
      updateSize: updateOrderSize,
    },
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
