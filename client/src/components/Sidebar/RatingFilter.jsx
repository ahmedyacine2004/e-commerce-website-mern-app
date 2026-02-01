import Rating from "@mui/material/Rating";

function RatingFilter() {
  return (
    <div className="box">
      <h3 className="flex items-center justify-between text-[16px] font-[600] mb-3">
        Filter By Rating
      </h3>
      <div className="w-full flex flex-col cursor-pointer">
        {[5, 4, 3, 2, 1].map((val) => (
          <Rating key={val} name={`rating-${val}`} value={val} size="small" readOnly />
        ))}
      </div>
    </div>
  );
}

export default RatingFilter;
