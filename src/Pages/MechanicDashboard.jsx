import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, Star, CheckCircle, DollarSign, Award } from 'lucide-react';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

const MechanicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [alertMessage, setAlertMessage] = useState('');

  const incomeData = [
    { name: 'Week 1', amount: 1200 },
    { name: 'Week 2', amount: 1500 },
    { name: 'Week 3', amount: 1300 },
    { name: 'Week 4', amount: 1600 }
  ];

  const performanceMetrics = {
    efficiency: 92,
    customerSatisfaction: 4.8,
    taskCompletion: 95,
    qualityScore: 88
  };

  const servicePerformance = [
    { name: 'Engine Repair', value: 35 },
    { name: 'Brake Service', value: 25 },
    { name: 'Oil Change', value: 20 },
    { name: 'Tire Service', value: 20 }
  ];

  const COLORS = ['#2563eb', '#7c3aed', '#059669', '#dc2626'];

  const pendingRequests = [
    {
      id: 1,
      service: "Oil Change",
      vehicle: "Toyota Camry",
      priority: "High",
      deadline: "2025-01-05",
      status: "Pending",
      estimatedIncome: 150
    },
    {
      id: 2,
      service: "Brake Inspection",
      vehicle: "Honda Civic",
      priority: "Medium",
      deadline: "2025-01-07",
      status: "In Progress",
      estimatedIncome: 200
    }
  ];

  const recentWork = [
    {
      id: 1,
      service: "Tire Rotation",
      vehicle: "Ford F-150",
      completedDate: "2025-01-01",
      rating: 5,
      income: 180,
      feedback: "Excellent service"
    },
    {
      id: 2,
      service: "Engine Tune-up",
      vehicle: "BMW 3 Series",
      completedDate: "2024-12-30",
      rating: 4.8,
      income: 350,
      feedback: "Very professional"
    }
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Efficiency Rate</span>
                      <span>{performanceMetrics.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${performanceMetrics.efficiency}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Customer Satisfaction</span>
                      <span>{performanceMetrics.customerSatisfaction}/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(performanceMetrics.customerSatisfaction/5)*100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Task Completion Rate</span>
                      <span>{performanceMetrics.taskCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${performanceMetrics.taskCompletion}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Service Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={servicePerformance}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {servicePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {servicePerformance.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Income Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={incomeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" name="Income ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'pending requests':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-4">Service</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Est. Income</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request.id} className="border-t">
                    <td className="p-4">{request.service}</td>
                    <td className="p-4">{request.vehicle}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        request.priority === 'High' ? 'bg-red-100 text-red-700' :
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="p-4">{request.deadline}</td>
                    <td className="p-4">${request.estimatedIncome}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        request.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'completed work':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-4">Service</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Completion Date</th>
                  <th className="p-4">Income</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {recentWork.map((work) => (
                  <tr key={work.id} className="border-t">
                    <td className="p-4">{work.service}</td>
                    <td className="p-4">{work.vehicle}</td>
                    <td className="p-4">{work.completedDate}</td>
                    <td className="p-4">${work.income}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {work.rating}
                      </div>
                    </td>
                    <td className="p-4">{work.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-[1440px] mx-auto">
        {alertMessage && (
          <Alert className="mb-4 bg-green-50 border border-green-200 text-green-700">
            {alertMessage}
          </Alert>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Mechanic Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Doe</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:cursor-pointer">
            <DollarSign className="w-6 h-6 text-green-600 mb-1" />
            <p className="text-sm text-gray-600">Money in Wallet</p>
            <p className="text-xl font-bold">$5,600</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-gray-600">Completed Tasks</p>
            <p className="text-2xl font-bold">51</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Clock className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-gray-600">Pending Requests</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Award className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-600">Quality Score</p>
            <p className="text-2xl font-bold">88%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Star className="w-6 h-6 text-yellow-500 mb-2" />
            <p className="text-gray-600">Rating</p>
            <p className="text-2xl font-bold">4.8/5.0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {['overview', 'pending requests', 'completed work'].map((tab) => (
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
            {renderActiveTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;