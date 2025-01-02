import React, { useState } from 'react';
import { Car, Bike, Calendar, MapPin, Clock } from 'lucide-react';
import Lottie from 'lottie-react';
import carAnimation from '../assets/lottie/car-animation.json';

const Home = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calendar helpers
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

  return (
    <section className="min-h-screen max-w-[1570px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Booking Interface */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <h1 className="text-5xl mb-8">
            Rent vehicles from
            <br /> <span className='font-bold'>your own place</span>
          </h1>

          {/* Vehicle Type Selection */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Car size={20} />
              <span>Car</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Bike size={20} />
              <span>Bike</span>
            </button>
          </div>

          {/* Booking Form */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
              <MapPin className="text-gray-500" />
              <input
                type="text"
                placeholder="Pickup location"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
              <MapPin className="text-gray-500" />
              <input
                type="text"
                placeholder="Dropoff location"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Date Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCalendar(!showCalendar);
                    setShowTimePicker(false);
                  }}
                  className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-500" />
                    <span>{selectedDate}</span>
                  </div>
                </button>
                
                {/* Calendar Popup */}
                {showCalendar && (
                  <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4">
                    <div className="flex justify-between items-center mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        ←
                      </button>
                      <span className="font-medium">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
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
                      {[...Array(firstDayOfMonth(currentMonth))].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {[...Array(daysInMonth(currentMonth))].map((_, i) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedDate(formatDate(date));
                              setShowCalendar(false);
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

              {/* Time Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTimePicker(!showTimePicker);
                    setShowCalendar(false);
                  }}
                  className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>
                </button>

                {/* Time Picker Popup */}
                {showTimePicker && (
                  <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4 w-64">
                    <div className="max-h-60 overflow-y-auto">
                      {generateTimeSlots().map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setShowTimePicker(false);
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
    </section>
  );
};

export default Home;