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
import TableActions from "../../Components/Table/TableActions";
import { mapProductsData } from "../../utils/Table/productAdapter";

function Dashboard() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
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
        <h2 className="text-[18px] font-[600] text-primary">Products</h2>

        <GenericTable
          columns={productsTableColumns}
          data={products}
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
        <h2 className="text-[18px] font-[600] text-primary">Recent Orders</h2>

        <GenericTable
          columns={ordersTableColumns(updateOrderStatus)}
          data={orders}
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
    </section>
  );
}

export default Dashboard;
