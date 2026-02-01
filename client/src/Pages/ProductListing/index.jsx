import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import products from "../../data/products.json";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import ViewToggle from "./ViewToggle";
import SortMenu from "./SortMenu";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";
import { useState } from "react";

export default function ProductListing() {
  const [itemView, setItemView] = useState("grid");

  return (
    <section className="py-5 pb-0">
      <Stack spacing={2} className="container">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link key="1" color="inherit" to="/" className="link">
            Home
          </Link>
          <Typography
            key="3"
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            Product Listing
          </Typography>
        </Breadcrumbs>
      </Stack>

      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper h-full w-[20%] py-3 bg-white">
            <Sidebar />
          </div>

          <div className="rightContent w-[80%] py-3 bg-white">
            <div className="flex items-center justify-between bg-[#f1f1f1] p-2 w-full rounded mb-3">
              <ViewToggle
                itemView={itemView}
                setItemView={setItemView}
                totalProducts={products.length}
              />
              <SortMenu />
            </div>

            <div
              className={`${
                itemView === "grid"
                  ? "grid grid-cols-4 md:grid-cols-4"
                  : "flex flex-col"
              } gap-3`}
            >
              {itemView === "grid" ? (
                <ProductGrid products={products} />
              ) : (
                <ProductList products={products} />
              )}
            </div>

            <div className="flex items-center justify-center py-4">
              <Pagination color="primary" count={10} variant="outlined" shape="rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
