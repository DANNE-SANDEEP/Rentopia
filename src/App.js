import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
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
import Wallet from './Components/Wallet';
import MyBookingsComponent from './Components/MyBookings';
import SettingsComponent from './Components/SettingsComponent';
import PageNotFound from './Pages/PageNotFound';
import AboutUs from './Pages/AboutUs';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/available-cars" element={<AvailableCars />} />
            <Route path="/cars-added" element={<CarsAdded />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/help" element={<Help />}/>
            <Route path='/dashboard' element={<DashBoard />}/>
            <Route path='/mdashboard' element={<ManagerDashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/settings' element={<SettingsComponent />} />
            <Route path='/bookings' element={<MyBookingsComponent />} />
            <Route path='/medashboard' element={<MechanicDashboard />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;