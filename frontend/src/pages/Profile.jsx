import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                PhishGuard
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/scanner" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Scanner
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Dashboard
              </Link>
              <Link to="/profile" className="text-cyber-blue font-semibold">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-cyber-red transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Profile Settings
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20 text-center">
              <div className="mb-4">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto border-4 border-cyber-blue shadow-cyber"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
              <p className="text-gray-400 mb-4">{user?.email}</p>
              <div className="inline-block bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
                {user?.subscription} Plan
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-t border-cyber-blue/10">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white font-semibold">
                    {new Date(user?.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-cyber-blue/10">
                  <span className="text-gray-400">Total Scans</span>
                  <span className="text-cyber-blue font-semibold">104</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-cyber-blue/10">
                  <span className="text-gray-400">Threats Blocked</span>
                  <span className="text-cyber-red font-semibold">24</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">👤</span>
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      className="text-sm bg-cyber-green/20 text-cyber-green px-4 py-2 rounded-lg hover:bg-cyber-green/30 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: user?.name, email: user?.email });
                      }}
                      className="text-sm bg-cyber-red/20 text-cyber-red px-4 py-2 rounded-lg hover:bg-cyber-red/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-cyber-darker text-white border border-cyber-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-cyber-darker text-white border border-cyber-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🔒</span>
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-cyber-blue/10">
                  <div>
                    <div className="text-white font-semibold">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-400">Add an extra layer of security</div>
                  </div>
                  <button className="bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-lg text-sm hover:bg-cyber-blue/30 transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-cyber-blue/10">
                  <div>
                    <div className="text-white font-semibold">Change Password</div>
                    <div className="text-sm text-gray-400">Update your password regularly</div>
                  </div>
                  <button className="bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-lg text-sm hover:bg-cyber-blue/30 transition-colors">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-white font-semibold">Active Sessions</div>
                    <div className="text-sm text-gray-400">Manage your active devices</div>
                  </div>
                  <button className="bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-lg text-sm hover:bg-cyber-blue/30 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🔔</span>
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', description: 'Receive scan results via email' },
                  { label: 'Threat Alerts', description: 'Get notified of high-risk detections' },
                  { label: 'Weekly Reports', description: 'Summary of your security activity' },
                  { label: 'Product Updates', description: 'News and feature announcements' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-cyber-blue/10 last:border-0">
                    <div>
                      <div className="text-white font-semibold">{item.label}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-cyber-darker peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyber-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-cyber-red/10 rounded-lg p-6 border border-cyber-red/30">
              <h3 className="text-xl font-bold text-cyber-red mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                Danger Zone
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left bg-cyber-red/20 text-cyber-red px-4 py-3 rounded-lg hover:bg-cyber-red/30 transition-colors">
                  <div className="font-semibold">Delete Account</div>
                  <div className="text-sm opacity-80">Permanently delete your account and all data</div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
