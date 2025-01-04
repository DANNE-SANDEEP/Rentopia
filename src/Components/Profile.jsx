import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Car,
  Star,
  Edit,
  Camera,
} from "lucide-react";
import Loader from "../Components/Loader";
import proimage from "../assets/images/profile.png";

const StarBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Existing stars */}
      <div className="star small" style={{ top: "15%", left: "50%" }} />
      <div className="star medium" style={{ top: "45%", left: "15%" }} />
      <div className="star large" style={{ top: "75%", left: "75%" }} />
      <div className="star small" style={{ top: "25%", left: "85%" }} />
      <div className="star medium" style={{ top: "65%", left: "25%" }} />
      <div className="star small" style={{ top: "85%", left: "45%" }} />
      <div className="star large" style={{ top: "35%", left: "35%" }} />
      <div className="star medium" style={{ top: "55%", left: "65%" }} />

      {/* Additional stars */}
      <div className="star small" style={{ top: "10%", left: "10%" }} />
      <div className="star large" style={{ top: "50%", left: "50%" }} />
      <div className="star medium" style={{ top: "20%", left: "70%" }} />
      <div className="star small" style={{ top: "40%", left: "30%" }} />
      <div className="star medium" style={{ top: "70%", left: "10%" }} />
      <div className="star small" style={{ top: "80%", left: "80%" }} />
      <div className="star large" style={{ top: "5%", left: "95%" }} />
      <div className="star medium" style={{ top: "90%", left: "20%" }} />
      <div className="star small" style={{ top: "30%", left: "60%" }} />
      <div className="star large" style={{ top: "60%", left: "40%" }} />

      {/* Even more stars */}
      <div className="star small" style={{ top: "12%", left: "12%" }} />
      <div className="star medium" style={{ top: "22%", left: "42%" }} />
      <div className="star large" style={{ top: "32%", left: "62%" }} />
      <div className="star small" style={{ top: "72%", left: "52%" }} />
      <div className="star medium" style={{ top: "82%", left: "22%" }} />
      <div className="star small" style={{ top: "18%", left: "78%" }} />
      <div className="star large" style={{ top: "28%", left: "88%" }} />
      <div className="star medium" style={{ top: "48%", left: "18%" }} />
      <div className="star small" style={{ top: "68%", left: "38%" }} />
      <div className="star large" style={{ top: "88%", left: "68%" }} />

      {/* Final layer of stars */}
      <div className="star small" style={{ top: "8%", left: "28%" }} />
      <div className="star medium" style={{ top: "38%", left: "8%" }} />
      <div className="star large" style={{ top: "58%", left: "48%" }} />
      <div className="star small" style={{ top: "78%", left: "88%" }} />
      <div className="star medium" style={{ top: "28%", left: "68%" }} />
      <div className="star small" style={{ top: "48%", left: "28%" }} />
      <div className="star large" style={{ top: "68%", left: "8%" }} />
      <div className="star medium" style={{ top: "88%", left: "58%" }} />
    </div>
  );
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editError, setEditError] = useState(null);

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
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("http://localhost:3001/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUserProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (field) => {
    setIsEditing(true);
    setEditedData({ ...editedData, [field]: userProfile[field] });
    setEditError(null);
  };

  const handleSave = async (field) => {
    try {
      if (!editedData[field] || editedData[field].trim() === "") {
        setEditError("Username cannot be empty");
        return;
      }

      setEditError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: editedData[field] }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUserProfile({ ...userProfile, [field]: editedData[field] });
        setIsEditing(false);
        setEditedData({});
      } else {
        if (data.error === "USERNAME_EXISTS") {
          setEditError("Username already exists. Please try another one.");
        } else {
          setEditError(data.message || "Failed to update username.");
        }
      }
    } catch (err) {
      setEditError("An error occurred while updating the username.");
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
    setEditError(null);
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
      <style>
        {`
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            filter: blur(1px);
            opacity: 0.5;
            animation: twinkle 3s infinite;
          }

          .star.small {
            width: 2px;
            height: 2px;
          }

          .star.medium {
            width: 3px;
            height: 3px;
          }

          .star.large {
            width: 4px;
            height: 4px;
          }

          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { opacity: 0.2; }
          }

          .star:nth-child(1) { animation-delay: 0s; }
          .star:nth-child(2) { animation-delay: 0.3s; }
          .star:nth-child(3) { animation-delay: 0.6s; }
          .star:nth-child(4) { animation-delay: 0.9s; }
          .star:nth-child(5) { animation-delay: 1.2s; }
          .star:nth-child(6) { animation-delay: 1.5s; }
          .star:nth-child(7) { animation-delay: 1.8s; }
          .star:nth-child(8) { animation-delay: 2.1s; }

          .profile-card {
            background: linear-gradient(to bottom right, #1a1a1a, #000000);
            transition: transform 0.3s ease;
          }

          .profile-card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Card with Stars */}
          <div className="profile-card rounded-xl shadow-lg p-6 relative overflow-hidden">
            <StarBackground />
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
              <h2 className="mt-4 text-xl font-semibold text-white">
                {userProfile.userName}
              </h2>
              <p className="text-gray-400">{userProfile.role}</p>
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
                    {isEditing && editedData.hasOwnProperty("userName") ? (
                      <input
                        type="text"
                        value={editedData.userName}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            userName: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new username"
                      />
                    ) : (
                      <p className="font-medium text-gray-700">
                        {userProfile.userName}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {isEditing && editedData.hasOwnProperty("userName") ? (
                      <>
                        <button
                          onClick={() => handleSave("userName")}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit("userName")}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                  </div>
                </div>
                {editError && (
                  <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fade-in">
                    {editError}
                  </div>
                )}
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
              <div className="flex items-start gap-4">
                <Calendar className="text-gray-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-700">
                    {new Date(userProfile.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>

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
                  <p className="font-medium text-gray-700 capitalize">
                    {userProfile.role}
                  </p>
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
