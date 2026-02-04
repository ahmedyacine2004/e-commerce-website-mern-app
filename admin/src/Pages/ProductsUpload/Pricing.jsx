import { TextField } from "@mui/material";
import Card from "./Card";

export default function Pricing({ product, update, hasVariants }) {
  return (
    <Card title={<span className="text-primary">Pricing</span>}>
      <div className="flex flex-col gap-2">
        <TextField
          label="Price"
          fullWidth
          value={product.price}
          onChange={(e) => update("price", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        />
        <TextField
          label="Compare at price"
          fullWidth
          value={product.comparePrice}
          onChange={(e) => update("comparePrice", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        />
        <TextField
          label="Stock"
          fullWidth
          value={product.stock}
          onChange={(e) => update("stock", e.target.value)}
          InputProps={{
            style: { backgroundColor: "#ffffff" },
            readOnly: hasVariants, // read-only if variants exist
          }}
        />
      </div>
    </Card>
  );
}
