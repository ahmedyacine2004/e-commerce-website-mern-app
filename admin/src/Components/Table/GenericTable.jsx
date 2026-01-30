import { useMemo, useState } from "react";
import { Table, TableContainer, Paper, TablePagination, Toolbar, Button, Typography, Checkbox } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableHeader from "./TableHeader";
import TableBodyRows from "./TableBodyRows";
import CategoryMenu from "./CategoryMenu";
import FiltersMenu from "./FiltersMenu";

export default function GenericTable({
  columns,
  data,
  renderExpandable,
  renderRowActions,
  selectionActions,
  categoryColumns,
}) {
  // ===== State =====
  const [filters, setFilters] = useState(() =>
    Object.fromEntries(columns.filter(c => c.filter).map(c => [c.accessor, "all"]))
  );
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [categoryColumn, setCategoryColumn] = useState(null);

  // ===== Handlers =====
  const openFilterMenu = (e, col) => col.filter && (setMenuAnchor(e.currentTarget), setActiveColumn(col));
  const closeMenu = () => (setMenuAnchor(null), setActiveColumn(null));
  const openCategoryMenu = e => setCategoryAnchor(e.currentTarget);
  const closeCategoryMenu = () => setCategoryAnchor(null);
  const selectCategoryColumn = col => { setCategoryColumn(col); setPage(0); closeCategoryMenu(); };
  const updateFilter = (accessor, value, shouldClose = true) => { setFilters(prev => ({ ...prev, [accessor]: value })); setPage(0); shouldClose && closeMenu(); };
  const toggleRow = id => setExpandedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleRowSelection = id => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  
  // ===== Derived data =====
  const filteredData = useMemo(() => {
    return data.filter(row => 
      columns.every(col => {
        if (!col.filter) return true;
        const filterValue = filters[col.accessor];
        if (filterValue === "all" || filterValue == null) return true;
        let cellValue = col.filterValue ? col.filterValue(row[col.accessor], row) : row[col.accessor];
        if (col.filter === "date") return cellValue && new Date(cellValue).toDateString() === new Date(filterValue).toDateString();
        if (Array.isArray(cellValue)) return cellValue.map(String).includes(String(filterValue));
        return String(cellValue ?? "").toLowerCase().includes(String(filterValue).toLowerCase());
      })
    );
  }, [data, columns, filters]);

  const groupedData = useMemo(() => {
    if (!categoryColumn) return { All: filteredData };
    return filteredData.reduce((acc, row) => {
      const key = row[categoryColumn.accessor] ?? "Undefined";
      acc[key] = acc[key] || [];
      acc[key].push(row);
      return acc;
    }, {});
  }, [filteredData, categoryColumn]);

  const flattenedRows = useMemo(() => Object.values(groupedData).flat(), [groupedData]);
  const paginatedRows = useMemo(() => flattenedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [flattenedRows, page, rowsPerPage]);
  const groupedPaginatedData = useMemo(() => {
    // eslint-disable-next-line no-unused-vars
    return Object.fromEntries(Object.entries(groupedData).map(([k, rows]) => [k, rows.filter(r => paginatedRows.includes(r))]).filter(([_, rows]) => rows.length));
  }, [groupedData, paginatedRows]);

  const toggleAllOnPage = () => {
    const pageIds = paginatedRows.map(r => r.id);
    const someSelected = pageIds.some(id => selected.includes(id));
    const allSelected = pageIds.every(id => selected.includes(id));
    if (allSelected || someSelected) setSelected(prev => prev.filter(id => !pageIds.includes(id)));
    else setSelected(prev => [...new Set([...prev, ...pageIds])]);
  };

  const isAllOnPageSelected = paginatedRows.every(r => selected.includes(r.id));
  const isSomeOnPageSelected = paginatedRows.some(r => selected.includes(r.id)) && !isAllOnPageSelected;

  // ===== Render =====
  return (
    <TableContainer component={Paper}>
      <Toolbar sx={{ justifyContent: "flex-start", gap: 2, flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={openCategoryMenu} endIcon={<ArrowDropDownIcon />}>
          Category By: {categoryColumn?.header ?? "None"}
        </Button>
        <CategoryMenu 
          categoryAnchor={categoryAnchor} 
          closeCategoryMenu={closeCategoryMenu} 
          selectCategoryColumn={selectCategoryColumn} 
          categoryColumn={categoryColumn} 
          categoryColumns={categoryColumns ?? columns.filter(c => c.accessor !== "id")} 
        />
      </Toolbar>

      {selected.length > 0 && selectionActions && (
        <Toolbar sx={{ bgcolor: "action.hover", justifyContent: "space-between" }}>
          <Typography variant="subtitle1">{selected.length} selected</Typography>
          <div>
            {selectionActions.map(action => (
              <Button key={action.label} size="small" variant="contained" sx={{ ml: 1 }} onClick={() => action.onClick(selected)}>
                {action.label}
              </Button>
            ))}
          </div>
        </Toolbar>
      )}

      <Table>
        <TableHeader 
          columns={columns} 
          openFilterMenu={openFilterMenu} 
          renderRowActions={renderRowActions} 
          isAllOnPageSelected={isAllOnPageSelected} 
          isSomeOnPageSelected={isSomeOnPageSelected} 
          toggleAllOnPage={toggleAllOnPage} 
        />

        <TableBodyRows 
          groupedPaginatedData={groupedPaginatedData} 
          columns={columns} 
          expandedRows={expandedRows} 
          toggleRow={toggleRow} 
          selected={selected} 
          toggleRowSelection={toggleRowSelection} 
          renderExpandable={renderExpandable} 
          renderRowActions={renderRowActions} 
          categoryColumn={categoryColumn} 
        />
      </Table>

      <FiltersMenu 
        menuAnchor={menuAnchor} 
        activeColumn={activeColumn} 
        filters={filters} 
        data={data} 
        updateFilter={updateFilter} 
      />

      <TablePagination
        component="div"
        count={flattenedRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
      />
    </TableContainer>
  );
}
