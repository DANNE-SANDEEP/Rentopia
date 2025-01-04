import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Car, 
  Bike, 
  Calendar, 
  IndianRupee, 
  Store, 
  Users, 
  Fuel, 
  Gauge,
  SlidersHorizontal
} from 'lucide-react';
import Loader from '../Components/Loader';

const AvailableCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedShop, setSelectedShop] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load vehicles. Please try again later.');
      setIsLoading(false);
    }
  };
  
  // Add this effect to simulate initial loading
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);

  const filterCars = (cars) => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || car.type === selectedType;
      const matchesShop = selectedShop === 'all' || car.shop === selectedShop;
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'under2000' && car.price < 2000) ||
                          (priceRange === '2000-3000' && car.price >= 2000 && car.price <= 3000) ||
                          (priceRange === 'above3000' && car.price > 3000);
      
      return matchesSearch && matchesType && matchesShop && matchesPrice;
    });
  };

  const filteredCars = filterCars(cars);

  // Add this at the very beginning of your return statement
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" min-h-screen max-w-[1480px] mx-auto text-gray-800 p-4">
      <div className="container mx-auto">
        {/* Header with slide-in animation */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <div 
            className="cursor-pointer transform transition-transform duration-300 hover:rotate-180"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            <SlidersHorizontal className="text-black" size={24} />
          </div>
          <h1 className="text-3xl font-bold">Available Vehicles</h1>
        </div>

        {/* Search and Filters with slide animation */}
        <div className={` md:space-y-4 transition-all duration-500 ease-in-out overflow-hidden ${isFiltersVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-4 md:h-24 w-full">
            <div className="relative flex-1 mt-2 ml-1 md:mr-0 mr-2">
              <Search className="absolute left-3 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by vehicle name or location..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-gray-800 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 hover:bg-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex md:gap-4 gap-2 md:mt-2">
              <div className="relative">
                <select
                  className="bg-gray-100 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-black focus:outline-none appearance-none transition-all duration-300 hover:bg-gray-200"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Bike">Bike</option>
                </select>
                <Car className="absolute left-2 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <select
                  className="bg-gray-100 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-black focus:outline-none appearance-none transition-all duration-300 hover:bg-gray-200"
                  value={selectedShop}
                  onChange={(e) => setSelectedShop(e.target.value)}
                >
                  <option value="all">All Shops</option>
                  <option value="New Milan">New Milan</option>
                  <option value="Royal Cars">Royal Cars</option>
                  <option value="Bike Hub">Bike Hub</option>
                  <option value="Speed Motors">Speed Motors</option>
                </select>
                <Store className="absolute left-2 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="relative md:mr-2">
                <select
                  className="bg-gray-100 rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-black focus:outline-none appearance-none transition-all duration-300 hover:bg-gray-200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="under2000">Under ₹2000/day</option>
                  <option value="2000-3000">₹2000-₹3000/day</option>
                  <option value="above3000">Above ₹3000/day</option>
                </select>
                <IndianRupee className="absolute left-2 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count with fade animation */}
        <div className="flex items-center gap-2 text-gray-600 mb-4 transition-opacity duration-300">
          <Filter size={16} />
          <p>Showing {filteredCars.length} vehicles</p>
        </div>

        {/* Vehicle Grid with stagger effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className="bg-white rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative overflow-hidden bg-gray-200">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {vehicle.type === 'Bike' ? 
                      <Bike className="text-black transition-transform duration-300 hover:rotate-12" size={20} /> : 
                      <Car className="text-black transition-transform duration-300 hover:rotate-12" size={20} />
                    }
                    <h2 className="text-xl font-bold">{vehicle.name}</h2>
                  </div>
                  <div className="flex items-center text-black font-bold">
                    <IndianRupee size={16} />
                    <span>{vehicle.price}/day</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <p className="text-sm">{vehicle.location}</p>
                </div>

                <div className="flex gap-4 text-gray-600 text-sm mb-3">
                  <div className="flex items-center gap-1 transition-colors duration-300 hover:text-black">
                    <Calendar size={14} />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1 transition-colors duration-300 hover:text-black">
                    <Users size={14} />
                    <span>{vehicle.features[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 transition-colors duration-300 hover:text-black">
                    <Fuel size={14} />
                    <span>{vehicle.features[1]}</span>
                  </div>
                  <div className="flex items-center gap-1 transition-colors duration-300 hover:text-black">
                    <Gauge size={14} />
                    <span>{vehicle.features[2]}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-600 text-xl">No vehicles found matching your criteria</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AvailableCars;