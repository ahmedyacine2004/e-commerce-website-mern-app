import { useState } from "react";
import { Button } from "@mui/material";
import { FaPlus, FaFileExport } from "react-icons/fa";
import { productsTableColumns } from "../../constants/tableColumns";
import GenericTable from "../../Components/Table";
import productsData from "../../data/products.json";
import { mapProductsData } from "../../utils/Table/productAdapter";
import SearchBox from "../../Components/SearchBox";

function Products() {
  const products = mapProductsData(productsData);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

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
            >
              Export All
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg">
          <div className="w-full flex items-center justify-between py-1">
            <h2 className="text-[18px] font-[600] text-primary">
              Products Table
            </h2>
            <div className="flex gap-3">
              <SearchBox value={search} onChange={setSearch} />
            </div>
          </div>

          <GenericTable
            columns={productsTableColumns}
            data={products}
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
            search={search} // 🔍 connected
            serachMetric={["name", "sku", "category", "subcategory"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
