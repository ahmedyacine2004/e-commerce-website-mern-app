import { useState } from "react";
import { Button } from "@mui/material";
import { FaPlus, FaFileExport } from "react-icons/fa";
import { productsTableColumns } from "../../constants/tableColumns";
import GenericTable from "../../Components/Table";
import { mapProductsData } from "../../utils/adapters/productAdapter";
import SearchBox from "../../Components/SearchBox";
import { useProducts } from "../../hooks/useProducts";
import { exportToCSV } from "../../utils/Export/exportToCSV";

function Products() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");

  // Map raw products array to table data
  const tableData = mapProductsData(products);


  return (
    <div className="min-h-screen">
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col items-center gap-8 mb-5 rounded-lg">
        <div className="col-1 w-full flex items-center justify-between">
          <h1 className="font-[700] text-[24px] text-primary">Products</h1>
          <div className="flex gap-2">
            <Button
              endIcon={<FaPlus size={16} />}
              variant="contained"
              className="!bg-primary"
            >
              Add Product
            </Button>
            <Button
              startIcon={<FaFileExport size={16} />}
              className="!bg-primary !text-white !px-4"
              onClick={() =>
                exportToCSV({
                  data: products,
                  columns: productsTableColumns,
                  fileName: "all-products.csv",
                })
              }
            >
              Export All
            </Button>
          </div>
        </div>

        <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg">
          <div className="w-full flex items-center justify-between py-1">
            <h2 className="text-[18px] font-[600] text-primary">
              Products Table
            </h2>
            <div className="flex gap-3">
              <SearchBox value={search} onChange={setSearch} />
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <GenericTable
              columns={productsTableColumns}
              data={tableData}
              categoryColumns={productsTableColumns.filter(
                (c) =>
                  c.accessor !== "id" &&
                  c.accessor !== "actions" &&
                  ["category", "subcategory"].includes(c.accessor),
              )}
              selectionActions={[
                {
                  label: "Delete",
                  onClick: (selectedIds) => console.log(selectedIds),
                },
                {
                  label: "Export",
                  onClick: (selectedIds) => console.log(selectedIds),
                },
              ]}
              search={search}
              serachMetric={["name", "sku", "category", "subcategory"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
