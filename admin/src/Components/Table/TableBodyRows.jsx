import { Fragment } from "react";
import { TableBody, TableRow, TableCell, Button, Checkbox } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function TableBodyRows({
  groupedPaginatedData,
  columns,
  expandedRows,
  toggleRow,
  selected,
  toggleRowSelection,
  renderExpandable,
  renderRowActions,
  categoryColumn,
}) {
  const isSelected = (id) => selected.includes(id);

  return (
    <TableBody>
      {Object.keys(groupedPaginatedData).length === 0 && (
        <TableRow>
          <TableCell colSpan={columns.length + 3} align="center" sx={{ py: 4, color: "text.secondary" }}>
            No results found
          </TableCell>
        </TableRow>
      )}

      {Object.entries(groupedPaginatedData).map(([groupName, rows]) => (
        <Fragment key={groupName}>
          {categoryColumn && (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell colSpan={columns.length + 3} sx={{ fontWeight: 600 }}>
                {groupName}
              </TableCell>
            </TableRow>
          )}

          {rows.map(row => {
            const rowWithToggle = {
              ...row,
              isExpanded: expandedRows.includes(row.id),
              toggleRow,
            };
            return (
              <Fragment key={row.id}>
                <TableRow hover>
                  {columns.some(c => c.renderExpandable) && (
                    <TableCell>
                      <Button size="small" onClick={() => rowWithToggle.toggleRow(row.id)} sx={{ minWidth: 0, padding: "4px" }}>
                        {rowWithToggle.isExpanded ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </TableCell>
                  )}

                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected(row.id)} onChange={() => toggleRowSelection(row.id)} />
                  </TableCell>

                  {columns.map(col => (
                    <TableCell key={col.accessor}>
                      {col.render ? col.render(row[col.accessor], rowWithToggle) : row[col.accessor]}
                    </TableCell>
                  ))}

                  {renderRowActions && <TableCell>{renderRowActions(rowWithToggle)}</TableCell>}
                </TableRow>

                {rowWithToggle.isExpanded && renderExpandable && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2}>{renderExpandable(rowWithToggle)}</TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </TableBody>
  );
}
