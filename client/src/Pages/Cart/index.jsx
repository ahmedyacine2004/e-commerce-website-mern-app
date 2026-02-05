import { useContext, useState } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

function Cart() {
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    type: null,
    orderId: null,
  });

  const openMenu = (e, type, orderId) =>
    setMenuState({ anchorEl: e.currentTarget, type, orderId });
  const closeMenu = () =>
    setMenuState({ anchorEl: null, type: null, orderId: null });

  const context = useContext(DrawerContext);
  const orders = context.orders.list;
  console.log(orders);
  const totalQty = orders.reduce((sum, order) => sum + (order.qty || 0), 0);

  return (
    <section className="section pt-5">
      <Stack spacing={2} className="container pb-5">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link key="1" color="inherit" to="/" className="link">
            Home
          </Link>
          <Typography
            key="3"
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            Cart
          </Typography>
        </Breadcrumbs>
      </Stack>

      <div className="w-full bg-white pb-5">
        <div className="container flex gap-4 w-[80%] max-w-[80%]">
          <div className="leftPart w-[70%] py-3">
            <div className="shadow-md rounded-md p-5 bg-[#f1f1f1] mt-2">
              <h2 className="text-[18px] font-[600]">Your Cart</h2>
              <p className="text-[14px] mb-4">
                There are{" "}
                <span className="font-bold text-primary ">{totalQty}</span>{" "}
                products in your Cart
              </p>

              {orders.length === 0 ? (
                <span>No Product in the Cart</span>
              ) : (
                orders.map((order, idx) => (
                  <CartItem
                    key={idx}
                    order={order}
                    context={context}
                    menuState={menuState}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                  />
                ))
              )}
            </div>
          </div>

          <div className="rightPart w-[30%] py-3">
            <CartTotals orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
