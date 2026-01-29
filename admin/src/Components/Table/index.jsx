import { Fragment, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  TextField,
  TablePagination,
  Checkbox,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isSameDay } from "date-fns";
import { getUniqueOptions } from "../../utils/Table/tableFilters";

export default function GenericTable({
  columns,
  data,
  renderExpandable,
  renderRowActions,
  selectionActions,
}) {
  const [filters, setFilters] = useState(() =>
    Object.fromEntries(
      columns.filter((c) => c.filter).map((c) => [c.accessor, "all"]),
    ),
  );
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const openFilterMenu = (e, col) => {
    if (!col.filter) return;
    setMenuAnchor(e.currentTarget);
    setActiveColumn(col);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setActiveColumn(null);
  };

  const updateFilter = (accessor, value, shouldClose = true) => {
    setFilters((prev) => ({ ...prev, [accessor]: value }));
    setPage(0);
    if (shouldClose) closeMenu();
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (!col.filter) return true;
        const filterValue = filters[col.accessor];
        if (filterValue === "all" || filterValue == null) return true;

        let cellValue = row[col.accessor];
        if (col.filterValue) cellValue = col.filterValue(cellValue, row);

        if (col.filter === "date")
          return (
            cellValue && isSameDay(new Date(cellValue), new Date(filterValue))
          );
        if (Array.isArray(cellValue))
          return cellValue.map(String).includes(String(filterValue));
        return String(cellValue ?? "")
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      }),
    );
  }, [data, columns, filters]);

  const paginated = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  const isSelected = (id) => selected.includes(id);

  const toggleRowSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAllOnPage = () => {
    const pageIds = paginated.map((row) => row.id);
    const someSelected = pageIds.some((id) => selected.includes(id));
    const allSelected = pageIds.every((id) => selected.includes(id));

    if (allSelected) {
      // All on page are selected → deselect all on page
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else if (someSelected) {
      // Some on page are selected (indeterminate state) → deselect all on page
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      // None on page are selected → select all on page
      setSelected((prev) => {
        const newSelected = new Set(prev);
        pageIds.forEach((id) => newSelected.add(id));
        return Array.from(newSelected);
      });
    }
  };

  const isAllOnPageSelected = paginated.every((row) =>
    selected.includes(row.id),
  );
  const isSomeOnPageSelected =
    paginated.some((row) => selected.includes(row.id)) && !isAllOnPageSelected;

  return (
    <TableContainer component={Paper}>
      {selected.length > 0 && selectionActions && (
        <Toolbar
          sx={{ bgcolor: "action.hover", justifyContent: "space-between" }}
        >
          <Typography variant="subtitle1">
            {selected.length} selected
          </Typography>
          <div>
            {selectionActions.map((action) => (
              <Button
                key={action.label}
                size="small"
                variant="contained"
                sx={{ ml: 1 }}
                onClick={() => action.onClick(selected)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Toolbar>
      )}

      <Table>
        <TableHead>
          <TableRow>
            {renderExpandable && <TableCell />}
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={isSomeOnPageSelected}
                checked={isAllOnPageSelected}
                onClick={toggleAllOnPage}
              />
            </TableCell>
            {columns.map((col) => (
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
                {col.header}
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

        <TableBody>
          {paginated.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 3}
                align="center"
                sx={{ py: 4, color: "text.secondary" }}
              >
                No results found
              </TableCell>
            </TableRow>
          )}

          {paginated.map((row) => (
            <Fragment key={row.id}>
              <TableRow hover>
                {renderExpandable && <TableCell />}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.accessor}>
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : row[col.accessor]}
                  </TableCell>
                ))}
                {renderRowActions && (
                  <TableCell>{renderRowActions(row)}</TableCell>
                )}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            minWidth: 170,
            maxHeight: 260,
            "& .MuiMenuItem-root": { fontSize: "0.8rem", py: 0.5 },
          },
        }}
      >
        {activeColumn?.filter === "select" &&
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
                <MenuItem key="none" disabled>
                  No options available
                </MenuItem>
              ) : (
                options.map((opt) => (
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

        {activeColumn?.filter === "text" && (
          <TextField
            autoFocus
            size="small"
            placeholder="Search..."
            value={
              filters[activeColumn.accessor] === "all"
                ? ""
                : filters[activeColumn.accessor]
            }
            onChange={(e) =>
              updateFilter(
                activeColumn.accessor,
                e.target.value || "all",
                false,
              )
            }
            sx={{ m: 1 }}
          />
        )}

        {activeColumn?.filter === "date" && (
          <DatePicker
            value={
              filters[activeColumn.accessor] === "all"
                ? null
                : new Date(filters[activeColumn.accessor])
            }
            onChange={(val) =>
              updateFilter(
                activeColumn.accessor,
                val ? val.toISOString() : "all",
              )
            }
            slotProps={{
              textField: { size: "small", sx: { m: 1, width: 180 } },
            }}
          />
        )}
      </Menu>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </TableContainer>
  );
}
