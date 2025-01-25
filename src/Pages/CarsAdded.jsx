import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, ChevronLeft, ChevronRight, Upload, AlertCircle } from 'lucide-react';

import Loader from '../Components/Loader';

import LoginPrompt from "../Components/LoginPrompt";

const Card = ({ children, className = '' }) => (
  <div className={`hover:shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', disabled = false }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2';
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed',
    destructive: 'text-red-600 hover:text-white hover:bg-red-600 border border-red-600',
    outline: 'border border-gray-300 hover:bg-gray-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full text-gray-800 relative animate-fade-in max-h-[90vh] overflow-y-auto">
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

const FileUploadCard = ({ label, onChange, required = false, accept, description }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
    <label className="flex flex-col items-center cursor-pointer space-y-2">
      <Upload className="w-8 h-8 text-gray-400" />
      <span className="font-medium text-gray-700">{label} {required && <span className="text-red-500">*</span>}</span>
      <span className="text-sm text-gray-500">{description}</span>
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        required={required}
        className="hidden"
      />
    </label>
  </div>
);

const InputField = ({ label, type = "text", value, onChange, placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
    />
  </div>
);

const AddCarForm = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Required Documents
    registrationCertificate: null,
    insuranceDocument: null,
    rcBook: null,
    ownerIdProof: null,
    rentalAgreement: null,
    
    // Vehicle Details
    make: '',
    model: '',
    year: '',
    color: '',
    registrationNumber: '',
    
    // Insurance Details
    insurancePolicy: '',
    insuranceExpiry: '',
    
    // Rental Terms
    rentalPrice: '',
    securityDeposit: '',
    maxDistance: '',
    
    // Additional Details
    fuelPolicy: '',
    restrictions: '',
    accessories: ''
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'file' 
      ? e.target.files[0] 
      : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
                <p className="text-sm text-blue-700">
                  Please upload all required documents to proceed. Make sure all documents are clear and valid.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                label="Registration Certificate"
                onChange={handleChange('registrationCertificate')}
                required
                accept=".pdf,.jpg,.jpeg,.png"
                description="Upload RC in PDF or image format"
              />
              <FileUploadCard
                label="Insurance Document"
                onChange={handleChange('insuranceDocument')}
                required
                accept=".pdf,.jpg,.jpeg,.png"
                description="Valid insurance policy document"
              />
              <FileUploadCard
                label="RC Book"
                onChange={handleChange('rcBook')}
                required
                accept=".pdf,.jpg,.jpeg,.png"
                description="Complete RC book with all pages"
              />
              <FileUploadCard
                label="Owner ID Proof"
                onChange={handleChange('ownerIdProof')}
                required
                accept=".pdf,.jpg,.jpeg,.png"
                description="Driving License/Passport/Aadhaar"
              />
              <FileUploadCard
                label="Rental Agreement"
                onChange={handleChange('rentalAgreement')}
                required
                accept=".pdf"
                description="Signed rental agreement document"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Make"
                value={formData.make}
                onChange={handleChange('make')}
                required
                placeholder="e.g., Toyota"
              />
              <InputField
                label="Model"
                value={formData.model}
                onChange={handleChange('model')}
                required
                placeholder="e.g., Camry"
              />
              <InputField
                label="Year"
                type="number"
                value={formData.year}
                onChange={handleChange('year')}
                required
                placeholder="e.g., 2022"
              />
              <InputField
                label="Color"
                value={formData.color}
                onChange={handleChange('color')}
                required
                placeholder="e.g., Silver"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange('registrationNumber')}
                required
                placeholder="e.g., KA01AB1234"
              />
              <InputField
                label="Insurance Policy Number"
                value={formData.insurancePolicy}
                onChange={handleChange('insurancePolicy')}
                required
                placeholder="e.g., POL123456789"
              />
              <InputField
                label="Insurance Expiry Date"
                type="date"
                value={formData.insuranceExpiry}
                onChange={handleChange('insuranceExpiry')}
                required
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Rental Price (per day)"
                type="number"
                value={formData.rentalPrice}
                onChange={handleChange('rentalPrice')}
                required
                placeholder="e.g., 2000"
              />
              <InputField
                label="Security Deposit"
                type="number"
                value={formData.securityDeposit}
                onChange={handleChange('securityDeposit')}
                required
                placeholder="e.g., 10000"
              />
              <InputField
                label="Maximum Distance (km/day)"
                type="number"
                value={formData.maxDistance}
                onChange={handleChange('maxDistance')}
                required
                placeholder="e.g., 200"
              />
              <InputField
                label="Fuel Policy"
                value={formData.fuelPolicy}
                onChange={handleChange('fuelPolicy')}
                required
                placeholder="e.g., Full to Full"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const totalSteps = 4;
  const stepTitles = [
    "Required Documents",
    "Vehicle Information",
    "Registration & Insurance",
    "Rental Terms"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Car - {stepTitles[step - 1]}</h2>
          <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between pt-6 border-t">
        <Button
          onClick={() => setStep(prev => prev - 1)}
          variant="outline"
          disabled={step === 1}
        >
          <ChevronLeft size={20} />
          Previous
        </Button>
        
        {step < totalSteps ? (
          <Button onClick={() => setStep(prev => prev + 1)} type="button">
            Next
            <ChevronRight size={20} />
          </Button>
        ) : (
          <Button type="submit">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

const CarsAdded = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleAdd = (formData) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newCarData = {
      id: cars.length + 1,
      name: `${formData.make} ${formData.model}`,
      date: currentDate,
      status: 'Pending',
      details: formData
    };
    
    setCars([...cars, newCarData]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  if (isLoading) return <Loader />;
  if (!isLoggedIn) return <LoginPrompt />;

  return (
    <div className="min-h-screen text-gray-800 max-w-[1480px] mx-auto">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Cars Added</h1>
          <Button onClick={() => setIsModalOpen(true)} className="text-sm sm:text-base">
            <Plus size={20} />
            Add Car
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                <p className="text-gray-600 text-sm">Date Added: {car.date}</p>
                <p className="text-gray-600 text-sm">
                  Status:{' '}
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
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No cars added yet</p>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddCarForm 
            onSubmit={handleAdd}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CarsAdded;