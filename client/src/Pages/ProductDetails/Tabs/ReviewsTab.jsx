import { FaCheckCircle, FaUserCircle } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ReviewsTab({ reviews }) {
  return (
    <div>
      <div className="scroll !max-h-[300px] overflow-x-hidden">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm mb-2"
          >
            <div className="flex items-center gap-3">
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
                  <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Rating value={Number(review.rating)} readOnly size="small" />
              </div>
            </div>

            <h5 className="mt-3 font-medium text-gray-800">{review.title}</h5>
            <p className="mt-1 text-gray-600 leading-relaxed">{review.comment}</p>

            {review.verifiedPurchase && (
              <div className="mt-3 flex items-center gap-1 text-green-600">
                <FaCheckCircle className="text-sm" />
                <span className="text-xs font-medium">Verified Purchase</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md mt-4">
        <h2 className="text-[18px]">Add review</h2>
        <form className="mt-2 w-full">
          <TextField
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
  );
}

export default ReviewsTab;
