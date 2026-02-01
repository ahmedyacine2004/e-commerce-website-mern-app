import { Drawer, Box, Divider } from "@mui/material";
import { useContext } from "react";
import DrawerContext from "../../Contexts/DrawerContext";

import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

function CartDrawer({ isOpen, onClose, orders }) {
  const context = useContext(DrawerContext);
  const ordersContext = context.orders;

  if (!orders || orders.length === 0) return null;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className="!min-w-[500px] !w-[500px]"
    >
      <Box
        sx={{ width: 350 }}
        role="presentation"
        className="categoryPanel !overflow-hidden"
      >
        <div className="relative h-screen flex flex-col">
          <CartHeader orders={orders} onClose={onClose} />
          <Divider />

          <CartList orders={orders} ordersContext={ordersContext} />

          <CartSummary orders={orders} onClose={context.drawer.close} />
        </div>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
