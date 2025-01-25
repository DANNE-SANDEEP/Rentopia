import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Target, Handshake, Car, Settings, Star } from 'lucide-react';
import Lottie from 'lottie-react';
import aboutAnimation from '../assets/lottie/about-us.json';
import Footer from '../Components/Footer';
import Loading from '../Components/Loader';

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or replace with actual data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      {/* Hero Section */}
      <section className="h-screen">
        <div className="h-full max-w-[1570px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h1 className="text-5xl mb-8">
                Transforming Vehicle
                <br />
                <span className="font-bold">Rental Experience</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We're building the future of vehicle rentals by connecting vehicle owners with those who need them, creating a community-driven marketplace that benefits everyone.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors w-fit">
                Join Our Community
              </button>

              {/* Feature Highlights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Trust & Safety</h3>
                  <p className="text-gray-600">Every vehicle verified by professional mechanics</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Community Driven</h3>
                  <p className="text-gray-600">Built by and for local communities</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-gray-600">Round-the-clock assistance for all users</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Innovation First</h3>
                  <p className="text-gray-600">Cutting-edge technology for seamless experience</p>
                </div>
              </div>
            </div>

            {/* Right Side - Lottie Animation */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full h-full max-w-2xl">
                {/* <Lottie animationData={aboutAnimation} loop={true} className="w-full h-full" /> */}
                <Lottie animationData={aboutAnimation} loop={true} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="h-screen bg-gray-50">
        <div className="h-full max-w-[1570px] mx-auto px-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Shield size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trust & Safety</h3>
              <p className="text-gray-600 mb-6">
                Every vehicle undergoes rigorous verification and regular safety checks by certified mechanics. 
                Your safety is our top priority, and we maintain strict quality standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community First</h3>
              <p className="text-gray-600 mb-6">
                We believe in building strong local communities. Our platform enables vehicle owners to earn 
                extra income while helping neighbors access reliable transportation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Target size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600 mb-6">
                We continuously improve our platform with cutting-edge technology to provide the best 
                possible experience for both vehicle owners and renters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="h-screen">
        <div className="h-full max-w-[1570px] mx-auto px-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Vehicle Rentals</h3>
              <p className="text-gray-600">Wide range of verified vehicles with flexible rental periods</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Maintenance</h3>
              <p className="text-gray-600">Professional mechanic network and regular vehicle checks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Business Solutions</h3>
              <p className="text-gray-600">Comprehensive tools for rental businesses and fleet management</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Premium Support</h3>
              <p className="text-gray-600">24/7 customer service and roadside assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="h-screen bg-black text-white">
        <div className="h-full max-w-[1570px] mx-auto px-8 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-gray-300 mb-8">
              Whether you're looking to rent a vehicle or want to earn money by sharing yours, 
              we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth" 
                className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/contact" 
                className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;