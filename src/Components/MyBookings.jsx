import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Car, Bike, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './Alert';
import Loader from './Loader';

const StarBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`star ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const MyBookingsComponent = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentBookings = [
    { id: 1, type: 'car', model: 'Tesla Model 3', startDate: '2025-01-10', endDate: '2025-01-15', location: 'San Francisco', price: 450 },
    { id: 2, type: 'bike', model: 'Mountain Bike', startDate: '2025-01-20', endDate: '2025-01-22', location: 'Yosemite', price: 75 },
  ];

  const pastBookings = [
    { id: 3, type: 'car', model: 'Ford Mustang', startDate: '2024-12-05', endDate: '2024-12-07', location: 'Los Angeles', price: 200 },
    { id: 4, type: 'bike', model: 'City Bike', startDate: '2024-12-15', endDate: '2024-12-16', location: 'San Diego', price: 30 },
  ];
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCancelBooking = (id) => {
    setCancelBookingId(id);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    // Here you would typically make an API call to cancel the booking
    console.log(`Cancelling booking ${cancelBookingId}`);
    setShowCancelModal(false);
    setError(''); // Clear any previous errors
    // For demo purposes, we're not actually removing the booking from the list
  };

  const renderBooking = (booking) => (
    <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{booking.model}</h3>
          <p className="text-gray-600 flex items-center">
            {booking.type === 'car' ? <Car className="mr-2" size={18} /> : <Bike className="mr-2" size={18} />}
            {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
          </p>
        </div>
        <p className="text-2xl font-bold">${booking.price}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Calendar className="mr-2 text-gray-400" size={18} />
          <p>{booking.startDate} - {booking.endDate}</p>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 text-gray-400" size={18} />
          <p>{booking.location}</p>
        </div>
      </div>
      {activeTab === 'current' && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleCancelBooking(booking.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Cancel Booking
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Extend Rental
          </button>
        </div>
      )}
      {activeTab === 'past' && (
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center">
            <ArrowUpRight className="mr-2" size={18} />
            Leave Review
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <ArrowDownRight className="mr-2" size={18} />
            Rent Again
          </button>
        </div>
      )}
    </div>
  );

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
          .star.small { width: 2px; height: 2px; }
          .star.medium { width: 3px; height: 3px; }
          .star.large { width: 4px; height: 4px; }
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { opacity: 0.2; }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Bookings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bookings Overview Card */}
          <div className="md:col-span-2 rounded-xl shadow-lg p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <StarBackground />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                {activeTab === 'current' ? <Car className="text-white" size={24} /> : <Clock className="text-white" size={24} />}
                <h2 className="text-xl font-semibold text-white">
                  {activeTab === 'current' ? 'Current & Upcoming' : 'Past Bookings'}
                </h2>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-white">
                  {activeTab === 'current' ? currentBookings.length : pastBookings.length}
                </p>
                <p className="text-gray-400 mt-2">
                  {activeTab === 'current' ? 'Active reservations' : 'Completed trips'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="text-blue-500" size={20} />
                  <span className="text-gray-600">Car Rentals</span>
                </div>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bike className="text-green-500" size={20} />
                  <span className="text-gray-600">Bike Rentals</span>
                </div>
                <span className="font-semibold">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'current' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('current')}
            >
              Current & Upcoming
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'past' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('past')}
            >
              Past Bookings
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div>
          {activeTab === 'current' && currentBookings.map(renderBooking)}
          {activeTab === 'past' && pastBookings.map(renderBooking)}
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Cancel Booking</h3>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <p className="mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsComponent;