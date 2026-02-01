import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function PriceFilter() {
  return (
    <div className="box">
      <h3 className="flex items-center justify-between text-[16px] font-[600] mb-3">
        Filter By Price
      </h3>
      <RangeSlider />
      <div className="flex pt-4 pb-2 justify-between">
        <span className="text-[13px]">
          from : <strong>100$</strong>
        </span>
        <span className="text-[13px]">
          to : <strong>5000$</strong>
        </span>
      </div>
    </div>
  );
}

export default PriceFilter;
