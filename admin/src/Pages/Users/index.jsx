// Users/index.jsx
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import GenericTable from "../../Components/Table/GenericTable";
import { useClients } from "../../hooks/useClients";
import clientTableColumns from "../../constants/clientTableColumns";
import socket from "../../utils/socket";

export default function Users() {
  const { clients, loading, refetch } = useClients();
  const [tableData, setTableData] = useState([]);

  // Set initial table data
  useEffect(() => {
    if (Array.isArray(clients)) {
      setTableData(clients);
    } else {
      setTableData([]);
    }
  }, [clients]);

  // Real-time updates from socket
  useEffect(() => {
    socket.on("update-client-status", ({ clientId, status, ipAddress }) => {
      setTableData((prev) =>
        prev.map((c) => (c._id === clientId ? { ...c, status, ipAddress } : c)),
      );
    });

    return () => {
      socket.off("update-client-status");
    };
  }, []);

  return (
    <div className="min-h-[84vh] p-6 border bg-white border-[rgba(0,0,0,0.1)] rounded-lg">
      <h1 className="text-2xl font-bold text-primary mb-4">Users</h1>
      <GenericTable
        columns={clientTableColumns(refetch)}
        data={tableData}
        categoryColumns={[]}
        selectionActions={[
          {
            label: "Block IPs",
            onClick: async (selectedIds) => {
              await Promise.all(
                selectedIds.map(async (id) => {
                  await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/clients/block-ip/${id}`,
                    { method: "PUT" },
                  );
                }),
              );
              refetch();
            },
          },
        ]}
        isLoading={loading}
      />
    </div>
  );
}
