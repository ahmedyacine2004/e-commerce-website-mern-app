import { Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBox({ value, onChange }) {
  return (
    <div className="w-full">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <FaMagnifyingGlass className="text-[rgba(0,0,0,0.5)]" />
          </InputAdornment>
        }
        type="text"
        placeholder="Search..."
        className="w-full border border-[rgba(0,0,0,0.2)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBox;
