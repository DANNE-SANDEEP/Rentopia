import React from 'react';
import { User, Lock, Bell, CreditCard, Shield, HelpCircle, ChevronRight} from 'lucide-react';

const SettingSection = ({ icon, title, description, onClick }) => (
  <div 
    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="mr-4 text-gray-500">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <ChevronRight className="text-gray-400" />
  </div>
);

const SettingsComponent = () => {

  return (
    <div className={'min-h-screen py-12'}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-black">Settings</h1>

        <div className="space-y-4">
          <SettingSection
            icon={<User size={24} />}
            title="Account"
            description="Manage your account details and preferences"
            onClick={() => console.log('Navigate to Account settings')}
          />

          <SettingSection
            icon={<Lock size={24} />}
            title="Security"
            description="Update your password and security settings"
            onClick={() => console.log('Navigate to Security settings')}
          />

          <SettingSection
            icon={<Shield size={24} />}
            title="Privacy"
            description="Control your data and privacy preferences"
            onClick={() => console.log('Navigate to Privacy settings')}s
          />

          <SettingSection
            icon={<Bell size={24} />}
            title="Notifications"
            description="Manage your email and push notifications"
            onClick={() => console.log('Navigate to Notification settings')}
          />

          <SettingSection
            icon={<CreditCard size={24} />}
            title="Payment Methods"
            description="Add or remove payment methods"
            onClick={() => console.log('Navigate to Payment settings')}
          />

          <SettingSection
            icon={<HelpCircle size={24} />}
            title="Help & Support"
            description="Get help or contact our support team"
            onClick={() => console.log('Navigate to Help & Support')}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;