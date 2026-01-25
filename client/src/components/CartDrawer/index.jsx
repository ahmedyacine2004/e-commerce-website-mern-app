// ==================== Cart Drawer Component ====================
import { Drawer, Box, Divider, Button } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import { Link } from "react-router-dom";

function CartDrawer({ isOpen, onClose, orders }) {
  // ==================== Contexts ====================
  const context = useContext(DrawerContext);
  const ordersContext = context.orders;

  // ==================== Guard Clause ====================
  if (!orders || orders.length === 0) return null;

  // ==================== Drawer Content ====================
  const drawerContent = (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      className="categoryPanel !overflow-hidden "
    >
      <div className="MuiDrawer-paper relative h-screen flex flex-col">
        {/* ==================== Header ==================== */}
        <h3 className="p-3 text-[18px] font-[500] flex items-center justify-between ">
          <span>
            Shopping Cart&nbsp;
            <span className="text-primary">
              (
              {orders.reduce((sum, order) => {
                return sum + order.qty;
              }, 0)}
              )
            </span>
          </span>
          <Button
            className="!w-[35px] !min-w-[35px] !h-[35px] !rounded-full !bg-primary !text-white"
            onClick={onClose}
          >
            <IoClose size="20px" />
          </Button>
        </h3>

        <Divider />

        {/* ==================== Orders List ==================== */}
        <div className="p-3 space-y-3 overflow-y-auto pb-4 flex-1">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-4">
                <div className="imgWrapper min-w-[75px] flex items-center justify-center bg-[#f1f1f1] border-[1px] border-[#000000bd] rounded-[8px] group overflow-hidden">
                  <img
                    src={order.img}
                    alt={order.name}
                    className="h-[80px] group-hover:scale-110 transition-all"
                  />
                </div>
                <div>
                  <Link to={`/product-details/${order.id}`}>
                    <p className="font-[500] line-clamp-1 link">{order.name}</p>
                  </Link>
                  <p className="text-sm text-gray-500">Qty: {order.qty}</p>
                  <p className="text-sm text-gray-500">
                    Price per unit : ${order.newPrice}
                  </p>
                  <p className="font-[600] text-primary">
                    Total : ${(order.newPrice * order.qty).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ml-3">
                <Button
                  onClick={() => {
                    ordersContext.addOnly(order);
                  }}
                  className="!w-[50px] !min-w-[50px] !min-h-[25px] !bg-primary !text-white !rounded-b-none cursor-pointer"
                >
                  <FaPlus />
                </Button>
                <Button
                  onClick={() => {
                    ordersContext.delete(order);
                  }}
                  className="!w-[50px] !min-w-[50px] !min-h-[25px] !bg-red-600 !text-white !rounded-none cursor-pointer"
                >
                  <FaRegTrashAlt />
                </Button>
                <Button
                  onClick={() => {
                    ordersContext.reduce(order);
                  }}
                  className="!w-[50px] !min-w-[50px] !min-h-[25px] !bg-primary !text-white !rounded-t-none cursor-pointer"
                >
                  <FaMinus />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* ==================== Orders Total info ==================== */}
        <div className="bottomInfo w-full border-t-[1px] border-[#0000003a] flex flex-col items-center py-2 bg-white">
          <div className="flex flex-col items-center w-full border-b-[1px] border-[rgba(0,0,0,0.3)] py-1">
            <div className="w-full flex items-center justify-between px-4 py-1">
              <span className="text-[14px]">
                {orders.reduce((sum, order) => {
                  return sum + order.qty;
                }, 0)}{" "}
                item(s)
              </span>
              <span className="font-[600] text-[14px] text-primary">
                $
                {orders.reduce((sum, order) => {
                  return sum + order.newPrice * order.qty;
                }, 0)}
              </span>
            </div>
            <div className="w-full flex items-center justify-between px-4 py-1">
              <span className="text-[14px]">Shipping</span>
              <span className="font-[600] text-[14px] text-primary">
                ${" "}
                {orders.reduce((sum, order) => {
                  return sum + order.shipPerUnit * order.qty;
                }, 0)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full border-b-[1px] border-[rgba(0,0,0,0.3)] py-1">
            <div className="w-full flex items-center justify-between px-4 py-1">
              <span className="text-[14px]">
                Total <span className="font-[600]">(Tax .exclu)</span>
              </span>
              <span className="font-[600] text-[14px] text-primary">
                $
                {orders.reduce((sum, order) => {
                  return (
                    sum +
                    order.newPrice * order.qty +
                    order.shipPerUnit * order.qty
                  );
                }, 0)}
              </span>
            </div>
            <div className="w-full flex items-center justify-between px-4 py-1">
              <span className="text-[14px]">
                Total <span className="font-[600]">(Tax .inclu [10%])</span>
              </span>
              <span className="font-[600] text-[14px] text-primary">
                $
                {(() => {
                  const total = orders.reduce(
                    (sum, order) =>
                      sum +
                      order.newPrice * order.qty +
                      order.shipPerUnit * order.qty,
                    0,
                  );
                  return (total + total * 0.1).toFixed(2);
                })()}
              </span>
            </div>
            <div className="w-full flex items-center justify-between px-4 py-1">
              <span className="text-[14px]">Taxes</span>
              <span className="font-[600] text-[14px] text-primary">
                $
                {(() => {
                  const total = orders.reduce(
                    (sum, order) =>
                      sum +
                      order.newPrice * order.qty +
                      order.shipPerUnit * order.qty,
                    0,
                  );
                  return (total * 0.1).toFixed(2);
                })()}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-around w-full gap-2 py-3 px-2">
            <Link
              to={"/cart"}
              className="!w-[50%] !min-w-[45%]"
              onClick={() => {
                context.drawer.close();
              }}
            >
              <Button className="btn-org-v2 w-full">View Cart</Button>
            </Link>
            <Link to={"/checkout"} className="!w-[50%] !min-w-[45%]">
              <Button className="btn-org-v2  w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className="!min-w-[500px] !w-[500px] "
    >
      {drawerContent}
    </Drawer>
  );
}

export default CartDrawer;
