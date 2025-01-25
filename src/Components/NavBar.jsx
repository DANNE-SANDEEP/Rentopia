import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Wallet, Calendar, Settings, LogOut } from 'lucide-react';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Add ref for the dropdown container
  const dropdownRef = React.useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);

  const logout = async () => {
    try {
      // Call the backend to clear cookies
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
  
        // Update the state to reflect the user is logged out
        setIsLoggedIn(false);
        setIsProfileDropdownOpen(false);
  
        // Redirect to home page or login page
        window.location.href = "/home";
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.errorMessage);
      }
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };
  

  return (
    <nav className="bg-black px-4 py-3 relative border-b border-gray-700">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-24">
            <Link to="/home" className="text-white text-2xl font-medium">
              <span className="font-bold">Rent</span>opia<span className="font-bold">.</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/home" className="text-white px-4 py-2 rounded-full hover:bg-gray-300/30 transition-all duration-200 text-base">
                Home
              </Link>
              <Link to="/available-cars" className="text-white px-4 py-2 rounded-full hover:bg-gray-300/30 transition-all duration-200 text-base">
                Available Rents
              </Link>
              <Link to="/cars-added" className="text-white px-4 py-2 rounded-full hover:bg-gray-300/30 transition-all duration-200 text-base">
                Earn
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center">
              <Link to="/help" className="text-white px-4 py-2 rounded-full hover:bg-gray-300/30 transition-all duration-200 mr-4">
                Help
              </Link>

              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-6 h-6 text-black" />
                  </button>

                  <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 transform origin-top-right transition-all duration-200 ease-out ${
                    isProfileDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link to="/bookings" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                    <Link to="/wallet" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <Wallet className="w-4 h-4 mr-2" />
                      My Wallet
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/auth" className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition-colors rounded-full">
                  Log In
                </Link>
              )}
            </div>

            <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden fixed inset-0 bg-black z-50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/home" className="text-white text-2xl font-medium" onClick={toggleMenu}>
                Rentopia
              </Link>
              <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              <Link to="/home" className="text-white text-lg" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/available-cars" className="text-white text-lg" onClick={toggleMenu}>
                Available Rents
              </Link>
              <Link to="/cars-added" className="text-white text-lg" onClick={toggleMenu}>
                Earn
              </Link>
              <Link to="/help" className="text-white text-lg" onClick={toggleMenu}>
                Help
              </Link>

              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="text-white text-lg" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <Link to="/bookings" className="text-white text-lg" onClick={toggleMenu}>
                    My Bookings
                  </Link>
                  <Link to="/wallet" className="text-white text-lg" onClick={toggleMenu}>
                    My Wallet
                  </Link>
                  <Link to="/settings" className="text-white text-lg" onClick={toggleMenu}>
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-white text-lg"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="text-white text-lg" onClick={toggleMenu}>
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;