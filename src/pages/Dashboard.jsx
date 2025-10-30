import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for charts
  const scanData = [
    { date: 'Mon', scans: 12, malicious: 3, safe: 9 },
    { date: 'Tue', scans: 19, malicious: 5, safe: 14 },
    { date: 'Wed', scans: 15, malicious: 2, safe: 13 },
    { date: 'Thu', scans: 22, malicious: 7, safe: 15 },
    { date: 'Fri', scans: 18, malicious: 4, safe: 14 },
    { date: 'Sat', scans: 10, malicious: 1, safe: 9 },
    { date: 'Sun', scans: 8, malicious: 2, safe: 6 },
  ];

  const threatTypes = [
    { name: 'Email Phishing', value: 45, color: '#ff0055' },
    { name: 'URL Spoofing', value: 30, color: '#00d9ff' },
    { name: 'Social Engineering', value: 15, color: '#b829ff' },
    { name: 'Other', value: 10, color: '#00ff88' },
  ];

  const recentScans = [
    {
      id: 1,
      type: 'email',
      content: 'Your account requires immediate verification...',
      result: 'malicious',
      confidence: 0.94,
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'url',
      content: 'https://secure-bank-login.com',
      result: 'safe',
      confidence: 0.89,
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'email',
      content: 'Meeting reminder for tomorrow at 3 PM',
      result: 'safe',
      confidence: 0.97,
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'url',
      content: 'https://amaz0n-verify.tk/login',
      result: 'malicious',
      confidence: 0.98,
      time: '2 days ago',
    },
  ];

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
              <Link to="/training" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Training
              </Link>
              <Link to="/dashboard" className="text-cyber-blue font-semibold">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-cyber-red transition-colors"
              >
                Logout
              </button>
              <Link to="/profile" className="flex items-center">
                <img src={user?.avatar} alt="Profile" className="w-8 h-8 rounded-full border-2 border-cyber-blue" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">Here's your security overview</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Scans', value: '104', icon: '🔍', change: '+12%', color: 'cyber-blue' },
            { label: 'Threats Blocked', value: '24', icon: '🛡️', change: '-8%', color: 'cyber-red' },
            { label: 'Safe Items', value: '80', icon: '✅', change: '+15%', color: 'cyber-green' },
            { label: 'Accuracy Rate', value: '98.5%', icon: '🎯', change: '+2%', color: 'cyber-purple' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20 hover:shadow-cyber transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  stat.change.startsWith('+') ? 'bg-cyber-green/20 text-cyber-green' : 'bg-cyber-red/20 text-cyber-red'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className={`text-3xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Scan Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">📈</span>
              Weekly Scan Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                <XAxis dataKey="date" stroke="#00d9ff" />
                <YAxis stroke="#00d9ff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #00d9ff' }}
                  labelStyle={{ color: '#00d9ff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="malicious" stroke="#ff0055" strokeWidth={2} name="Malicious" />
                <Line type="monotone" dataKey="safe" stroke="#00ff88" strokeWidth={2} name="Safe" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Threat Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Threat Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #00d9ff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="mr-2">📊</span>
              Recent Scans
            </h3>
            <Link
              to="/scanner"
              className="text-sm bg-cyber-blue/20 text-cyber-blue px-4 py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors"
            >
              + New Scan
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-cyber-blue/20">
                <tr>
                  <th className="text-left text-gray-400 font-semibold pb-3">Type</th>
                  <th className="text-left text-gray-400 font-semibold pb-3">Content</th>
                  <th className="text-left text-gray-400 font-semibold pb-3">Result</th>
                  <th className="text-left text-gray-400 font-semibold pb-3">Confidence</th>
                  <th className="text-left text-gray-400 font-semibold pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, index) => (
                  <motion.tr
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-cyber-blue/10 hover:bg-cyber-darker transition-colors"
                  >
                    <td className="py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        scan.type === 'email' ? 'bg-cyber-blue/20 text-cyber-blue' : 'bg-cyber-purple/20 text-cyber-purple'
                      }`}>
                        {scan.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 max-w-xs truncate">{scan.content}</td>
                    <td className="py-4">
                      <span className={`flex items-center ${
                        scan.result === 'safe' ? 'text-cyber-green' : 'text-cyber-red'
                      }`}>
                        {scan.result === 'safe' ? '✅' : '⚠️'}
                        <span className="ml-2 capitalize">{scan.result}</span>
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">{(scan.confidence * 100).toFixed(0)}%</td>
                    <td className="py-4 text-gray-400 text-sm">{scan.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
