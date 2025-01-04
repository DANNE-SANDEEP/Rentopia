import React, { useState, useEffect } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign,
  CreditCard,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "./Alert";
import Loader from "./Loader";

const StarBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`star ${
            i % 3 === 0 ? "small" : i % 3 === 1 ? "medium" : "large"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const WalletComponent = () => {
  const [balance, setBalance] = useState(2547.63);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 500,
      date: "2024-01-03",
      status: "completed",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 200,
      date: "2024-01-02",
      status: "completed",
    },
    {
      id: 3,
      type: "deposit",
      amount: 1000,
      date: "2024-01-01",
      status: "completed",
    },
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (amount > balance) {
      setError("Insufficient funds");
      return;
    }
    // Handle withdrawal logic here
    setBalance((prev) => prev - amount);
    setWithdrawAmount("");
    setShowWithdrawModal(false);
    setError("");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <style>
        {`
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            filter: blur(1px);
            opacity: 0.5;
            animation: twinkle 3s infinite;
          }
          .star.small { width: 2px; height: 2px; }
          .star.medium { width: 3px; height: 3px; }
          .star.large { width: 4px; height: 4px; }
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { opacity: 0.2; }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="md:col-span-2 profile-card rounded-xl shadow-lg p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <StarBackground />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-white" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Available Balance
                </h2>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-white">
                  ${balance.toFixed(2)}
                </p>
                <p className="text-gray-400 mt-2">Available for withdrawal</p>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <ArrowUpRight size={16} />
                  Withdraw
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2">
                  <Plus size={16} />
                  Add Money
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="text-green-500" size={20} />
                  <span className="text-gray-600">Income</span>
                </div>
                <span className="font-semibold">$1,500.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="text-red-500" size={20} />
                  <span className="text-gray-600">Withdrawals</span>
                </div>
                <span className="font-semibold">$200.00</span>
              </div>
            </div>
          </div>

          {/* Tabs and Content */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-sm">
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "transactions"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Transactions
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={20} className="text-gray-400" />
                        <h4 className="font-medium text-gray-700">Pending</h4>
                      </div>
                      <p className="text-2xl font-semibold">$0.00</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={20} className="text-gray-400" />
                        <h4 className="font-medium text-gray-700">
                          Total Earned
                        </h4>
                      </div>
                      <p className="text-2xl font-semibold">$1,500.00</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={20} className="text-gray-400" />
                        <h4 className="font-medium text-gray-700">
                          Withdrawals
                        </h4>
                      </div>
                      <p className="text-2xl font-semibold">$200.00</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {transaction.type === "deposit" ? (
                          <ArrowDownRight
                            className="text-green-500"
                            size={20}
                          />
                        ) : (
                          <ArrowUpRight className="text-red-500" size={20} />
                        )}
                        <div>
                          <p className="font-medium text-gray-700 capitalize">
                            {transaction.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Confirm Withdrawal
                </button>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
