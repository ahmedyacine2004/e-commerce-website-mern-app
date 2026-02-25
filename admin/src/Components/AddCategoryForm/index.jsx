import { useState } from "react";
import { Button } from "@mui/material";

export default function AddCategoryForm({ onSubmit, onClose, defaultValues }) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [icon, setIcon] = useState(defaultValues?.icon || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !icon) {
      alert("Please fill all required fields!");
      return;
    }
    onSubmit({ title, icon });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full p-6">
      <h2 className="text-xl font-bold text-primary">Add Category</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            placeholder="Category title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Icon</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            placeholder="Example: FaTshirt, FaLaptop"
            required
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
