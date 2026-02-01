import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/spinner.json";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#f1f1f1]">
      <div className="w-40">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
