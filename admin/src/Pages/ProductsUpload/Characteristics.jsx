import { TextField, Button, IconButton } from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";
import Card from "./Card";

export default function Characteristics({ product, update }) {
  const addCharacteristic = () => {
    update("characteristics", [
      ...(product.characteristics || []),
      { name: "", value: "", description: "" },
    ]);
  };

  const updateCharacteristic = (index, key, value) => {
    const copy = [...(product.characteristics || [])];
    copy[index][key] = value;
    update("characteristics", copy);
  };

  const removeCharacteristic = (index) => {
    const copy = [...(product.characteristics || [])];
    copy.splice(index, 1);
    update("characteristics", copy);
  };

  return (
    <Card title={<span className="text-primary">Characteristics</span>}>
      <Button
        size="small"
        variant="contained"
        startIcon={<FaPlus />}
        onClick={addCharacteristic}
        className="!text-white !bg-primary !py-2 !px-4 !mb-4"
      >
        Add Characteristic
      </Button>

      <div className="flex flex-col gap-3">
        {(product.characteristics || []).map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_2fr_3fr_40px] gap-3 items-center"
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
            <TextField
              size="small"
              label="Description"
              value={c.description}
              onChange={(e) =>
                updateCharacteristic(i, "description", e.target.value)
              }
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
