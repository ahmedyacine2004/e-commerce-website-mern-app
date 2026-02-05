import { TextField } from "@mui/material";
import Card from "./Card";

export default function Pricing({ product, update, hasVariants }) {
  return (
    <Card title={<span className="text-primary">Pricing</span>}>
      <div className="flex flex-col gap-2">
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={product.price}
          onChange={(e) => update("price", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        />
        <TextField
          label="Compare at price"
          fullWidth
          type="number"
          value={product.comparePrice}
          onChange={(e) => update("comparePrice", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        />
        <TextField
          label="Stock"
          fullWidth
          type="number"
          value={product.stock}
          onChange={(e) => update("stock", e.target.value)}
          InputProps={{
            style: { backgroundColor: "#ffffff" },
            readOnly: hasVariants,
          }}
        />
      </div>
    </Card>
  );
}
