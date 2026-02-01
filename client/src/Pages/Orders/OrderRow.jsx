import { useState } from "react";
import {
  TableCell,
  TableRow,
  Button,
  Collapse,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StatusBadge from "../../components/StatusBadge";
import ProductRow from "./ProductRow";

function OrderRow({ order, updateOrderStatus }) {
  const [expanded, setExpanded] = useState(false);
  const toggleRow = () => setExpanded((prev) => !prev);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Button size="small" onClick={toggleRow}>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </TableCell>

        <TableCell>{order.id}</TableCell>
        <TableCell>{order.paymentId}</TableCell>
        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
        <TableCell>
          <StatusBadge status={order.status} />
        </TableCell>
        <TableCell>${order.totalAmount}</TableCell>
        <TableCell className="cursor-pointer text-blue-600 underline" onClick={toggleRow}>
          {order.products.length} items
        </TableCell>

        <TableCell>
          <div className="flex gap-2">
            <Button
              size="small"
              variant="outlined"
              disabled={order.status !== "pending"}
              onClick={() => updateOrderStatus(order.id, "determined")}
            >
              Determine
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              disabled={order.status !== "pending"}
              onClick={() => updateOrderStatus(order.id, "cancelled")}
            >
              Cancel
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={10} sx={{ p: 0 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="p-3 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Products (Order #{order.id})
                </span>
                <span className="text-xs text-gray-500">{order.products.length} items</span>
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
                    <ProductRow key={p.id} product={p} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderRow;
