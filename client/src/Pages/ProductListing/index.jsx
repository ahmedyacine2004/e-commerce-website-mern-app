import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import products from "../../data/products.json";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";
import ProductItemListView from "../../components/ProductItemListView";
import Pagination from "@mui/material/Pagination";

function ProductListing() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setIsItemView] = useState("grid");
  const [content, setContent] = useState("Sales , Highest to Lowest");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (e) => {
    setContent(e.target.textContent);
    handleOpen(); // close menu if you want
  };

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
              <div className="col-1 flex items-center gap-2">
                <Button
                  onClick={() => setIsItemView("grid")}
                  className={`!w-[35px] !h-[35[px] !min-w-[35px] !rounded !text-primary ${
                    itemView === "grid" && "active"
                  }`}
                >
                  <IoGrid className="text-[25px]" />
                </Button>
                <Button
                  onClick={() => setIsItemView("list")}
                  className={`!w-[35px] !h-[35[px] !min-w-[35px] !rounded !text-primary ${
                    itemView === "list" && "active"
                  }`}
                >
                  <FaThList className="text-[25px]" />
                </Button>
                <span className="text-[14px] font-[500] pl-3 text-primary">
                  There are 12 Products
                </span>
              </div>
              <div className="col-2 flex items-center">
                <span className="text-[14px] font-[500] pr-3 text-primary">
                  Sort by:
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="text-[14px] font-[500] !bg-white !text-primary shadow-sm !min-w-[193px] !justify-between"
                  endIcon={<IoMdArrowDropdownCircle />}
                >
                  {content}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleOpen}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Sales , Highest to Lowest
                  </MenuItem>
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Relevance
                  </MenuItem>
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Price, High to Low
                  </MenuItem>
                  <MenuItem
                    className="!text-[14px] !font-[500]"
                    onClick={handleItemClick}
                  >
                    Price, Low to High
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div
              className={`${
                itemView === "grid"
                  ? "grid grid-cols-4 md:grid-cols-4"
                  : "flex flex-col"
              } gap-3`}
            >
              {itemView === "grid"
                ? products.map((product, index) => (
                    <div key={index}>
                      <ProductItem
                        product={product}
                      />
                    </div>
                  ))
                : products.map((product, index) => (
                    <div key={index}>
                      <ProductItemListView
                        product={product}
                      />
                    </div>
                  ))}
            </div>
            <div className="flex items-center justify-center py-4">
              <Pagination
                color="primary"
                count={10}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListing;
