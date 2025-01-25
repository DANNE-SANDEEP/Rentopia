import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, MessageCircle } from "lucide-react";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lottie/404-animation.json";
import Loader from "../Components/Loader";

const PageNotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-lg mx-auto">
              <Lottie
                animationData={notFoundAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="space-y-6 mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Looks like you've ventured into uncharted territory. Don't worry
                though – let's get you back on the right path.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/home"
                className="group flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Home
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span>Return Home</span>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="group flex items-center justify-center gap-2 bg-white border-2 border-black px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:translate-x-[-4px] transition-transform duration-300"
                />
                <span>Go Back</span>
              </button>
            </div>

            <Link
              to="/help"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors duration-300"
            >
              <MessageCircle size={18} />
              <span>Need help? Contact our support team</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
