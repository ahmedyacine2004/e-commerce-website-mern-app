import { useContext } from "react";
import OrdersContext from "../../Contexts/OrdersContext";
import DashboardBoxes from "../../Components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import GenericTable from "../../Components/Table";
import {
  createRowActions,
  createExpandableProducts,
} from "../../utils/tableUtils";
import {
  ordersTableColumns,
  productsTableColumns,
} from "../../constants/tableColumns";
import productsData from "../../data/products.json";

function Dashboard() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);

  // Flatten the JSON to match the table columns
  const products = productsData.map((p) => ({
    id: p.id,
    name: p.info.name,
    category: p.info.category,
    colors: p.info.colors || [], // keep all colors
    sizes: p.info.sizes || [], // keep all sizes
    qty: 1, // default quantity
    newPrice: p.info.newPrice,
    rating: p.info.rating,
    img: p.img.url1 || "/placeholder.png",
  }));

  return (
    <section className="p-8 w-full">
      {/* Welcome Banner */}
      <div className="w-full p-5 pb-2 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-lg">
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
      <div className="w-full p-5 border border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg mt-5">
        <h2 className="text-[18px] font-[600] text-primary">Products</h2>

        <GenericTable
          columns={productsTableColumns}
          data={products}
          // Optional: row actions for products
          renderRowActions={(product) => (
            <Button
              size="small"
              variant="outlined"
              onClick={() => alert(`Edit ${product.name}`)}
            >
              Edit
            </Button>
          )}
          // No expandable rows for this table
        />
      </div>

      {/* Recent Orders Table */}
      <div className="w-full p-5 border border-[rgba(0,0,0,0.1)] flex flex-col gap-2 mb-5 rounded-lg mt-5">
        <h2 className="text-[18px] font-[600] text-primary">Recent Orders</h2>
        {/* Orders Table */}
        <GenericTable
          columns={ordersTableColumns}
          data={orders}
          renderRowActions={createRowActions(updateOrderStatus)}
          renderExpandable={(row) =>
            createExpandableProducts(row.products)(row)
          }
        />
      </div>
    </section>
  );
}

export default Dashboard;
