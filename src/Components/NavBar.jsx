import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black px-4 py-3 relative border-b border-gray-700">
      <div className="max-w-[1440px] mx-auto">
        {/* Top bar with logo and menu items */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-24">
            <Link to="/" className="text-white text-2xl font-medium">
              <span className='font-bold'>Rent</span>opia<span className='font-bold'>.</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-white px-4 py-2 rounded-full  hover:bg-gray-300/30 transition-all duration-200 text-base">
                Home
              </Link>
              <Link to="/available-cars" className="text-white px-4 py-2 rounded-full  hover:bg-gray-300/30 transition-all duration-200 text-base">
              Available Rents
              </Link>
              <Link to="/cars-added" className="text-white px-4 py-2 rounded-full  hover:bg-gray-300/30 transition-all duration-200 text-base">
                Earn 
              </Link>
            </div>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center2">
              <Link to="/help" className="text-white px-4 py-2 rounded-full  hover:bg-gray-300/30 transition-all duration-200">
                Help
              </Link>
              
              {isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-white hover:text-gray-300"
                >
                  Log out
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  
                  <Link 
                    to="/auth" 
                    className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden 
          fixed 
          inset-0 
          bg-black 
          z-50
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-white text-2xl font-medium">
                Rentopia
              </Link>
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Ride
              </Link>
              <Link 
                to="/available-cars" 
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Drive
              </Link>
              <Link 
                to="/cars-added" 
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Business
              </Link>
              <Link 
                to="/help" 
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="text-white text-lg text-left"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="text-white text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/auth" 
                    className="bg-white text-black px-4 py-3 rounded-full text-center text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;