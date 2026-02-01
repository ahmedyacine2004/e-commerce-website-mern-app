import Lottie from "lottie-react"; // make sure you got this installed
import animationData from "../../assets/lottie/404.json"; // your Lottie JSON
import { useNavigate } from "react-router-dom"; // assuming you use react-router
import { Button } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="w-[300px] md:w-[300px] rounded-md shadow-md overflow-hidden">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Yo, this spot ain't poppin
        </h1>
        <p className="text-gray-600 text-center max-w-sm">
          Damn, fam. This page don’t exist. Peep the URL or bounce back home.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="!px-4 !py-2 !bg-primary !text-white shadow !hover:bg-blue-700 !transition"
        >
          Back to the Hood
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
