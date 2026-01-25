import React from "react";
import { Link } from "react-router-dom";

/**
 * BannerBox Component
 * -------------------
 * Displays a clickable banner image that links to a specified path.
 *
 * Props:
 * - img: Name of the image file (without extension)
 * - link: URL path to navigate on click
 */
function BannerBox({ img, link }) {
  return (
    <>
      {/* Banner container */}
      <div className="box bannerBox group">
        {/* Clickable link */}
        <Link to={link}>
          {/* Banner image with hover effects */}
          <img
            src={`/images/HomeAdsBanners/${img}.jpg`} // Dynamic image path
            alt={img} // Alt text
            className="w-full group-hover:scale-110 group-hover:rotate-2 transition-all duration-300" // Hover animations
          />
        </Link>
      </div>
    </>
  );
}

export default BannerBox;
