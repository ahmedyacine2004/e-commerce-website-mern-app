// clientTableColumns.jsx
import TableActions from "../Components/Table/TableActions";
import BlockIcon from "@mui/icons-material/Block";
import StatusBadge from "../Components/StatusBadge";

export default function clientTableColumns(refetch) {
  const handleBlockIp = async (id) => {
    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/clients/block-ip/${id}`,
      { method: "PUT" },
    );
    if (refetch) refetch();
  };

  return [
    { header: "Full Name", accessor: "fullName", width: 200 },
    { header: "Email", accessor: "email", width: 200 },
    { header: "Phone", accessor: "phone", width: 150 },
    { header: "Gender", accessor: "gender", width: 100 },
    { header: "IP Address", accessor: "ipAddress", width: 150 }, // real-time IP
    {
      header: "Status",
      accessor: "status",
      width: 120,
      render: (status) => <StatusBadge status={status}  />, // online/offline badge
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
              icon: <BlockIcon fontSize="small" />,
              label: "Block IP",
              color: "error.main",
              onClick: () => handleBlockIp(row._id),
            },
          ]}
        />
      ),
    },
  ];
}
