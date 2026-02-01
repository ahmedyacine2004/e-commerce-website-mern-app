import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CheckboxList({ items }) {
  return (
    <div className="scroll py-1 px-2 relative -left-[5px]">
      {items.map((item, i) => (
        <FormControlLabel
          key={i}
          control={<Checkbox size="small" />}
          label={item}
          className="w-full"
        />
      ))}
    </div>
  );
}

export default CheckboxList;
