import { TextField, MenuItem } from "@mui/material";
import Card from "./Card";

const categories = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Books" },
  { id: 4, name: "Home & Kitchen" },
];

const subcategories = [
  { id: 1, name: "Shirts" },
  { id: 2, name: "Pants" },
  { id: 3, name: "Laptops" },
  { id: 4, name: "Cookware" },
];

const brands = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Samsung" },
  { id: 4, name: "Sony" },
];

export default function BasicInfo({ product, update }) {
  // Handle SKU input
  const handleSKUChange = (e) => {
    let value = e.target.value;

    // Remove the prefix if user types over it
    value = value.replace(/^SKU-*/, "");

    // Keep only numbers
    value = value.replace(/\D/g, "");

    // Re-add the prefix
    update("sku", "SKU-" + value);
  };

  return (
    <Card title={<span className="text-primary">Basic Information</span>}>
      <TextField
        label="Product name"
        fullWidth
        value={product.name}
        onChange={(e) => update("name", e.target.value)}
        InputProps={{ style: { backgroundColor: "#ffffff" } }}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextField
          label="SKU"
          value={product.sku || "SKU-"}
          onChange={handleSKUChange}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        />
        <TextField
          select
          label="Category"
          value={product.category}
          onChange={(e) => update("category", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextField
          select
          label="Brand"
          value={product.brand || ""}
          onChange={(e) => update("brand", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        >
          {brands.map((b) => (
            <MenuItem key={b.id} value={b.name}>
              {b.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Subcategory"
          value={product.subcategory || ""}
          onChange={(e) => update("subcategory", e.target.value)}
          InputProps={{ style: { backgroundColor: "#ffffff" } }}
        >
          {subcategories.map((sc) => (
            <MenuItem key={sc.id} value={sc.name}>
              {sc.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Card>
  );
}
