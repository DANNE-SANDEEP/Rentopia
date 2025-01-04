import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';  // Add this import
import Home from './Pages/Home';
import AvailableCars from './Pages/AvailableCars';
import CarsAdded from './Pages/CarsAdded';
import Auth from './Pages/Auth';
import Help from './Pages/Help';
import DashBoard from './Pages/DashBoard';
import ManagerDashboard from './Pages/ManagerDashboard';
import MechanicDashboard from './Pages/MechanicDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import Profile from './Components/Profile';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/available-cars" element={<AvailableCars />} />
            <Route path="/cars-added" element={<CarsAdded />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/help" element={<Help />}/>
            <Route path='/dashboard' element={<DashBoard />}/>
            <Route path='/mdashboard' element={<ManagerDashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/medashboard' element={<MechanicDashboard />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;