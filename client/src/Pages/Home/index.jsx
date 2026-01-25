import HomeSlider from "../../components/HomeSlider";
import BannerBoxV2 from "../../components/BannerBoxV2";
import HomeSliderV2 from "../../components/HomeSliderV2";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BlogItem from "../../components/BlogItem";
import { useState } from "react";
import ProductsSlider from "../../components/ProductsSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import blogs from "../../data/blogs.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
import { ThemeContext } from "@emotion/react";

function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div >
      {/*Home Page*/}
      <div className="container ">
        <HomeSlider />
      </div>

      <section className="py-2">
        <div className="container flex items-center gap-4">
          <div className="part-1 w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="part-2 w-[30%] flex flex-col h-[440px] items-center justify-between gap-3">
            <BannerBoxV2
              url={"/images/BannerBoxV2/01.jpg"}
              productName={"Logitech VR Webcam"}
              productPrice={"120$"}
              direction="left"
            />
            <BannerBoxV2
              url={"/images/BannerBoxV2/02.jpg"}
              productName={"Orange Desk Chair"}
              productPrice={"220$"}
              direction="right"
            />
          </div>
        </div>
      </section>

      <HomeCatSlider />

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[22px] font-[600]">Popular products</h2>
              <p className="text-[14px] font-[400]">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightSec">
              <Box
                sx={{
                  maxWidth: { xs: 320, sm: 480, md: 720 },
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Fashion" />
                  <Tab label="Electronics" />
                  <Tab label="Bags" />
                  <Tab label="Footwear" />
                  <Tab label="Groceries" />
                  <Tab label="Beauty" />
                  <Tab label="Wellness" />
                  <Tab label="Jewellery" />
                </Tabs>
              </Box>
            </div>
          </div>
          <div className="">
            <ProductsSlider items={6} />
          </div>
        </div>
      </section>

      <section className="py-10 pt-2 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto p-4 border border-primary flex items-center justify-between rounded-md mb-7">
            <div className="col-1 flex items-center ">
              <LiaShippingFastSolid className="text-[50px] text-primary mr-3" />
              <span className="text-[20px] font-[600] uppercase">
                Free Shipping
              </span>
            </div>
            <div className="col-2 ">
              <span className="text-[16px] font-[500]">
                Enjoy free shipping on all orders over $200. Shop now and save!
              </span>
            </div>
            <div className="col-3">
              <Link to={"/"}>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <AdsBannerSliderV2 items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Latest products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Featured products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider items={2} />
        </div>
      </section>

      <section className="py-5 pt-0 pb-8 bg-white blogSection">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-4">From the Blog</h2>
          <Swiper
            slidesPerView={3}
            modules={[Navigation]}
            className="mySwiperCat"
            spaceBetween={10}
            navigation={true}
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <BlogItem blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;
