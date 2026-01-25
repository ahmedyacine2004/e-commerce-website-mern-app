import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ProductZoom from "../../components/ProductZoom";
import itemDetails from "../../data/itemDetails.json";
import products from "../../data/products.json";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import Button from "@mui/material/Button";
import ProductDetailsComponent from "../../components/ProductDetailsComponent";
import { FaCheckCircle } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import ProductsSlider from "../../components/ProductsSlider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import "./style.css";

function ProductDetails() {
  const productDetails = itemDetails[0].info.productDetails;
  const productReviews = itemDetails[0].info.reviews;
  const [activeTab, setActiveTab] = useState("desc");
  const { id } = useParams(); // get product ID from URL

  // scroll to top whenever this component mounts
  useEffect(() => {
    // Scroll to top with smooth behavior on route change
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }, [id]);

  // fallback logic: selectedProduct from context or find by ID or default first product
  const productToShow = products.find((item) => item.id === Number(id));

  if (!productToShow) {
    // If product doesn't exist, render NotFound
    return <NotFound />;
  }

  return (
    <>
      <div className="py-5">
        <Stack spacing={2} className="container">
          <Breadcrumbs separator={"|"} aria-label="breadcrumb">
            <Link key="1" color="inherit" to="/" className="link">
              Home
            </Link>
            <Link key="1" color="inherit" to="/" className="link">
              Fashion
            </Link>
            <Typography
              key="3"
              sx={{ color: "text.primary" }}
              className="link cursor-pointer"
            >
              T-shirt
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
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
          <div className="flex items-center gap-8 mb-5">
            <span
              onClick={() => {
                setActiveTab("desc");
              }}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Description
            </span>
            <span
              onClick={() => {
                setActiveTab("details");
              }}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Product Details
            </span>
            <span
              onClick={() => {
                setActiveTab("reviews");
              }}
              className="link text-[18px] cursor-pointer font-[500]"
            >
              Reviews ({itemDetails[0].info.reviewsNmb})
            </span>
          </div>
          <div className="shadow-md w-[90%] py-5 px-8 rounded-md">
            <div
              className={`desc ${activeTab !== "desc" && "hidden"}  ${
                activeTab === "desc" && "block"
              }`}
            >
              <h4 className="font-[600]">
                {itemDetails[0].info.description.h4_1}
              </h4>
              <p className="text-[14px] pr-48 mt-2 mb-5 ">
                {itemDetails[0].info.description.p_1}
              </p>
              <h4 className="font-[600]">
                {itemDetails[0].info.description.h4_2}
              </h4>
              <p className="text-[14px] pr-48 mt-2 mb-5 ">
                {itemDetails[0].info.description.p_2}
              </p>
              <h4 className="font-[600]">
                {itemDetails[0].info.description.h4_3}
              </h4>
              <p className="text-[14px] pr-48 mt-2 mb-5 ">
                {itemDetails[0].info.description.p_3}
              </p>
              <h4 className="font-[600]">
                {itemDetails[0].info.description.h4_4}
              </h4>
              <p className="text-[14px] pr-48 mt-2 mb-5 ">
                {itemDetails[0].info.description.p_4}
              </p>
              <h4 className="font-[600]">
                {itemDetails[0].info.description.h4_5}
              </h4>
              <p className="text-[14px] pr-48 mt-2 mb-5 ">
                {itemDetails[0].info.description.p_5}
              </p>
            </div>
            <div
              className={`details ${activeTab !== "details" && "hidden"}  ${
                activeTab === "details" && "block"
              }`}
            >
              <ul>
                {Object.entries(productDetails).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b py-2">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-gray-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`reviews ${activeTab !== "reviews" && "hidden"}  ${
                activeTab === "reviews" && "block"
              }`}
            >
              <h2 className="text-[18px] font-[600] mb-4">
                Customer questions and answers
              </h2>
              <div className="scroll !max-h-[300px] overflow-x-hidden">
                {productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg border border-gray-200 p-4 shadow-sm mb-2"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="h-10 w-10 text-gray-400" />
                      )}

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">
                            {review.userName}
                          </h4>

                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Rating */}
                        <Rating
                          value={Number(review.rating)}
                          readOnly
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h5 className="mt-3 font-medium text-gray-800">
                      {review.title}
                    </h5>

                    {/* Comment */}
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Footer */}
                    {review.verifiedPurchase && (
                      <div className="mt-3 flex items-center gap-1 text-green-600">
                        <FaCheckCircle className="text-sm" />
                        <span className="text-xs font-medium">
                          Verified Purchase
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <br />
              <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                <h2 className="text-[18px]">Add review</h2>
                <form action="" className="mt-2 w-full">
                  <TextField
                    id="outlined-multiline-static"
                    label="Write your review"
                    multiline
                    rows={4}
                    className="!w-full"
                  />
                  <br /> <br />
                  <Rating defaultValue={4}></Rating>
                  <div className="flex items-center mt-5">
                    <Button className="btn-primary">Submit Review</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <section className="pt-6">
            <div>
              <h2 className="text-[22px] font-[600]">Related products</h2>
              <ProductsSlider items={6} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
