import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import AvailableCars from './Pages/AvailableCars';
import CarsAdded from './Pages/CarsAdded';
import Auth from './Pages/Auth';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/available-cars" element={<AvailableCars />} />
          <Route path="/cars-added" element={<CarsAdded />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;