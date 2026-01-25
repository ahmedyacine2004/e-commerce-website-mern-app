import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";

/**
 * BlogItem Component
 * ------------------
 * Displays a single blog item with cover image, date, title, description,
 * and overlay options like search and external link icons.
 *
 * Props:
 * - blog: Object containing blog details
 *   - cover_image_url: URL of the cover image
 *   - createdAt: Date string of blog creation
 *   - title: Blog title
 *   - description: Blog description
 */
function BlogItem({ blog }) {
  return (
    <div className="blogItem group cursor-pointer">
      {/* Image wrapper with hover effects */}
      <div className="relative imgWrapper w-full overflow-hidden rounded-md max-h-[250px]">
        <img
          src={blog.cover_image_url}
          alt="Blog Item"
          className="w-full h-full transition-all group-hover:scale-110 group-hover:rotate-1 object-cover"
        />

        {/* Blog creation date */}
        <time className="flex justify-start gap-3 items-center text-[14px] font-[400] bg-primary text-white px-3 py-1 rounded-md absolute bottom-2 left-2">
          <FaRegClock />
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {/* Overlay options on hover */}
        <div className="options flex gap-2 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 transition z-50">
          {/* Search Icon */}
          <div className="searchIcon w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition z-50">
            <SlMagnifier />
          </div>

          {/* External Link Icon */}
          <div className="searchIcon w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition z-50">
            <FaLink />
          </div>

          {/* Background overlay */}
          <div className="bg-overlay absolute top-0 left-0 w-full h-full"></div>
        </div>
      </div>

      {/* Blog text info */}
      <div className="info py-8 box-content px-2">
        {/* Blog Title */}
        <Link to={"/"} className="link">
          <h3 className="text-start text-[16px] font-[600] mt-2 min-h-[48px]">
            {blog.title}
          </h3>
        </Link>

        {/* Blog Description */}
        <p className="text-start text-[14px] font-[400] mt-1 truncate-2-lines">
          {blog.description}
        </p>

        {/* Read More Button */}
        <Link>
          <button className="flex items-center gap-1 w-full text-start text-primary font-[500] mt-1 hover:underline text-[16px] uppercase">
            Read More <IoIosArrowForward />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
