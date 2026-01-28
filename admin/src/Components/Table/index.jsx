import { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 * GenericTable Props:
 * - columns: [{ header, accessor, render? }]
 * - data: array of objects
 * - renderRowActions?: (row) => JSX
 * - renderExpandable?: (row, toggleRow) => JSX
 */
export default function GenericTable({
  columns,
  data,
  renderRowActions,
  renderExpandable,
}) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) =>
    setExpandedRowId((prev) => (prev === id ? null : id));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1400 }}>
        <TableHead>
          <TableRow>
            {renderExpandable && <TableCell />}
            {columns.map((col, i) => (
              <TableCell key={i}>{col.header}</TableCell>
            ))}
            {renderRowActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <Fragment key={row.id}>
              <TableRow hover>
                {renderExpandable && (
                  <TableCell>
                    <Button size="small" onClick={() => toggleRow(row.id)}>
                      {expandedRowId === row.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Button>
                  </TableCell>
                )}

                {columns.map((col, i) => (
                  <TableCell key={i}>
                    {col.render
                      ? col.render(row[col.accessor], { ...row, toggleRow })
                      : row[col.accessor]}
                  </TableCell>
                ))}

                {renderRowActions && (
                  <TableCell>{renderRowActions(row, toggleRow)}</TableCell>
                )}
              </TableRow>

              {renderExpandable && expandedRowId === row.id && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    sx={{
                      p: 0,
                      borderBottom: "none",
                      width: "100%",
                    }}
                  >
                    <Collapse
                      in={expandedRowId === row.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div style={{ width: "100%", display: "block" }}>
                        {renderExpandable(row, toggleRow)}
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
