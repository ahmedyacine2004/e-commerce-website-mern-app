import StatusBadge from "../components/StatusBadge";
import { Rating } from "@mui/material";
import { LinearProgress } from "@mui/material";
import TableActions from "../Components/Table/TableActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createRowActions } from "../utils/Table/tableUtils";

/* ===================== RECENT ORDERS TABLE ===================== */

export const ordersTableColumns = (updateOrderStatus) => [
  {
    header: "Order ID",
    accessor: "id",
    width: 120,
  },
  {
    header: "Customer",
    accessor: "user",
    filter: "text",
    width: 260,
    filterValue: (user) => `${user.fullName} ${user.email}`,
    render: (user) => (
      <div className="flex items-center gap-2">
        <img
          src={user.pfp}
          alt={user.fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col text-xs">
          <span className="font-medium">{user.fullName}</span>
          <span className="text-gray-500">{user.email}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Payment",
    accessor: "paymentId",
    filter: "text",
    width: 180,
  },
  {
    header: "Date",
    accessor: "orderDate",
    filter: "date",
    width: 140,
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    header: "Status",
    accessor: "status",
    filter: "select",
    width: 130,
    render: (status) => <StatusBadge status={status} />,
  },
  {
    header: "Total",
    accessor: "totalAmount",
    width: 120,
    render: (amt) => `$${amt}`,
  },
  {
    header: "Products",
    accessor: "products",
    width: 140,
    render: (products, row) => (
      <span
        className="cursor-pointer text-blue-600 underline"
        onClick={() => row.toggleRow && row.toggleRow(row.id)}
      >
        {products.length} items
      </span>
    ),
  },
  // ✅ New Actions Column
  {
    header: "Actions",
    accessor: "actions",
    width: 200,
    render: (_, row) => {
      const actions = createRowActions(updateOrderStatus)(row);
      return <TableActions actions={actions} />;
    },
  },
];

/* ===================== PRODUCTS TABLE ===================== */

export const productsTableColumns = [
  {
    header: "Product",
    accessor: "name",
    filter: "text",
    width: 220,
    render: (name, row) => (
      <div className="flex items-center gap-2">
        <img src={row.img} alt={name} className="w-8 h-8 rounded" />
        <span className="link font-[500] cursor-pointer">{name}</span>
      </div>
    ),
  },

  {
    header: "Category",
    accessor: "category",
    filter: "select",
    width: 160,
  },

  {
    header: "Subcategory",
    accessor: "subcategory",
    filter: "select",
    width: 160,
    render: (value) => value || "_",
  },

  {
    header: "Colors",
    accessor: "colors",
    filter: "select",
    width: 200,
    render: (colors) =>
      colors && colors.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {colors.map((c, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-full text-xs border">
              {c}
            </span>
          ))}
        </div>
      ) : (
        "—"
      ),
  },

  {
    header: "Sizes",
    accessor: "sizes",
    filter: "select",
    width: 180,
    render: (sizes) =>
      sizes && sizes.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {sizes.map((s, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full text-xs border bg-gray-100"
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        "—"
      ),
  },
  {
    header: "Qty",
    accessor: "stock",
    width: 120,
    render: (qty) => {
      const maxQty = 100;
      const percentage = Math.min((qty / maxQty) * 100, 100);

      let barColor;
      if (percentage <= 20) barColor = "error.main";
      else if (percentage <= 50) barColor = "warning.main";
      else if (percentage <= 70) barColor = "info.main";
      else barColor = "success.main";

      return (
        <div className="flex flex-col gap-1">
          <span className="text-xs">{`x${qty}`}</span>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 2,
              "& .MuiLinearProgress-bar": { bgcolor: barColor },
            }}
          />
        </div>
      );
    },
  },
  {
    header: "Sales",
    accessor: "sales",
    width: 140,
    render: (sales) => {
      const maxSales = 250; // adjust based on your max sales range
      const percentage = Math.min((sales / maxSales) * 100, 100);

      // dynamic color logic
      let barColor;
      if (percentage <= 20)
        barColor = "error.main"; // red
      else if (percentage <= 50)
        barColor = "warning.main"; // orange
      else if (percentage <= 70)
        barColor = "info.main"; // yellow-ish
      else barColor = "success.main"; // green

      return (
        <div className="flex flex-col gap-1">
          <span className="text-xs">{sales}</span>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 2,
              "& .MuiLinearProgress-bar": { bgcolor: barColor },
            }}
          />
        </div>
      );
    },
  },
  {
    header: "Price",
    accessor: "newPrice",
    width: 120,
    render: (price) => `$${price}`,
  },

  {
    header: "Rating",
    accessor: "rating",
    filter: "select",
    width: 150,
    render: (rating) => (
      <Rating value={rating} precision={0.5} size="small" readOnly />
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    width: 150,
    render: (
      cell,
      row, // row here is the full row object
    ) => (
      <TableActions
        actions={[
          {
            type: "icon",
            icon: <VisibilityIcon fontSize="small" />,
            label: "View",
            onClick: () => alert(`View ${row.name}`),
          },
          {
            type: "icon",
            icon: <EditIcon fontSize="small" />,
            label: "Edit",
            onClick: () => alert(`Edit ${row.name}`),
          },
          {
            type: "icon",
            icon: <DeleteIcon fontSize="small" />,
            label: "Delete",
            color: "error.main",
            onClick: () => alert(`Delete ${row.name}`),
          },
        ]}
      />
    ),
  },
];
