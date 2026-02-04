import { TextField, Button, IconButton } from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";
import Card from "./Card";

export default function Variants({
  product,
  updateVariant,
  addVariant,
  removeVariant,
}) {
  return (
    <Card title={<span className="text-primary">Variants</span>}>
      <Button
        size="small"
        variant="contained"
        startIcon={<FaPlus />}
        onClick={addVariant}
        className="!text-white !bg-primary !py-2 !px-4 !mb-4"
      >
        Add Variant
      </Button>

      <div className="flex flex-col gap-3">
        {product.variants.map((v, i) => (
          <div
            key={i}
            className="grid grid-cols-[3fr_1fr_1fr_1fr_40px] gap-3 items-center"
          >
            <TextField
              size="small"
              label="Variant Name"
              value={v.title}
              onChange={(e) => updateVariant(i, "title", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />

            <TextField
              size="small"
              label="Price"
              type="number"
              value={v.price}
              onChange={(e) => updateVariant(i, "price", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />

            <TextField
              size="small"
              label="Stock"
              type="number"
              value={v.stock}
              onChange={(e) => updateVariant(i, "stock", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />

            <TextField
              size="small"
              label="SKU"
              value={v.sku}
              onChange={(e) => updateVariant(i, "sku", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />

            <IconButton
              onClick={() => removeVariant(i)}
              className="!bg-red-100 !text-red-600 w-[35px] h-[35px]"
            >
              <FaTrash size={14} />
            </IconButton>
          </div>
        ))}
      </div>
    </Card>
  );
}
