import { TextField, Chip } from "@mui/material";
import Card from "./Card";

export default function Tags({ product, tagInput, setTagInput, update, addTag }) {
  return (
    <Card title={<span className="text-primary">Tags</span>}>
      <TextField
        placeholder="Press Enter to add tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={addTag}
        fullWidth
        InputProps={{ style: { backgroundColor: "#ffffff" } }}
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        {product.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            onDelete={() =>
              update(
                "tags",
                product.tags.filter((_, x) => x !== i)
              )
            }
          />
        ))}
      </div>
    </Card>
  );
}
