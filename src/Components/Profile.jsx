import React, { useState, useEffect } from "react";
import { User, Mail, Calendar, Shield, Car, Star, Camera } from "lucide-react";
import Cookies from "js-cookie";
import Loader from "../Components/Loader";
import proimage from "../assets/images/profile.png";
import personAnimation from "../assets/lottie/personAnimation.json";
import Lottie from "lottie-react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const role = Cookies.get("role");
      const id = Cookies.get("id");

      console.log("Role:", role); // Ensure role is printed here
      console.log("ID:", id); // Ensure ID is printed here

      const response = await fetch("http://localhost:3001/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "Failed to fetch profile");
      }

      const data = await response.json();

      // Print user or manager data in the console
      if (role === "user") {
        console.log("User Profile:", data);
      } else if (role === "manager") {
        console.log("Manager Profile:", data);
      }
      setRole(role);

      setUserProfile(data); // Update the profile state
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Card with Stars */}
          <div className="profile-card rounded-xl shadow-lg p-6 relative overflow-hidden bg-gray-200">
            <div className="flex flex-col items-center relative z-10">
              <div className="relative group">
                <img
                  src={proimage}
                  alt="Profile"
                  className="bg-white w-32 h-32 rounded-full object-contain border shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 opacity-80 hover:opacity-100">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-500">
                {userProfile.userName}
              </h2>
              <div className="mt-4 w-full h-full">
                <Lottie
                  className="w-full h-full"
                  animationData={personAnimation}
                  loop={true}
                />
              </div>
            </div>
          </div>

          {/* Main Profile Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Profile Information
            </h3>
            <div className="space-y-6">
              {/* Username */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-4">
                  <User className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-700">
                      {userProfile.userName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-gray-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-700">
                    {userProfile.email}
                  </p>
                </div>
              </div>

              {/* Date of Birth */}

              {role === "user" && (
                <div className="flex items-start gap-4">
                  <Calendar className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-700">
                      {new Date(userProfile.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Account Created */}
              <div className="flex items-start gap-4">
                <Calendar className="text-gray-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-700">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4">
                <Shield className="text-gray-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium text-gray-700 capitalize">{role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Static Information Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Account Status
              </h3>
            </div>
            <p className="text-gray-600">Active Member</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Rental Activity
              </h3>
            </div>
            <p className="text-gray-600">0 rentals</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Rating</h3>
            </div>
            <p className="text-gray-600">No ratings yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
