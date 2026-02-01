import { Link } from "react-router-dom";

function BannerBox({ img, link }) {
  return (
    <div className="box bannerBox group">
      <Link to={link}>
        <img
          src={`/images/HomeAdsBanners/${img}.jpg`}
          alt={img}
          className="w-full group-hover:scale-110 group-hover:rotate-2 transition-all duration-300"
        />
      </Link>
    </div>
  );
}

export default BannerBox;
