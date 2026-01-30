import { useContext } from "react";
import OrdersContext from "../../Contexts/OrdersContext";
import DashboardBoxes from "../../Components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import GenericTable from "../../Components/Table";
import { createExpandableProducts } from "../../utils/Table/tableUtils";
import {
  ordersTableColumns,
  productsTableColumns,
} from "../../constants/tableColumns";
import productsData from "../../data/products.json";
import { FaFileExport } from "react-icons/fa6";
import { mapProductsData } from "../../utils/Table/productAdapter";
import { LineChart as LineChartComponent } from "../../Components/Charts/Line";
import { useSales } from "../../Contexts/SalesContext";

function Dashboard() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const { sales } = useSales(); // get from context
  const products = mapProductsData(productsData);

  return (
    <section className="w-full">
      {/* Welcome Banner */}
      <div className="w-full p-5 pb-2 border bg-[#2600ff17] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-lg">
        <div className="flex items-start justify-between w-full">
          <div className="info">
            <h1 className="text-[28px] font-[600]">
              Welcome, <br />
              {"Ahmed Yassine Abbane"} 👋
            </h1>
            <p className="text-[rgba(0,0,0,0.7)]">
              Here's what's happening on your store today. See the statistics at
              a glance.
            </p>
            <Button
              startIcon={<FaPlus />}
              className="!bg-primary !py-2 !px-4 !text-white !mt-4"
            >
              Add Product
            </Button>
          </div>
          <div className="imgWrapper -mt-16">
            <img
              src="./images/3d-Store.png"
              alt="store 3d"
              className="w-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Boxes */}
      <DashboardBoxes />

      {/* Products Table */}
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg mt-5">
        <div className="w-full flex items-center justify-between py-1">
          <h2 className="text-[18px] font-[600] text-primary">Products</h2>
          <div className="flex gap-3">
            <Button
              startIcon={<FaFileExport size={16} />}
              className="!bg-primary !text-white !px-4"
            >
              Export All
            </Button>
            <Button
              startIcon={<FaPlus size={16} />}
              className="!bg-primary !text-white !px-4"
            >
              Create Product
            </Button>
          </div>
        </div>
        <GenericTable
          columns={productsTableColumns}
          data={products}
          categoryColumns={productsTableColumns.filter(
            (c) =>
              c.accessor !== "id" &&
              c.accessor !== "actions" &&
              ["category", "subcategory"].includes(c.accessor), // only logical grouping columns
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
        />
      </div>

      {/* Recent Orders Table */}
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg mt-5">
        <div className="w-full flex items-center justify-between py-1">
          <h2 className="text-[18px] font-[600] text-primary">Recent Orders</h2>
          <div className="flex gap-3">
            <Button
              startIcon={<FaFileExport size={16} />}
              className="!bg-primary !text-white !px-4"
            >
              Export All
            </Button>
          </div>
        </div>
        <GenericTable
          columns={ordersTableColumns(updateOrderStatus)}
          data={orders}
          categoryColumns={ordersTableColumns(updateOrderStatus).filter(
            (c) =>
              c.accessor !== "id" &&
              c.accessor !== "actions" &&
              ["status", "paymentId", "orderDate"].includes(c.accessor), // only logical grouping columns
          )}
          renderExpandable={(row) =>
            createExpandableProducts(row.products)(row)
          }
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
        />
      </div>

      {/* Users and sales report */}
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg mt-5 ">
        <div className="w-full flex items-center justify-between py-1">
          <h2 className="text-[18px] font-[600] text-primary">Total users & total sales</h2>
          <div className="flex gap-3">
            <Button
              startIcon={<FaFileExport size={16} />}
              className="!bg-primary !text-white !px-4"
            >
              Export
            </Button>
          </div>
        </div>

        <div className="w-full h-96">
          <LineChartComponent data={sales} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
