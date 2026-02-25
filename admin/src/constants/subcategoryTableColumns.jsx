import TableActions from "../Components/Table/TableActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const subcategoryTableColumns = (onEdit, onDelete) => [
  {
    header: "Title",
    accessor: "title",
    filter: "text",
    width: 200,
  },
  {
    header: "Inner Items",
    accessor: "inner",
    width: 250,
    render: (inner) =>
      inner?.length ? inner.join(", ") : "_",
  },
  {
    header: "Actions",
    accessor: "actions",
    width: 150,
    render: (_, row) => (
      <TableActions
        actions={[
          {
            type: "icon",
            icon: <EditIcon fontSize="small" />,
            label: "Edit",
            onClick: () => onEdit(row),
          },
          {
            type: "icon",
            icon: <DeleteIcon fontSize="small" />,
            label: "Delete",
            color: "error.main",
            onClick: () => onDelete(row._id),
          },
        ]}
      />
    ),
  },
];
