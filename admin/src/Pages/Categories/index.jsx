import { useState } from "react";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import GenericTable from "../../Components/Table";
import Modal from "../../Components/Modal";
import AddCategoryForm from "../../Components/AddCategoryForm";
import { useCategories } from "../../hooks/useCategories";
import { categoryTableColumns } from "../../constants/categoryTableColumns";

export default function Categories() {
  const { categories, loading, createCategory, deleteCategory, refetch } =
    useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAddCategory = () => {
    setModalContent(
      <AddCategoryForm
        onSubmit={async (data) => {
          await createCategory(data);
          refetch();
          setModalOpen(false);
        }}
        onClose={() => setModalOpen(false)}
      />,
    );
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    refetch();
  };

  const columns = categoryTableColumns(null, handleDelete);

  return (
    <div className="min-h-screen p-6 border bg-white border-[rgba(0,0,0,0.1)] rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Categories</h1>
        <Button
          startIcon={<FaPlus />}
          variant="contained"
          className="!bg-primary"
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>

      <GenericTable
        columns={columns}
        data={categories || []}
        categoryColumns={columns.filter(
          (c) => c.accessor !== "actions" && ["title"].includes(c.accessor),
        )}
        selectionActions={[
          {
            label: "Delete",
            onClick: async (selectedIds) => {
              await Promise.all(selectedIds.map((id) => deleteCategory(id)));
              refetch();
            },
          },
        ]}
        search=""
        serachMetric={["title"]}
        isLoading={loading}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
}
