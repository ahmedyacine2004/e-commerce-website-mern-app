import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

/**
 * Creates generic row actions
 * param updateFn function(rowId, actionType)
 * param options optional object to hide some buttons
 */
export const createRowActions =
  (updateFn, options = {}) =>
  (row) => (
    <div className="flex gap-2">
      {options.determine !== false && (
        <Button
          size="small"
          variant="outlined"
          disabled={row.status !== "pending"}
          onClick={() => updateFn(row.id, "determined")}
        >
          Determine
        </Button>
      )}
      {options.cancel !== false && (
        <Button
          size="small"
          variant="outlined"
          color="error"
          disabled={row.status !== "pending"}
          onClick={() => updateFn(row.id, "cancelled")}
        >
          Cancel
        </Button>
      )}
    </div>
  );

/**
 * Creates expandable row renderer for products
 * param products array
 */
export const createExpandableProducts = (products) => () => (
  <div className="p-3 bg-gray-50 w-full overflow-x-auto">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold text-gray-700">Products</span>
      <span className="text-xs text-gray-500">{products.length} items</span>
    </div>

    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Color</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-100">
            <td className="py-1">
              <div className="flex items-center gap-2">
                <img src={p.img} alt={p.name} className="w-8 h-8 rounded" />
                <span className="truncate">{p.name}</span>
              </div>
            </td>
            <td>{p.category}</td>
            <td>{p.selectedColor || "—"}</td>
            <td>{p.selectedSize || "—"}</td>
            <td>x{p.qty}</td>
            <td>${p.newPrice}</td>
            <td>
              <Rating value={p.rating} precision={0.5} size="small" readOnly />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
