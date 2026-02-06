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
import NotFound from "../NotFound";

import { getProductById } from "../../api/products.api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <NotFound />;

  console.log(product);

  const {
    description,
    additionalInfo: { productDetails, reviews, reviewsNmb },
  } = product;

  return (
    <div className="py-5">
      <Stack spacing={2} className="container !mb-4">
        <Breadcrumbs separator="|" aria-label="breadcrumb">
          <Link to="/" className="link">
            Home
          </Link>
          <Typography sx={{ color: "text.primary" }} className="link">
            {product.name}
          </Typography>
        </Breadcrumbs>
      </Stack>

      <section className="bg-white py-5">
        <div className="container flex items-center gap-5">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom product={product} />
          </div>
          <div className="productContent w-[60%] pr-20">
            <ProductDetailsComponent selectedProduct={product} />
          </div>
        </div>

        <div className="container pt-10">
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
              Reviews ({reviewsNmb})
            </span>
          </div>

          <div className="shadow-md w-[90%] py-5 px-8 rounded-md">
            {activeTab === "desc" && (
              <DescriptionTab description={description} />
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
