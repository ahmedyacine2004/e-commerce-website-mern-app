export function exportToCSV({
  data,
  columns,
  fileName = "table-data.csv",
  onlySelectedIds = null,
}) {
  if (!Array.isArray(data) || !data.length) return;

  // Filter rows if selected IDs are provided
  const rows =
    Array.isArray(onlySelectedIds) && onlySelectedIds.length
      ? data.filter((row) => onlySelectedIds.includes(row.id))
      : data;

  if (!rows.length) return;

  // Use only columns that have an accessor
  const validColumns = columns.filter((c) => c.accessor);

  // CSV header
  const header = validColumns.map((c) => `"${c.header ?? c.accessor}"`);

  // CSV rows
  const csvRows = rows.map((row) =>
    validColumns
      .map((c) => {
        let value = row[c.accessor];

        if (c.exportValue) {
          value = c.exportValue(value, row);
        }

        if (Array.isArray(value)) value = value.join(", ");
        if (value === null || value === undefined) value = "";

        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  const csvContent = [header.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
