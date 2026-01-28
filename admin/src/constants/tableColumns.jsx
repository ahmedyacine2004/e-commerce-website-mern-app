// src/constants/tableColumns.js
import StatusBadge from "../components/StatusBadge";
import { Rating } from "@mui/material";

export const ordersTableColumns = [
  { header: "Order ID", accessor: "id" },
  {
    header: "Customer",
    accessor: "user",
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
  { header: "Payment", accessor: "paymentId" },
  {
    header: "Date",
    accessor: "orderDate",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    header: "Status",
    accessor: "status",
    render: (status) => <StatusBadge status={status} />,
  },
  { header: "Total", accessor: "totalAmount", render: (amt) => `$${amt}` },
  {
    header: "Products",
    accessor: "products",
    render: (products, row) => (
      <span
        className="cursor-pointer text-blue-600 underline"
        onClick={() => row.toggleRow && row.toggleRow(row.id)}
      >
        {products.length} items
      </span>
    ),
  },
];

export const productsTableColumns = [
  {
    header: "Product",
    accessor: "name",
    render: (name, row) => (
      <div className="flex items-center gap-2">
        <img src={row.img} alt={name} className="w-8 h-8 rounded" />
        <span>{name}</span>
      </div>
    ),
  },
  { header: "Category", accessor: "category" },
  {
    header: "Colors",
    accessor: "colors",
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

  { header: "Qty", accessor: "qty", render: (qty) => `x${qty}` },
  { header: "Price", accessor: "newPrice", render: (price) => `$${price}` },
  {
    header: "Rating",
    accessor: "rating",
    render: (rating) => (
      <Rating value={rating} precision={0.5} size="small" readOnly />
    ),
  },
];
