import { Menu, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getUniqueOptions } from "../../utils/Table/tableFilters";

export default function FiltersMenu({ menuAnchor, activeColumn, filters, data, updateFilter }) {
  if (!activeColumn) return null;

  return (
    <Menu
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={() => updateFilter(activeColumn.accessor, filters[activeColumn.accessor])}
      PaperProps={{
        sx: {
          minWidth: 170,
          maxHeight: 260,
          "& .MuiMenuItem-root": { fontSize: "0.8rem", py: 0.5 },
        },
      }}
    >
      {activeColumn.filter === "select" &&
        (() => {
          const options = getUniqueOptions(data, activeColumn.accessor);
          return [
            <MenuItem
              key="all"
              selected={filters[activeColumn.accessor] === "all"}
              onClick={() => updateFilter(activeColumn.accessor, "all")}
            >
              All
            </MenuItem>,
            options.length === 0 ? (
              <MenuItem key="none" disabled>No options available</MenuItem>
            ) : (
              options.map(opt => (
                <MenuItem
                  key={opt}
                  selected={filters[activeColumn.accessor] === opt}
                  onClick={() => updateFilter(activeColumn.accessor, opt)}
                >
                  {opt}
                </MenuItem>
              ))
            ),
          ];
        })()}

      {activeColumn.filter === "text" && (
        <TextField
          autoFocus
          size="small"
          placeholder="Search..."
          value={filters[activeColumn.accessor] === "all" ? "" : filters[activeColumn.accessor]}
          onChange={e => updateFilter(activeColumn.accessor, e.target.value || "all", false)}
          sx={{ m: 1 }}
        />
      )}

      {activeColumn.filter === "date" && (
        <DatePicker
          value={filters[activeColumn.accessor] === "all" ? null : new Date(filters[activeColumn.accessor])}
          onChange={val => updateFilter(activeColumn.accessor, val ? val.toISOString() : "all")}
          slotProps={{
            textField: { size: "small", sx: { m: 1, width: 180 } },
          }}
        />
      )}
    </Menu>
  );
}
