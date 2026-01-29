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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isSameDay } from "date-fns";
import { getUniqueOptions } from "../../utils/tableFilters";

export default function GenericTable({
  columns,
  data,
  renderExpandable,
  renderRowActions,
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

    if (shouldClose) {
      closeMenu();
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (!col.filter) return true;

        const filterValue = filters[col.accessor];
        if (filterValue === "all" || filterValue == null) return true;

        let cellValue = row[col.accessor];

        if (col.filterValue) {
          cellValue = col.filterValue(cellValue, row);
        }

        // DATE FILTER
        if (col.filter === "date") {
          if (!cellValue) return false;
          return isSameDay(new Date(cellValue), new Date(filterValue));
        }

        // ARRAY FILTER
        if (Array.isArray(cellValue)) {
          return cellValue.map(String).includes(String(filterValue));
        }

        // TEXT / SELECT
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {renderExpandable && <TableCell />}
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
                colSpan={columns.length + 2}
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

      {/* FILTER MENU */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            minWidth: 170,
            maxHeight: 260,
            "& .MuiMenuItem-root": {
              fontSize: "0.8rem",
              py: 0.5,
            },
          },
        }}
      >
        {/* SELECT FILTER */}
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

        {/* TEXT FILTER */}
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
                false, // 👈 DO NOT close menu while typing
              )
            }
            sx={{ m: 1 }}
          />
        )}

        {/* DATE FILTER */}
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
              textField: {
                size: "small",
                sx: { m: 1, width: 180 },
              },
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
