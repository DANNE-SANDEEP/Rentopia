import React, { useState, useEffect, useRef } from 'react';
import { Car, Bike, Calendar, MapPin, Clock, Store, DollarSign, Users } from 'lucide-react';
import Lottie from 'lottie-react';
import carAnimation from '../assets/lottie/car-animation.json';
import Loader from '../Components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';  // Add this import

const Home = () => {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('Today');
  const [selectedEndDate, setSelectedEndDate] = useState('Tomorrow');
  const [selectedStartTime, setSelectedStartTime] = useState('Now');
  const [selectedEndTime, setSelectedEndTime] = useState('Now');
  const [currentStartMonth, setCurrentStartMonth] = useState(new Date());
  const [currentEndMonth, setCurrentEndMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState('car');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Phagwara');
  
  const locations = [
    'Phagwara',
    'Jalandhar',
    'Vijayawada',
    'Hyderabad',
    'Bengalore',
    'Chennai',
    'Coimbatore'
  ];

  // Add useRef for dropdown containers
  const locationRef = useRef(null);
  const startDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endDateRef = useRef(null);
  const endTimeRef = useRef(null);

  // Add useEffect for click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationPicker(false);
      }
      if (startDateRef.current && !startDateRef.current.contains(event.target)) {
        setShowStartCalendar(false);
      }
      if (startTimeRef.current && !startTimeRef.current.contains(event.target)) {
        setShowStartTimePicker(false);
      }
      if (endDateRef.current && !endDateRef.current.contains(event.target)) {
        setShowEndCalendar(false);
      }
      if (endTimeRef.current && !endTimeRef.current.contains(event.target)) {
        setShowEndTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen overflow-y-auto">
      {/* Hero Section */}
      <section className="h-screen  ">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            {/* Left Side - Booking Interface */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h1 className="text-5xl mb-8">
                Rent vehicles from
                <br /> <span className="font-bold">your own place</span>
              </h1>

              {/* Vehicle Type Selection */}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setSelectedVehicleType('car')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                    selectedVehicleType === 'car' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Car size={20} />
                  <span>Car</span>
                </button>
                <button 
                  onClick={() => setSelectedVehicleType('bike')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                    selectedVehicleType === 'bike' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Bike size={20} />
                  <span>Bike</span>
                </button>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                {/* Location Input */}
                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => {
                      setShowLocationPicker(!showLocationPicker);
                      setShowStartCalendar(false);
                      setShowEndCalendar(false);
                      setShowStartTimePicker(false);
                      setShowEndTimePicker(false);
                    }}
                    className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3 hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-500" />
                      <span>{selectedLocation}</span>
                    </div>
                    <svg 
                      className="w-4 h-4 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Location Picker Popup */}
                  {showLocationPicker && (
                    <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4 w-64">
                      <div className="max-h-60 overflow-y-auto">
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => {
                              setSelectedLocation(location);
                              setShowLocationPicker(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Start Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative" ref={startDateRef}>
                    <button
                      onClick={() => {
                        setShowStartCalendar(!showStartCalendar);
                        setShowEndCalendar(false);
                        setShowStartTimePicker(false);
                        setShowEndTimePicker(false);
                      }}
                      className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="text-gray-500" />
                        <span>Start: {selectedStartDate}</span>
                      </div>
                    </button>
                    
                    {/* Start Calendar Popup */}
                    {showStartCalendar && (
                      <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => setCurrentStartMonth(new Date(currentStartMonth.setMonth(currentStartMonth.getMonth() - 1)))}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            ←
                          </button>
                          <span className="font-medium">
                            {currentStartMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </span>
                          <button
                            onClick={() => setCurrentStartMonth(new Date(currentStartMonth.setMonth(currentStartMonth.getMonth() + 1)))}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            →
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-sm font-medium">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {[...Array(firstDayOfMonth(currentStartMonth))].map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {[...Array(daysInMonth(currentStartMonth))].map((_, i) => {
                            const date = new Date(currentStartMonth.getFullYear(), currentStartMonth.getMonth(), i + 1);
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedStartDate(formatDate(date));
                                  setShowStartCalendar(false);
                                }}
                                className="p-2 text-center hover:bg-gray-100 rounded"
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={startTimeRef}>
                    <button
                      onClick={() => {
                        setShowStartTimePicker(!showStartTimePicker);
                        setShowStartCalendar(false);
                        setShowEndCalendar(false);
                        setShowEndTimePicker(false);
                      }}
                      className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="text-gray-500" />
                        <span>{selectedStartTime}</span>
                      </div>
                    </button>

                    {/* Start Time Picker Popup */}
                    {showStartTimePicker && (
                      <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4 w-64">
                        <div className="max-h-60 overflow-y-auto">
                          {generateTimeSlots().map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                setSelectedStartTime(time);
                                setShowStartTimePicker(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* End Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative" ref={endDateRef}>
                    <button
                      onClick={() => {
                        setShowEndCalendar(!showEndCalendar);
                        setShowStartCalendar(false);
                        setShowStartTimePicker(false);
                        setShowEndTimePicker(false);
                      }}
                      className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="text-gray-500" />
                        <span>End: {selectedEndDate}</span>
                      </div>
                    </button>
                    
                    {/* End Calendar Popup */}
                    {showEndCalendar && (
                      <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => setCurrentEndMonth(new Date(currentEndMonth.setMonth(currentEndMonth.getMonth() - 1)))}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            ←
                          </button>
                          <span className="font-medium">
                            {currentEndMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </span>
                          <button
                            onClick={() => setCurrentEndMonth(new Date(currentEndMonth.setMonth(currentEndMonth.getMonth() + 1)))}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            →
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-sm font-medium">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {[...Array(firstDayOfMonth(currentEndMonth))].map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {[...Array(daysInMonth(currentEndMonth))].map((_, i) => {
                            const date = new Date(currentEndMonth.getFullYear(), currentEndMonth.getMonth(), i + 1);
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedEndDate(formatDate(date));
                                  setShowEndCalendar(false);
                                }}
                                className="p-2 text-center hover:bg-gray-100 rounded"
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={endTimeRef}>
                    <button
                      onClick={() => {
                        setShowEndTimePicker(!showEndTimePicker);
                        setShowStartCalendar(false);
                        setShowEndCalendar(false);
                        setShowStartTimePicker(false);
                      }}
                      className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="text-gray-500" />
                        <span>{selectedEndTime}</span>
                      </div>
                    </button>

                    {/* End Time Picker Popup */}
                    {showEndTimePicker && (
                      <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4 w-64">
                        <div className="max-h-60 overflow-y-auto">
                          {generateTimeSlots().map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                setSelectedEndTime(time);
                                setShowEndTimePicker(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors">
                See available vehicles
              </button>

              {/* Feature Highlights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Rent From Locals</h3>
                  <p className="text-gray-600">Access vehicles from your community at competitive rates</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Quality Assured</h3>
                  <p className="text-gray-600">Every vehicle is verified by our professional mechanics</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Managed Service</h3>
                  <p className="text-gray-600">Dedicated managers handle all verifications and payments</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Extra Income</h3>
                  <p className="text-gray-600">Earn money by renting out your unused vehicles</p>
                </div>
              </div>
            </div>

            {/* Right Side - Lottie Animation */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full h-full max-w-2xl">
                <Lottie
                  animationData={carAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="h-screen bg-gray-50">
        <div className="h-full max-w-[1400px] mx-auto px-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center">Join Our Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rent Your Vehicle */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <DollarSign size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Rent Out Your Vehicle</h3>
              <p className="text-gray-600 mb-6">Turn your idle vehicle into income. Set your own rates and availability, and earn money while helping your community.</p>
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full" onClick={() => navigate('/cars-added')}>
                List Your Vehicle
              </button>
            </div>

            {/* Register Your Shop */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Store size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Register Your Rental Business</h3>
              <p className="text-gray-600 mb-6">Digitize your rental business. Get access to our booking system, customer base, and streamlined management tools.</p>
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full">
                Register Shop
              </button>
            </div>

            {/* Become a Partner */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Users size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Become a Partner</h3>
              <p className="text-gray-600 mb-6">Join as a service partner. Provide maintenance, inspection, or support services to our growing network.</p>
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="h-screen">
        <div className="h-full max-w-[1400px] mx-auto px-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Increased Revenue</h3>
              <p className="text-gray-600">Access a wider customer base and maximize your earning potential</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Digital Presence</h3>
              <p className="text-gray-600">Get online visibility and manage bookings digitally</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Support Network</h3>
              <p className="text-gray-600">Join a community of partners and access professional support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Set your own availability and manage your time efficiently</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="h-screen bg-black text-white">
        <div className="h-full max-w-[1570px] mx-auto px-8 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8">Join our platform today and become part of the future of vehicle rental services</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">Register Now</Link>
              <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;