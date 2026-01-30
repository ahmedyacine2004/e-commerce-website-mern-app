import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function TableHeader({
  columns,
  openFilterMenu,
  renderRowActions,
  isAllOnPageSelected,
  isSomeOnPageSelected,
  toggleAllOnPage,
}) {
  return (
    <TableHead>
      <TableRow>
        {columns.some(c => c.renderExpandable) && <TableCell />}
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={isSomeOnPageSelected}
            checked={isAllOnPageSelected}
            onClick={toggleAllOnPage}
          />
        </TableCell>
        {columns.map(col => (
          <TableCell
            key={col.accessor}
            onClick={(e) => openFilterMenu(e, col)}
            sx={{
              cursor: col.filter ? "pointer" : "default",
              userSelect: "none",
              fontWeight: 500,
              minWidth: col.width || 120,
              whiteSpace: "nowrap",
            }}
          >
            {col.header}{" "}
            {col.filter && (
              <ArrowDropDownIcon
                fontSize="small"
                sx={{ ml: 0.5, verticalAlign: "middle" }}
              />
            )}
          </TableCell>
        ))}
        {renderRowActions && <TableCell />}
      </TableRow>
    </TableHead>
  );
}
