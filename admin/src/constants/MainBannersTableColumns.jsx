import { useState } from "react";
import TableActions from "../Components/Table/TableActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditMainBannerForm from "../Components/EditMainBannerForm";
import Modal from "../Components/Modal";
import { updateMainBanner, deleteMainBanner } from "../api/mainBanners";
import { notify } from "../utils/ToastUtils";

export const MainBannersTableColumns = ({ fetchBanners }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleDeleteClick = (row) => {
    setModalContent(
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold text-primary">Delete Main Banner</h2>
        <p>Are you sure you want to delete this banner?</p>

        <div className="flex justify-end gap-2">
          <button
            className="py-2 px-4 rounded border border-gray-300 hover:bg-gray-100"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={async () => {
              try {
                await deleteMainBanner(row._id);
                notify("Main banner deleted successfully!", "success");
                fetchBanners();
                setModalOpen(false);
              } catch (err) {
                console.error(err);
                notify("Failed to delete main banner.", "error");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>,
    );

    setModalOpen(true);
  };

  return [
    {
      header: "Image",
      accessor: "imgSrc",
      width: 300,
      render: (src) => (
        <img
          src={src}
          alt="Main Banner"
          className="w-full h-32 object-cover rounded hover:scale-105 transition-transform"
        />
      ),
    },
    { header: "Alt Text", accessor: "alt", width: 300 },
    {
      header: "Actions",
      accessor: "actions",
      width: 150,
      render: (cell, row) => (
        <>
          <TableActions
            actions={[
              {
                type: "icon",
                icon: <EditIcon fontSize="small" />,
                label: "Edit",
                onClick: () => {
                  setModalContent(
                    <EditMainBannerForm
                      slide={row}
                      onSubmit={async (updated) => {
                        await updateMainBanner(row._id, updated);
                        notify("Main banner updated successfully!", "success");
                        fetchBanners();
                        setModalOpen(false);
                      }}
                    />,
                  );
                  setModalOpen(true);
                },
              },
              {
                type: "icon",
                icon: <DeleteIcon fontSize="small" />,
                label: "Delete",
                color: "error.main",
                onClick: () => handleDeleteClick(row),
              },
            ]}
          />

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            content={modalContent}
            maxWidth="md"
            fullWidth
          />
        </>
      ),
    },
  ];
};
