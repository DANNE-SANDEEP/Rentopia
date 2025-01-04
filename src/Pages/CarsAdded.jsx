import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import Loader from '../Components/Loader';

const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'default', type = 'button' }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2";
  const variants = {
    default: "bg-black text-white hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1",
    destructive: "text-red-600 hover:text-white hover:bg-red-600 border border-red-600"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-gray-800 relative animate-fade-in">
        {children}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

const CarsAdded = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [cars, setCars] = useState([
    { 
      id: 1, 
      name: "BMW X5", 
      date: "2024-01-01", 
      status: "Pending",
      imageUrl: "https://imgs.search.brave.com/Jkl2cUFj0byi9P_UNNoQEiXr6jgfmQivdCsmk7MvE3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IzLzIwMTlfQk1X/X1g1X3hEcml2ZTMw/ZF9NX1Nwb3J0X0F1/dG9tYXRpY18zLjBf/RnJvbnQuanBn"
    },
    { 
      id: 2, 
      name: "Audi Q7", 
      date: "2024-01-02", 
      status: "Approved",
      imageUrl: "https://imgs.search.brave.com/astSYyKyssyKqiIJ1zyXpaS2nsOvUfjhk4r7N3Q658A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmF1ZGktbWVk/aWFjZW50ZXIuY29t/L3N5c3RlbS9wcm9k/dWN0aW9uL21lZGlh/LzgxNzc3L2ltYWdl/cy9kZWRlYmQzOTQw/MDM3NzU1YmYyYmYy/MTE4Nzc3YWNhMGI0/NTFjZmRmL0ExOTk2/NjBfd2ViXzI4ODAu/anBnPzE2OTgzODM0/MzU"
    },
  ]);

  const [newCar, setNewCar] = useState({
    name: "",
    status: "Pending",
    imageUrl: "/api/placeholder/400/300"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCar.name.trim()) {
      const currentDate = new Date().toISOString().split('T')[0];
      setCars([...cars, {
        id: cars.length + 1,
        name: newCar.name,
        date: currentDate,
        status: newCar.status,
        imageUrl: newCar.imageUrl || "/api/placeholder/400/300"
      }]);
      setNewCar({ name: "", status: "Pending", imageUrl: "/api/placeholder/400/300" });
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen text-gray-800 max-w-[1480px] mx-auto">
      <div className="container mx-auto p-4">
        <div 
          className="flex justify-between items-center mb-6 pb-4"
          style={{ animation: 'fadeSlideIn 0.5s ease-out' }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">Cars Added</h1>
          <Button onClick={() => setIsModalOpen(true)} className="text-sm sm:text-base">
            <Plus size={20} />
            Add Car
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cars.map((car, index) => (
            <Card 
              key={car.id} 
              className="overflow-hidden"
              style={{ 
                animation: 'fadeSlideIn 0.5s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative h-40 sm:h-48 bg-gray-200">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                <p className="text-gray-600 text-sm">Date Added: {car.date}</p>
                <p className="text-gray-600 text-sm">Status: 
                  <span className={`ml-2 font-medium ${
                    car.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {car.status}
                  </span>
                </p>
              </div>
              <div className="px-4 pb-4 flex justify-end">
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(car.id)}
                  className="text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {cars.length === 0 && (
          <div 
            className="text-center py-12"
            style={{ animation: 'fadeSlideIn 0.5s ease-out' }}
          >
            <p className="text-gray-600 text-xl">No cars added yet</p>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Add New Car</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Name
              </label>
              <input
                type="text"
                value={newCar.name}
                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                placeholder="Enter car name"
                className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={newCar.imageUrl}
                onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
                placeholder="Enter image URL"
                className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Car
            </Button>
          </form>
        </Modal>

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
    </div>
  );
};

export default CarsAdded;