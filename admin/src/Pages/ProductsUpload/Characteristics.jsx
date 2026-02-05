import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";
import Card from "./Card";

export default function Characteristics({ product, update }) {
  // Start empty on page load
  const [characteristics, setCharacteristics] = useState([]);

  // Add a new empty characteristic
  const addCharacteristic = () => {
    const copy = [...characteristics, { name: "", value: "" }];
    setCharacteristics(copy);
    updateProductDetails(copy);
  };

  // Update a characteristic field
  const updateCharacteristic = (index, key, value) => {
    const copy = [...characteristics];
    copy[index][key] = value;
    setCharacteristics(copy);
    updateProductDetails(copy);
  };

  // Remove a characteristic
  const removeCharacteristic = (index) => {
    const copy = [...characteristics];
    copy.splice(index, 1);
    setCharacteristics(copy);
    updateProductDetails(copy);
  };

  // Convert array back to object for product.additionalInfo.productDetails
  const updateProductDetails = (chars) => {
    const details = {};
    chars.forEach((c) => {
      if (c.name) details[c.name] = c.value; // only include non-empty names
    });
    update("additionalInfo", {
      ...product.additionalInfo,
      productDetails: details,
    });
  };

  return (
    <Card title={<span className="text-primary">Product Details</span>}>
      <Button
        size="small"
        variant="contained"
        startIcon={<FaPlus />}
        onClick={addCharacteristic}
        className="!text-white !bg-primary !py-2 !px-4 !mb-4"
      >
        Add Detail
      </Button>

      <div className="flex flex-col gap-3">
        {characteristics.map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_2fr_40px] gap-3 items-center"
          >
            <TextField
              size="small"
              label="Name"
              value={c.name}
              onChange={(e) => updateCharacteristic(i, "name", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />
            <TextField
              size="small"
              label="Value"
              value={c.value}
              onChange={(e) => updateCharacteristic(i, "value", e.target.value)}
              InputProps={{ style: { backgroundColor: "#ffffff" } }}
            />
            <IconButton
              onClick={() => removeCharacteristic(i)}
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
