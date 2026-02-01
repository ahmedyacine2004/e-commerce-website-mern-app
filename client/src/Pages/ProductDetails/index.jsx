import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import ProductZoom from "../../components/ProductZoom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent";
import DescriptionTab from "./Tabs/DescriptionTab";
import DetailsTab from "./Tabs/DetailsTab";
import ReviewsTab from "./Tabs/ReviewsTab";
import RelatedProducts from "./RelatedProducts";

import products from "../../data/products.json";
import itemDetails from "../../data/itemDetails.json";
import NotFound from "../NotFound";

function ProductDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [id]);

  const productToShow = products.find((item) => item.id === Number(id));
  if (!productToShow) return <NotFound />;

  const { productDetails, reviews } = itemDetails[0].info;

  return (
    <div className="py-5">
      <Stack spacing={2} className="container !mb-4">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link color="inherit" to="/" className="link">
            Home
          </Link>
          <Link color="inherit" to="/" className="link">
            Fashion
          </Link>
          <Typography
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            T-shirt
          </Typography>
        </Breadcrumbs>
      </Stack>

      <section className="bg-white py-5">
        <div className="container flex items-center gap-5">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom />
          </div>
          <div className="productContent w-[60%] pr-20">
            <ProductDetailsComponent selectedProduct={productToShow} />
          </div>
        </div>

        <div className="container pt-10">
          {/* Tabs */}
          <div className="flex items-center gap-8 mb-5">
            <span
              onClick={() => setActiveTab("desc")}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Description
            </span>
            <span
              onClick={() => setActiveTab("details")}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Product Details
            </span>
            <span
              onClick={() => setActiveTab("reviews")}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Reviews ({itemDetails[0].info.reviewsNmb})
            </span>
          </div>

          <div className="shadow-md w-[90%] py-5 px-8 rounded-md">
            {activeTab === "desc" && (
              <DescriptionTab
                description={productToShow.info.description}
                activeTab={activeTab}
              />
            )}
            {activeTab === "details" && (
              <DetailsTab productDetails={productDetails} />
            )}
            {activeTab === "reviews" && <ReviewsTab reviews={reviews} />}
          </div>

          <RelatedProducts items={6} />
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
