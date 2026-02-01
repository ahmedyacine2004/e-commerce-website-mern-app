import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import OrdersContext from "../../Contexts/OrdersContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import OrderRow from "./OrderRow";

function Orders() {
  const { user, logout } = useContext(UserContext);
  const { orders, updateOrderStatus } = useContext(OrdersContext);

  const userOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <section className="p-8 w-full">
      <div className="container flex gap-5">
        <div className="col-1 w-[20%]">
          <ProfileSidebar user={user} logout={logout} isPfpEdit={false} activeTab="orders" />
        </div>

        <div className="col-2 w-[80%] max-w-[902px]">
          <div className="bg-white p-5 shadow-md rounded-md">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1400 }}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Order ID</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    userOrders.map((order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        updateOrderStatus={updateOrderStatus}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
