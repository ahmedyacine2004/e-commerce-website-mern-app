import { useState, useEffect } from "react";
import GenericTable from "../../Components/Table";
import { subcategoryTableColumns } from "../../constants/subcategoryTableColumns";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../Components/Modal";
import AddSubCategoryForm from "../../Components/AddSubCategoryForm";

export default function SubCategories() {
  const {
    subcategories,
    deleteSubCategory,
    refetch: refetchSub,
  } = useSubCategories();
  const {
    categories = [],
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // refetch categories on page load and every time modal closes
  useEffect(() => {
    refetchCategories();
  }, [modalOpen]);

  const handleAddClick = () => {
    setModalContent(
      <AddSubCategoryForm
        categories={categories} // pass categories to modal so dropdown works there
        onSubmit={async (newSub) => {
          await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/subcategories`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newSub),
            },
          );
          refetchSub();
          setModalOpen(false);
        }}
        onClose={() => setModalOpen(false)}
      />,
    );
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteSubCategory(id);
      refetchSub();
    }
  };

  const columns = subcategoryTableColumns(null, handleDelete);

  // filter subcategories by selected category
  const filteredSubcategories = selectedCategory
    ? subcategories.filter(
        (sub) => String(sub.category?._id) === String(selectedCategory),
      )
    : subcategories || [];

  return (
    <div className="min-h-screen p-6 border bg-white border-[rgba(0,0,0,0.1)] rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Subcategories</h1>
        <Button
          startIcon={<FaPlus />}
          variant="contained"
          className="!bg-primary"
          onClick={handleAddClick}
        >
          Add Subcategory
        </Button>
      </div>

      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={categoriesLoading}
        >
          <option value="">All Categories</option>
          {(categories || []).map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <GenericTable
        columns={columns}
        data={filteredSubcategories}
        categoryColumns={columns.filter(
          (c) => c.accessor !== "actions" && ["title"].includes(c.accessor),
        )}
        selectionActions={[
          {
            label: "Delete",
            onClick: async (selectedIds) => {
              await Promise.all(selectedIds.map((id) => deleteSubCategory(id)));
              refetchSub();
            },
          },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        fullWidth
        maxWidth="sm"
      />
    </div>
  );
}
