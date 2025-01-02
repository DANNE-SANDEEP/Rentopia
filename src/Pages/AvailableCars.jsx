import React, { useState } from 'react';
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

const AvailableCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedShop, setSelectedShop] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const cars = [
    {
      id: 1,
      name: "Toyota Fortuner",
      type: "SUV",
      year: 2022,
      price: 4000,
      location: "New Milan Shop, Phagwara",
      shop: "New Milan",
      features: ["7 Seater", "Diesel", "Automatic"],
      image: "https://imgs.search.brave.com/KuVDaOniPTByVmct5Ml4Pdjlzl7UW2NFUQ-Ua6DlSAw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4ub3RvLmNvbS5z/Zy9sYXJnZS9nYWxs/ZXJ5L2NvbG9yLzEv/MTQvdG95b3RhLWZv/cnR1bmVyLWNvbG9y/LTcyODY0Mi5qcGc"
    },
    {
      id: 2,
      name: "Mahindra Thar",
      type: "SUV",
      year: 2023,
      price: 3500,
      location: "Royal Cars, Phagwara",
      shop: "Royal Cars",
      features: ["4 Seater", "Diesel", "Manual"],
      image: "https://imgs.search.brave.com/TzP_t2802cFOOMCyniczMrWnwtdN8mlSPHAyNEqaMUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY2FyYW5kYmlr/ZS5jb20vY2FyLWlt/YWdlcy9nYWxsZXJ5/L21haGluZHJhL3Ro/YXIvZXh0ZXJpb3Iv/bWFoaW5kcmEtdGhh/ci5qcGc_dj0yMDI0/LTA3LTA1"
    },
    {
      id: 3,
      name: "Royal Enfield Classic 350",
      type: "Bike",
      year: 2023,
      price: 1500,
      location: "Bike Hub, Phagwara",
      shop: "Bike Hub",
      features: ["2 Seater", "Petrol", "Manual"],
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      name: "Honda City",
      type: "Sedan",
      year: 2022,
      price: 2500,
      location: "New Milan Shop, Phagwara",
      shop: "New Milan",
      features: ["5 Seater", "Petrol", "Automatic"],
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      name: "KTM Duke 250",
      type: "Bike",
      year: 2023,
      price: 1800,
      location: "Speed Motors, Phagwara",
      shop: "Speed Motors",
      features: ["2 Seater", "Petrol", "Manual"],
      image: "/api/placeholder/400/300"
    },
  ];

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
        <div className={`mb-8 md:space-y-4 transition-all duration-500 ease-in-out overflow-hidden ${isFiltersVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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