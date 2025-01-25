import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Loader from "../Components/Loader";

import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/home";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleAuth = async () => {
    try {
      // Replace with your Google Auth endpoint
      window.location.href = "http://localhost:3001/auth/google";
    } catch (error) {
      setError(true);
      setMessage("Failed to authenticate with Google");
    }
  };

  const handleSignupStepOne = (e) => {
    e.preventDefault();
    if (formData.email && formData.userName && formData.dateOfBirth) {
      setSignupStep(2);
    } else {
      setError(true);
      setMessage("Please fill all the fields.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    if (!formData.email || !formData.password) {
      setError(true);
      setMessage("Please fill in both email and password.");
      return;
    }

    try {
      const managerResponse = await fetch(
        "http://localhost:3001/manager/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        }
      );

      if (managerResponse.ok) {
        const managerData = await managerResponse.json();
        setMessage("Login successful! Redirecting to manager dashboard...");
        setError(false);
        localStorage.setItem("token", managerData.token);
        localStorage.setItem("userType", "manager");

        setTimeout(() => {
          window.location.href = "/mdashboard";
        }, 1500);
        return;
      }

      const userResponse = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      const userData = await userResponse.json();

      if (userResponse.ok) {
        setMessage("Login successful! Redirecting to home page...");
        setError(false);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userType", "user");

        setTimeout(() => {
          window.location.href = "/home";
        }, 1500);
      } else {
        setError(true);
        setMessage(userData.errorMessage || "Invalid email or password.");
      }
    } catch (err) {
      setError(true);
      setMessage("An unexpected error occurred during login.");
      console.error(err);
    }
  };

  const handleBack = () => {
    setSignupStep(1);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    if (!validatePassword(formData.password)) {
      setError(true);
      setMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setMessage("Password and confirm password must match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setMessage(data.errorMessage || "Error occurred during signup.");
      } else {
        setFormData({
          userName: "",
          email: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
        });
        setError(false);
        setMessage("Signup successful!");

        setTimeout(() => {
          window.location.href = "/auth";
        }, 1000);
      }
    } catch (err) {
      setError(true);
      setMessage("An unexpected error occurred.");
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-black mb-2">
            <span className="font-bold">Rent</span>opia.
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <button
          onClick={handleGoogleAuth}
          className="w-full bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 mb-6 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {isLogin ? (
          <form className="space-y-4" onSubmit={handleLogin}>
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
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2"
            >
              Sign in
            </button>
          </form>
        ) : (
          <>
            {signupStep === 1 ? (
              <form className="space-y-4" onSubmit={handleSignupStepOne}>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
                    placeholder="Enter your username"
                    required
                  />
                </div>

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
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
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

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full bg-gray-300 text-black py-2 rounded-lg transition-all duration-300 hover:bg-gray-400 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base mt-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {message && (
          <p
            className={`text-sm font-medium mt-4 ${
              error ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600 text-center">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            className="font-medium text-blue-500 cursor-pointer hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setSignupStep(1);
              setMessage("");
              setError(false);
            }}
          >
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            By continuing, you agree to Rentopia's{' '}
            <button 
              onClick={() => navigate('/terms')} 
              className="text-black hover:underline font-medium"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button 
              onClick={() => navigate('/privacy')} 
              className="text-black hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </p>
        </div>
        </div>
      </div>
  );
};

export default Auth;
