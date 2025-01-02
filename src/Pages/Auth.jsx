import { useState } from "react";
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupStepOne = (e) => {
    e.preventDefault();
    if (formData.email && formData.fullName) {
      setSignupStep(2);
    }
  };

  const handleBack = () => {
    setSignupStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle final form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {isLogin ? (
          // Login Form
          <>
            <button className="w-full mb-6 flex items-center justify-center gap-2 bg-white p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 text-sm sm:text-base">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700">Continue with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          // Signup Form
          <>
          <button className="w-full mb-6 flex items-center justify-center gap-2 bg-white p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 text-sm sm:text-base">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700">Continue with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
              </div>
            </div>
            {signupStep === 1 ? (
              <form className="space-y-4" onSubmit={handleSignupStepOne}>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2 flex items-center justify-center gap-2"
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 border border-black text-black py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 text-sm sm:text-base mt-2 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setSignupStep(1);
              setFormData({
                email: "",
                fullName: "",
                phone: "",
                password: "",
                confirmPassword: ""
              });
            }}
            className="text-black hover:text-gray-600 font-bold transition-colors duration-200"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;