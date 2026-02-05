import { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
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
      product.colors.filter((col) => col !== c),
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
      product.sizes.filter((sz) => sz !== s),
    );
  };

  return (
    <Card title="Colors & Sizes">
      <Box className="mb-4">
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <InputLabel>Add Color</InputLabel>
          <Select
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            label="Add Color"
          >
            <MenuItem value="">
              <em>Select color</em>
            </MenuItem>
            {colorOptions.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <InputLabel>Add Size</InputLabel>
          <Select
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            label="Add Size"
          >
            <MenuItem value="">
              <em>Select size</em>
            </MenuItem>
            {sizeOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
