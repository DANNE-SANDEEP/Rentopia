import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-auto space-y-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center space-y-3">
          <h1 className="text-4xl tracking-tight">
            Rentopia
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Please login to start earning
          </p>
          <div className="h-1 w-20 bg-black mx-auto rounded-full mt-4"></div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-black text-white py-3.5 px-4 rounded-xl font-medium 
                       hover:bg-gray-800 transition-all duration-300 
                       flex items-center justify-center gap-3
                       transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>

            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-white text-black py-3.5 px-4 rounded-xl font-medium 
                       border-2 border-gray-200 hover:border-black
                       transition-all duration-300 
                       flex items-center justify-center gap-3
                       transform hover:-translate-y-0.5"
            >
              Signup
            </button>
          </div>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Protected by Rentopia</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;