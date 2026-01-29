import StatusBadge from "../components/StatusBadge";
import { Rating } from "@mui/material";

/* ===================== ORDERS TABLE ===================== */

export const ordersTableColumns = [
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
        <span>{name}</span>
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
    accessor: "qty",
    width: 90,
    render: (qty) => `x${qty}`,
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
];
