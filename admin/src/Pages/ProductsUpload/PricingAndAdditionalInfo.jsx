import { TextField, Box } from "@mui/material";
import Card from "./Card";

export default function PricingAndAdditionalInfo({ product, update }) {
  const handlePriceChange = (field, value) => {
    const val = Math.max(0, Number(value) || 0);

    if (field === "price") {
      // Update price and recalc discount
      const discount = Math.max(
        0,
        (product.additionalInfo?.oldPrice || 0) - val,
      );
      update("price", val);
      update("additionalInfo", {
        ...product.additionalInfo,
        discountAmount: discount,
      });
    } else if (field === "comparePrice") {
      // Update comparePrice (old price) and recalc discount
      const discount = Math.max(0, val - (product.price || 0));
      update("additionalInfo", {
        ...product.additionalInfo,
        oldPrice: val,
        discountAmount: discount,
      });
    } else {
      update(field, val);
    }
  };

  const handleAdditionalInfoChange = (field, value) => {
    const val =
      field.includes("Price") || field === "shipPerUnit"
        ? Math.max(0, Number(value) || 0)
        : value;
    update("additionalInfo", {
      ...product.additionalInfo,
      [field]: val,
    });
  };

  return (
    <Card title="Pricing & Additional Info">
      <Box className="flex flex-col gap-2">
        {/* Price */}
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={product.price}
          onChange={(e) => handlePriceChange("price", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
          inputProps={{ min: 0 }}
        />

        {/* Old Price */}
        <TextField
          label="Old Price"
          fullWidth
          type="number"
          value={product.additionalInfo?.oldPrice || 0}
          onChange={(e) => handlePriceChange("comparePrice", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
          inputProps={{ min: 0 }}
        />

        {/* Discount Amount */}
        <TextField
          label="Discount Amount"
          fullWidth
          type="number"
          value={product.additionalInfo?.discountAmount || 0}
          InputProps={{ style: { backgroundColor: "#f0f0f0" }, readOnly: true }}
        />

        {/* Stock */}
        <TextField
          label="Stock"
          fullWidth
          type="number"
          value={product.stock}
          onChange={(e) => handlePriceChange("stock", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
          inputProps={{ min: 0 }}
        />

        {/* Shipping per Unit */}
        <TextField
          label="Shipping per Unit"
          fullWidth
          type="number"
          value={product.additionalInfo?.shipPerUnit || 0}
          onChange={(e) =>
            handleAdditionalInfoChange("shipPerUnit", e.target.value)
          }
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
          inputProps={{ min: 0 }}
        />

        {/* Alt Text */}
        <TextField
          label="Alt Text"
          fullWidth
          value={product.additionalInfo?.alt || ""}
          onChange={(e) => handleAdditionalInfoChange("alt", e.target.value)}
        />

        {/* Description */}
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={product.additionalInfo?.desc || ""}
          onChange={(e) => handleAdditionalInfoChange("desc", e.target.value)}
        />
      </Box>
    </Card>
  );
}
