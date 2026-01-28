import { useContext, useState } from "react";
import OrdersContext from "../../Contexts/OrdersContext";
import DashboardBoxes from "../../Components/DashboardBoxes";
import StatusBadge from "../../components/StatusBadge";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Rating from "@mui/material/Rating";
import { Fragment } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FaPlus } from "react-icons/fa6";

function AdminDashboard() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleRow = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <section className="p-8 w-full">
      {/* Welcome Banner */}
      <div className="w-full p-5 pb-2 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-lg">
        <div className="flex items-start justify-between w-full">
          <div className="info">
            <h1 className="text-[28px] font-[600]">
              Welcome, <br /> {"Ahmed Yassine Abbane"} 👋
            </h1>
            <p className="text-[rgba(0,0,0,0.7)]">
              Here's what's happening on your store today. See the statistics at
              a glance.
            </p>
            <Button
              startIcon={<FaPlus />}
              className="!bg-primary !py-2 !px-4 !text-white !mt-4"
            >
              Add Product
            </Button>
          </div>

          <div className="imgWrapper -mt-16">
            <img
              src="./images/3d-Store.png"
              alt="store 3d"
              className="w-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Boxes */}
      <DashboardBoxes />

      {/* Orders Table */}
      <div className="recentOrders w-full p-2 mt-5 border border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg shadow-md">
        <h2 className="text-[20px] font-[600] text-primary">Recent Orders</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <Fragment key={order.id}>
                  {/* MAIN ROW */}
                  <TableRow hover>
                    <TableCell>
                      <Button size="small" onClick={() => toggleRow(order.id)}>
                        {expandedOrderId === order.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell>{order.id}</TableCell>

                    {/* Customer */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={order.user.pfp}
                          alt={order.user.fullName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col text-xs">
                          <span className="font-medium">
                            {order.user.fullName}
                          </span>
                          <span className="text-gray-500">
                            {order.user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{order.paymentId}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell
                      onClick={() => toggleRow(order.id)}
                      className="cursor-pointer text-blue-600 underline"
                    >
                      {order.products.length} items
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          variant="outlined"
                          disabled={order.status !== "pending"}
                          onClick={() =>
                            updateOrderStatus(order.id, "determined")
                          }
                        >
                          Determine
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          disabled={order.status !== "pending"}
                          onClick={() =>
                            updateOrderStatus(order.id, "cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* COLLAPSIBLE PRODUCTS TABLE */}
                  <TableRow>
                    <TableCell colSpan={9} sx={{ p: 0 }}>
                      <Collapse
                        in={expandedOrderId === order.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="p-3 bg-gray-50">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                              Products (Order #{order.id})
                            </span>
                            <span className="text-xs text-gray-500">
                              {order.products.length} items
                            </span>
                          </div>

                          <Table size="small" sx={{ tableLayout: "fixed" }}>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ py: 0.75 }}>Product</TableCell>
                                <TableCell sx={{ py: 0.75 }}>Cat</TableCell>
                                <TableCell sx={{ py: 0.75 }}>Color</TableCell>
                                <TableCell sx={{ py: 0.75 }}>Size</TableCell>
                                <TableCell sx={{ py: 0.75 }} align="center">
                                  Qty
                                </TableCell>
                                <TableCell sx={{ py: 0.75 }} align="right">
                                  Price
                                </TableCell>
                                <TableCell sx={{ py: 0.75 }} align="center">
                                  Rating
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {order.products.map((p) => (
                                <TableRow key={p.id} hover>
                                  <TableCell sx={{ py: 0.5 }}>
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={p.img}
                                        alt={p.name}
                                        className="w-8 h-8 rounded object-cover"
                                      />
                                      <span className="text-sm truncate max-w-[180px]">
                                        {p.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }}>
                                    <span className="text-xs text-gray-600">
                                      {p.category}
                                    </span>
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }}>
                                    <span className="text-xs">
                                      {p.selectedColor || "—"}
                                    </span>
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }}>
                                    <span className="text-xs">
                                      {p.selectedSize || "—"}
                                    </span>
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }} align="center">
                                    x{p.qty}
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }} align="right">
                                    ${p.newPrice}
                                  </TableCell>
                                  <TableCell sx={{ py: 0.5 }} align="center">
                                    <Rating
                                      value={p.rating}
                                      precision={0.5}
                                      size="small"
                                      readOnly
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}

export default AdminDashboard;
