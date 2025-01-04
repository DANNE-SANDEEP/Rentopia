import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  UserPlus,
  Settings,
  DollarSign,
  TrendingUp,
  User,
  Trash2,
  Search,
  Clock,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import Loader from '../Components/Loader';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>{children}</div>
);

const AdminMessages = ({ onMessageCountChange }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/contacts");
      setMessages(response.data);
      onMessageCountChange(response.data.length);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [onMessageCountChange]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contacts/${id}`);
      fetchMessages();
    } catch (error) {
      setError("Failed to delete message");
    }
  };

  if (loading)
    return <div className="text-center p-4">Loading messages...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="bg-white p-4 pb-10 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Contact Messages</h3>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{message.name}</p>
                  <p className="text-sm text-gray-500">({message.email})</p>
                </div>
                <p className="text-gray-700">{message.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.submittedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(message._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                title="Delete message"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-500">No messages found</p>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddManagerForm, setShowAddManagerForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalManagers, setTotalManagers] = useState(0);

  
  // Add this effect to simulate initial loading
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);

  const [newManager, setNewManager] = useState({
    email: "",
    branch: "",
    password: "",
    reEnterPassword: "",
    mechanics: 0,
    completedTasks: 0,
    rating: 0,
  });

  const revenueData = [
    { name: "Week 1", weekly: 15000, monthly: 65000, yearly: 780000 },
    { name: "Week 2", weekly: 18000, monthly: 72000, yearly: 820000 },
    { name: "Week 3", weekly: 16500, monthly: 68000, yearly: 795000 },
    { name: "Week 4", weekly: 19000, monthly: 75000, yearly: 850000 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "task",
      message: "New repair task assigned to Downtown branch",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "alert",
      message: "Inventory running low on brake pads",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "task",
      message: "Monthly maintenance completed for Fleet #123",
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "alert",
      message: "Urgent: Equipment maintenance required",
      time: "6 hours ago",
    },
  ];

  const pendingTasks = [
    { id: 1, task: "Vehicle Inspection", priority: "High", deadline: "Today" },
    { id: 2, task: "Oil Change", priority: "Medium", deadline: "Tomorrow" },
    { id: 3, task: "Brake Replacement", priority: "High", deadline: "Today" },
  ];

  const handleDeleteManager = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/managers/${id}`);
      await fetchManagers(); // Wait for the managers to be fetched
      setAlertMessage("Manager deleted successfully");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Failed to delete manager:", error);
      setAlertMessage("Failed to delete manager");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchManagers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/managers");
      setManagers(response.data);
      setTotalManagers(response.data.length); // Set the total count
    } catch (error) {
      console.error("Failed to fetch managers:", error);
      setAlertMessage("Failed to fetch managers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleAddManager = async (e) => {
    e.preventDefault();

    if (newManager.password !== newManager.reEnterPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:3001/api/managers", {
        email: newManager.email,
        branch: newManager.branch,
        password: newManager.password,
        mechanics: 0,
        completedTasks: 0,
        rating: 0,
      });

      await fetchManagers(); // Wait for the managers to be fetched
      setAlertMessage("Manager added successfully");
      setShowAddManagerForm(false);
      setNewManager({
        email: "",
        branch: "",
        password: "",
        reEnterPassword: "",
        mechanics: 0,
        completedTasks: 0,
        rating: 0,
      });
    } catch (error) {
      console.error("Failed to add manager:", error);
      setAlertMessage("Failed to add manager");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => setAlertMessage(""), 3000);
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                {activity.type === "alert" ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-500 mt-1" />
                )}
                <div>
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Pending Tasks</h3>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">{task.task}</p>
                  <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weekly"
                stroke="#2563eb"
                name="Weekly"
              />
              <Line
                type="monotone"
                dataKey="monthly"
                stroke="#7c3aed"
                name="Monthly"
              />
              <Line
                type="monotone"
                dataKey="yearly"
                stroke="#059669"
                name="Yearly"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Branch Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={managers}>
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="completedTasks"
                fill="#2563eb"
                name="Completed Tasks"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderManagersSection = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button
          onClick={() => setShowAddManagerForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Manager
        </button>
      </div>

      {managers.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No managers found</p>
          <p className="text-gray-400 mt-2">Click the 'Add Manager' button to add a new manager</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4">Email</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Mechanics</th>
                <th className="p-4">Completed Tasks</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers
                .filter(manager => 
                  manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  manager.branch.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((manager) => (
                  <tr key={manager._id} className="border-t">
                    <td className="p-4">{manager.email}</td>
                    <td className="p-4">{manager.branch}</td>
                    <td className="p-4">{manager.mechanics}</td>
                    <td className="p-4">{manager.completedTasks}</td>
                    <td className="p-4">{manager.rating.toFixed(1)} / 5.0</td>
                    <td className="p-4">
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        onClick={() => handleDeleteManager(manager._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Customer Satisfaction</h3>
          <div className="text-3xl font-bold text-green-600">92%</div>
          <p className="text-sm text-gray-600">Based on recent surveys</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Average Repair Time</h3>
          <div className="text-3xl font-bold text-blue-600">2.5 hrs</div>
          <p className="text-sm text-gray-600">Across all branches</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Service Efficiency</h3>
          <div className="text-3xl font-bold text-purple-600">87%</div>
          <p className="text-sm text-gray-600">Tasks completed on time</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          {[
            "Customer Retention",
            "First-Time Fix Rate",
            "Parts Availability",
          ].map((metric) => (
            <div key={metric} className="flex items-center justify-between">
              <span className="text-gray-600">{metric}</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Add this at the very beginning of your return statement
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-[1440px] mx-auto">
        {alertMessage && (
          <Alert className="mb-4 bg-green-50 border border-green-200 text-green-700">
            {alertMessage}
          </Alert>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <DollarSign className="w-6 h-6 text-green-600 mb-1" />
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold">$850,000</p>
            </div>
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <MessageCircle className="w-6 h-6 text-blue-600 mb-1" />
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-xl font-bold">{messageCount}</p>
            </button>
          </div>
        </div>

        {showMessages && (
          <AdminMessages onMessageCountChange={setMessageCount} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-600">Total Managers</p>
            <p className="text-2xl font-bold">{totalManagers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Settings className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-gray-600">Total Mechanics</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-gray-600">Growth Rate</p>
            <p className="text-2xl font-bold">15%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <User className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-gray-600">Active Users</p>
            <p className="text-2xl font-bold">2.5K</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {["overview", "managers", "analytics"].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-2 capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && renderOverviewSection()}
            {activeTab === "managers" && renderManagersSection()}
            {activeTab === "analytics" && renderAnalyticsSection()}
          </div>
        </div>

        {showAddManagerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Manager</h3>
              <form onSubmit={handleAddManager} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newManager.email}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter email"
                  />
                </div>
                {/* Branch Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={newManager.branch}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        branch: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter branch"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newManager.password}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter password"
                  />
                </div>

                {/* Re-enter Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    value={newManager.reEnterPassword}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        reEnterPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Re-enter password"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddManagerForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Manager
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
