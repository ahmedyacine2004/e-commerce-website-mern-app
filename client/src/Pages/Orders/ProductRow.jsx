import { TableCell, TableRow, Rating } from "@mui/material";

function ProductRow({ product }) {
  return (
    <TableRow hover>
      <TableCell sx={{ py: 0.5 }}>
        <div className="flex items-center gap-2">
          <img
            src={product.img}
            alt={product.name}
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-sm truncate max-w-[180px]">{product.name}</span>
        </div>
      </TableCell>

      <TableCell sx={{ py: 0.5 }}>
        <span className="text-xs text-gray-600">{product.category}</span>
      </TableCell>

      <TableCell sx={{ py: 0.5 }}>
        <span className="text-xs">{product.selectedColor || "—"}</span>
      </TableCell>

      <TableCell sx={{ py: 0.5 }}>
        <span className="text-xs">{product.selectedSize || "—"}</span>
      </TableCell>

      <TableCell sx={{ py: 0.5 }} align="center">
        x{product.qty}
      </TableCell>

      <TableCell sx={{ py: 0.5 }} align="right">
        ${product.newPrice}
      </TableCell>

      <TableCell sx={{ py: 0.5 }} align="center">
        <Rating value={product.rating} precision={0.5} size="small" readOnly />
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
