import Lottie from "lottie-react"; // make sure you have this installed
import animationData from "../../assets/lottie/404.json"; // you will provide the JSON

function NotFound() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="w-[300px] md:w-[300px] rounded-md shadow-md overflow-hidden">
          <Lottie animationData={animationData} className="" loop={true} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-center max-w-sm">
          Sorry, the page you are looking for does not exist. Check the URL or
          go back to the homepage.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
