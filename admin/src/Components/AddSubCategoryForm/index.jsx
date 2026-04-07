import { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function AddSubCategoryForm({
  categories,
  onSubmit,
  onClose,
  defaultValues,
}) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  // With this:
  const [categoryId, setCategoryId] = useState(defaultValues?.category?._id);
  const [inner, setInner] = useState(defaultValues?.inner?.join(", ") || ""); // optional

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !categoryId) {
      alert("Please fill all required fields!");
      return;
    }
    // split comma-separated string into array, trim spaces
    const innerArray = inner
      ? inner
          .split(",")
          .map((val) => val.trim())
          .filter((val) => val.length > 0)
      : [];

    onSubmit({ title, categoryId, inner: innerArray });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full p-6">
      <h2 className="text-xl font-bold text-primary">Add Subcategory</h2>

      <div className="flex flex-col gap-4">
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories?.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Subcategory Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            placeholder="Subcategory title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Optional Inner Values (comma separated)
          </label>
          <input
            type="text"
            value={inner}
            onChange={(e) => setInner(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            placeholder="e.g., Red, Blue, Green"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" className="!bg-primary">
          Save
        </Button>
      </div>
    </form>
  );
}
