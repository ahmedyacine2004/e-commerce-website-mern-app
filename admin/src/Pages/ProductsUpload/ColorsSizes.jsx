import { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";
import Card from "./Card";

const colorOptions = [
  "black",
  "white",
  "gray",
  "red",
  "blue",
  "green",
  "navy",
  "yellow",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ColorsSizes({ product, update }) {
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const addColor = () => {
    if (colorInput && !product.colors.includes(colorInput)) {
      update("colors", [...product.colors, colorInput]);
      setColorInput("");
    }
  };

  const removeColor = (c) => {
    update(
      "colors",
      product.colors.filter((col) => col !== c)
    );
  };

  const addSize = () => {
    if (sizeInput && !product.sizes.includes(sizeInput)) {
      update("sizes", [...product.sizes, sizeInput]);
      setSizeInput("");
    }
  };

  const removeSize = (s) => {
    update(
      "sizes",
      product.sizes.filter((sz) => sz !== s)
    );
  };

  return (
    <Card title="Colors & Sizes">
      <Box className="mb-4">
        <TextField
          select
          label="Add Color"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          SelectProps={{ native: true }}
          fullWidth
        >
          <option value="">Select color</option>
          {colorOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </TextField>
        <Box className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <Chip key={c} label={c} onDelete={() => removeColor(c)} />
          ))}
        </Box>
        <button
          type="button"
          onClick={addColor}
          className="mt-2 px-3 py-1 bg-primary text-white rounded"
        >
          Add Color
        </button>
      </Box>

      <Box>
        <TextField
          select
          label="Add Size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
          SelectProps={{ native: true }}
          fullWidth
        >
          <option value="">Select size</option>
          {sizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </TextField>
        <Box className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <Chip key={s} label={s} onDelete={() => removeSize(s)} />
          ))}
        </Box>
        <button
          type="button"
          onClick={addSize}
          className="mt-2 px-3 py-1 bg-primary text-white rounded"
        >
          Add Size
        </button>
      </Box>
    </Card>
  );
}
