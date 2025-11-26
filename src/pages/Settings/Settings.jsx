import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { getTraccarConfig, saveTraccarConfig } from '../../services/traccarService';

const { FiSettings, FiUser, FiBell, FiLock, FiGlobe, FiDollarSign, FiMail, FiSave, FiMapPin } = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'security', name: 'Security', icon: FiLock },
    { id: 'company', name: 'Company', icon: FiGlobe },
    { id: 'gps', name: 'Integrations', icon: FiMapPin }, // Renamed from Billing for simplicity in demo or added as new
    { id: 'billing', name: 'Billing', icon: FiDollarSign },
  ];

  // --- Traccar Settings State ---
  const [traccarUrl, setTraccarUrl] = useState('');
  const [traccarUser, setTraccarUser] = useState('');
  const [traccarPass, setTraccarPass] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const config = getTraccarConfig();
    if (config) {
      setTraccarUrl(config.url || '');
      setTraccarUser(config.username || '');
      setTraccarPass(config.password || '');
    }
  }, []);

  const handleSaveTraccar = () => {
    saveTraccarConfig({
      url: traccarUrl,
      username: traccarUser,
      password: traccarPass
    });
    setSaveStatus('Saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };
  // -----------------------------

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="h-20 w-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
          SJ
        </div>
        <div>
          <Button variant="outline" size="sm">
            Change Photo
          </Button>
          <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            defaultValue="Sarah"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            defaultValue="Johnson"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          defaultValue="sarah.johnson@rolloffrentals.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          defaultValue="(555) 123-4567"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title
        </label>
        <input
          type="text"
          defaultValue="System Administrator"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end">
        <Button>
          <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { title: 'New Orders', description: 'Get notified when new rental orders are placed' },
            { title: 'Payment Updates', description: 'Receive alerts for payment confirmations and failures' },
            { title: 'Schedule Changes', description: 'Be informed about delivery and pickup schedule modifications' },
            { title: 'Customer Messages', description: 'Get notified when customers send messages or support requests' },
            { title: 'System Updates', description: 'Receive notifications about system maintenance and updates' },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {[
            { title: 'Urgent Alerts', description: 'Critical system alerts and emergency notifications' },
            { title: 'Daily Summary', description: 'Daily summary of orders, deliveries, and key metrics' },
            { title: 'Driver Updates', description: 'Real-time updates from drivers in the field' },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">
              Enable
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Boston, MA', time: 'Current session', current: true },
            { device: 'Safari on iPhone', location: 'Boston, MA', time: '2 hours ago', current: false },
            { device: 'Firefox on Mac', location: 'Cambridge, MA', time: '1 day ago', current: false },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
          Update Security
        </Button>
      </div>
    </div>
  );

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="Rolloff Rentals Inc."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              defaultValue="XX-XXXXXXX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Address
        </label>
        <textarea
          rows={3}
          defaultValue="123 Business Park Drive, Boston, MA 02101"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="(555) 123-ROLL"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="info@rolloffrentals.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-20">
                <p className="text-sm font-medium text-gray-700">{day}</p>
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="time"
                  defaultValue="08:00"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  defaultValue="17:00"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
          Save Company Info
        </Button>
      </div>
    </div>
  );

  const renderGpsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Traccar GPS Integration</h3>
        <p className="text-gray-600 mb-6 text-sm">
          Connect your self-hosted Traccar server to enable real-time asset tracking. 
          If left blank, the system will use simulation mode for demonstration.
        </p>
        
        <div className="grid grid-cols-1 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Server URL
            </label>
            <input
              type="text"
              placeholder="https://traccar.yourdomain.com"
              value={traccarUrl}
              onChange={(e) => setTraccarUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Include protocol (http/https) and port if necessary.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username / Email
              </label>
              <input
                type="text"
                placeholder="admin"
                value={traccarUser}
                onChange={(e) => setTraccarUser(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={traccarPass}
                onChange={(e) => setTraccarPass(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        {saveStatus && <span className="text-green-600 text-sm font-medium">{saveStatus}</span>}
        <Button onClick={handleSaveTraccar}>
          <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
          Save Integration Settings
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-md font-medium text-gray-900 mb-2">Connection Status</h4>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${traccarUrl ? 'bg-orange-400' : 'bg-gray-300'}`}></div>
          <span className="text-sm text-gray-600">
            {traccarUrl ? 'Configuration Saved (Test connection in Tracking page)' : 'Not Configured (Using Simulation)'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold mr-3">
                  V
                </div>
                <div>
                  <p className="font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">Default</span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <SafeIcon icon={FiDollarSign} className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-01-15', description: 'Monthly Subscription', amount: '$99.00', status: 'Paid' },
                { date: '2023-12-15', description: 'Monthly Subscription', amount: '$99.00', status: 'Paid' },
                { date: '2023-11-15', description: 'Monthly Subscription', amount: '$99.00', status: 'Paid' },
              ].map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'company':
        return renderCompanySettings();
      case 'gps':
        return renderGpsSettings();
      case 'billing':
        return renderBillingSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <SafeIcon icon={FiSettings} className="h-6 w-6 text-primary-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile and application preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-64"
        >
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon
                    icon={tab.icon}
                    className={`mr-3 h-4 w-4 ${
                      activeTab === tab.id ? 'text-primary-600' : 'text-gray-500'
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <Card className="p-6">
            {renderTabContent()}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;