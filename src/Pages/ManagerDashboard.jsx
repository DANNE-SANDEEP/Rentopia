import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Wallet, Car, Settings, AlertCircle, CheckCircle, Plus, Trash2, Search } from 'lucide-react';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMechanicForm, setShowAddMechanicForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const [newMechanic, setNewMechanic] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: ''
  });

  // Sample data
  const monthlyData = [
    { name: 'Jan', orders: 65, revenue: 12400 },
    { name: 'Feb', orders: 78, revenue: 15600 },
    { name: 'Mar', orders: 92, revenue: 18400 },
    { name: 'Apr', orders: 85, revenue: 17000 }
  ];

  const vehicleRequests = [
    { id: 1, owner: "John Doe", vehicle: "Toyota Camry 2020", status: "pending", date: "2024-01-15" },
    { id: 2, owner: "Jane Smith", vehicle: "Honda Civic 2021", status: "pending", date: "2024-01-16" }
  ];

  const mechanics = [
    { id: 1, name: "Mike Ross", specialization: "Engine Expert", completedTasks: 45, rating: 4.8, status: "active" },
    { id: 2, name: "Sarah Lee", specialization: "Electrical Systems", completedTasks: 38, rating: 4.9, status: "active" }
  ];

  const tasks = [
    { id: 1, mechanic: "Mike Ross", vehicle: "BMW X5", task: "Inspection", status: "assigned", priority: "high" },
    { id: 2, mechanic: "Sarah Lee", vehicle: "Audi A4", task: "Maintenance", status: "completed", priority: "medium" }
  ];

  const handleAddMechanic = (e) => {
    e.preventDefault();
    setAlertMessage('Mechanic added successfully');
    setShowAddMechanicForm(false);
    setNewMechanic({ name: '', email: '', phone: '', specialization: '', experience: '' });
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleRemoveMechanic = (mechanicId) => {
    setAlertMessage('Mechanic removed successfully');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-[1440px] mx-auto">
        {alertMessage && (
          <Alert className="mb-4 bg-green-50 border border-green-200 text-green-700">
            {alertMessage}
          </Alert>
        )}

        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:cursor-pointer">
            <Wallet className="w-6 h-6 text-green-600 mb-1" />
            <p className="text-sm text-gray-600">Money in wallet</p>
            <p className="text-xl font-bold">₹24,500</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Car className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-600">Total Vehicles</p>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Settings className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-gray-600">Mechanics</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <AlertCircle className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="text-gray-600">Pending</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-gray-600">Completed</p>
            <p className="text-2xl font-bold">342</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Monthly Orders</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {['overview', 'mechanics', 'tasks'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-2 capitalize ${
                    activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Search and Add Button */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {activeTab === 'mechanics' && (
                <button
                  onClick={() => setShowAddMechanicForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mechanic
                </button>
              )}
            </div>

            {/* Add Mechanic Modal */}
            {showAddMechanicForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">Add New Mechanic</h3>
                  <form onSubmit={handleAddMechanic} className="space-y-4">
                    {Object.keys(newMechanic).map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field}
                        </label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={newMechanic[field]}
                          onChange={(e) => setNewMechanic({...newMechanic, [field]: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                    ))}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddMechanicForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add Mechanic
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Tables */}
            <div className="overflow-x-auto">
              {activeTab === 'overview' && (
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="p-4">Owner</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleRequests.map((request) => (
                      <tr key={request.id} className="border-t">
                        <td className="p-4">{request.owner}</td>
                        <td className="p-4">{request.vehicle}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            {request.status}
                          </span>
                        </td>
                        <td className="p-4">{request.date}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'mechanics' && (
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="p-4">Name</th>
                      <th className="p-4">Specialization</th>
                      <th className="p-4">Tasks</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mechanics.map((mechanic) => (
                      <tr key={mechanic.id} className="border-t">
                        <td className="p-4">{mechanic.name}</td>
                        <td className="p-4">{mechanic.specialization}</td>
                        <td className="p-4">{mechanic.completedTasks}</td>
                        <td className="p-4">{mechanic.rating} / 5.0</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            mechanic.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {mechanic.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRemoveMechanic(mechanic.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'tasks' && (
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="p-4">Mechanic</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Task</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="border-t">
                        <td className="p-4">{task.mechanic}</td>
                        <td className="p-4">{task.vehicle}</td>
                        <td className="p-4">{task.task}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-800'                             : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Mark as Completed
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManagerDashboard;  