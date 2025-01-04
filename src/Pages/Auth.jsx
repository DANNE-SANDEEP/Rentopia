import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Loader from '../Components/Loader';

const Auth = () => {
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
  
  // Add this effect to simulate initial loading
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);

  // Add useEffect to check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If user is already logged in, redirect to home page
      window.location.href = '/';
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      // First try manager login
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
        const data = await managerResponse.json();
        setMessage("Login successful! Redirecting to manager dashboard...");
        setError(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "manager");

        setTimeout(() => {
          window.location.href = "/mdashboard";
        }, 1500);
        return;
      }

      // If manager login fails, try user login
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
          window.location.href = "/";
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

   // Add this at the very beginning of your return statement
   if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

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
              Login
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
                    Signup
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
      </div>
    </div>
  );
};

export default Auth;