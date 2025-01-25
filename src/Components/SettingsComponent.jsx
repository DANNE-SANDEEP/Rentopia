import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  X,
} from "lucide-react";

const EditPanel = ({ option, category, onClose }) => {
  return (
    <div className="bg-white h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{option.title}</h2>
          <p className="text-gray-500">{option.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Example form - customize based on the option type */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Setting Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter setting value"
          />
        </div>
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SettingsComponent = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const settingsCategories = [
    {
      title: "Account",
      icon: User,
      description: "Manage your profile and preferences",
      options: [
        {
          title: "Profile Information",
          description: "Update your personal details",
          action: () => console.log("Navigate to Profile"),
        },
        {
          title: "Email Settings",
          description: "Manage your email preferences",
          action: () => console.log("Navigate to Email Settings"),
        },
        {
          title: "Language Preferences",
          description: "Change your language settings",
          action: () => console.log("Navigate to Language"),
        },
      ],
    },
    {
      title: "Security",
      icon: Lock,
      description: "Protect your account",
      options: [
        {
          title: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          action: () => console.log("Navigate to 2FA"),
        },
        {
          title: "Change Password",
          description: "Update your password",
          action: () => console.log("Navigate to Password"),
        },
        {
          title: "Login History",
          description: "Review your account activity",
          action: () => console.log("Navigate to Login History"),
        },
      ],
    },
    {
      title: "Privacy",
      icon: Shield,
      description: "Control your data settings",
      options: [
        {
          title: "Privacy Settings",
          description: "Manage your privacy preferences",
          action: () => console.log("Navigate to Privacy Settings"),
        },
        {
          title: "Data Usage",
          description: "Control how your data is used",
          action: () => console.log("Navigate to Data Usage"),
        },
        {
          title: "Cookie Preferences",
          description: "Manage cookie settings",
          action: () => console.log("Navigate to Cookies"),
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Customize your alerts",
      options: [
        {
          title: "Email Notifications",
          description: "Manage email alerts",
          action: () => console.log("Navigate to Email Notifications"),
        },
        {
          title: "Push Notifications",
          description: "Control push alerts",
          action: () => console.log("Navigate to Push Notifications"),
        },
        {
          title: "In-App Notifications",
          description: "Adjust in-app alerts",
          action: () => console.log("Navigate to In-App Notifications"),
        },
      ],
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      description: "Manage your payment options",
      options: [
        {
          title: "Add Payment Method",
          description: "Add a new payment method",
          action: () => console.log("Navigate to Add Payment"),
        },
        {
          title: "Manage Cards",
          description: "View and edit saved cards",
          action: () => console.log("Navigate to Manage Cards"),
        },
        {
          title: "Billing History",
          description: "View past transactions",
          action: () => console.log("Navigate to Billing"),
        },
      ],
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      description: "Get assistance",
      options: [
        {
          title: "FAQs",
          description: "View common questions",
          action: () => console.log("Navigate to FAQs"),
        },
        {
          title: "Contact Support",
          description: "Get in touch with our team",
          action: () => console.log("Navigate to Contact"),
        },
        {
          title: "Documentation",
          description: "View user guides",
          action: () => console.log("Navigate to Docs"),
        },
      ],
    },
  ];

  const handleOptionClick = (category, option) => {
    setActiveOption(option);
    setActiveCategory(category);
  };

  const handlePanelClose = () => {
    setActiveOption(null);
    setActiveCategory(null);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 relative overflow-hidden">
      <div
        className={`max-w-3xl mx-auto px-4 transition-transform duration-500 ${
          activeOption ? "-translate-x-16 opacity-90" : "translate-x-0"
        }`}
      >
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your account preferences and settings
        </p>

        <div className="space-y-4">
          {settingsCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <button
                className="w-full flex items-center justify-between p-6"
                onClick={() =>
                  setExpandedCategory(expandedCategory === index ? null : index)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <category.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="transform transition-transform duration-200">
                  {expandedCategory === index ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </div>
              </button>

              <div
                className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  expandedCategory === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
              >
                <div className="border-t border-gray-100">
                  {category.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      onClick={() => handleOptionClick(category, option)}
                      className="group px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-in-out"
                    >
                      <div className="pl-12 flex items-center justify-between transform transition-transform duration-200 group-hover:translate-x-2">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {option.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sliding Panel */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-500 ease-in-out
        ${activeOption ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {activeOption && (
          <EditPanel
            option={activeOption}
            category={activeCategory}
            onClose={handlePanelClose}
          />
        )}
      </div>
    </section>
  );
};

export default SettingsComponent;
