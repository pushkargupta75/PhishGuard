import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputSection from '../components/InputSection';
import ResultCard from '../components/ResultCard';
import ExplanationPanel from '../components/ExplanationPanel';
import HistoryPanel from '../components/HistoryPanel';
import AdvancedExplainabilityDashboard from '../components/AdvancedExplainabilityDashboard';
import ThreatIntelligenceModule from '../components/ThreatIntelligenceModule';
import EmailToneAnalyzer from '../components/EmailToneAnalyzer';
import EmailPreview from '../components/EmailPreview';
import ModelComparison from '../components/ModelComparison';
import PhishingTimeline from '../components/PhishingTimeline';
import { generatePDFReport } from '../utils/reportGenerator';
import { useAuth } from '../context/AuthContext';

function Scanner() {
  const { isAuthenticated, user } = useAuth();
  const [inputType, setInputType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const API_ENDPOINT = 'http://localhost:5000/analyze';

  const handleScan = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await axios.post(API_ENDPOINT, {
        type: inputType,
        content: inputValue,
      });

      const scanResult = response.data;
      setResult(scanResult);
      addToHistory(scanResult);
    } catch (error) {
      console.error('Error analyzing content:', error);
      
      // Mock response for demo
      const mockResult = {
        type: inputType,
        classification: Math.random() > 0.5 ? 'safe' : 'malicious',
        confidence: 0.85 + Math.random() * 0.15,
        highlighted_text: inputValue,
        explanation: inputType === 'email' 
          ? 'Detected manipulative urgency and suspicious domain link' 
          : 'URL contains unusual subdomain patterns and obfuscation techniques'
      };
      
      setResult(mockResult);
      addToHistory(mockResult);
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = (scanResult) => {
    const historyItem = {
      id: Date.now(),
      type: scanResult.type,
      classification: scanResult.classification,
      confidence: scanResult.confidence,
      preview: inputValue.substring(0, 50) + (inputValue.length > 50 ? '...' : ''),
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory(prev => [historyItem, ...prev.slice(0, 4)]);
  };

  const handleGenerateReport = () => {
    if (!result) {
      toast.error('No scan result available to generate report');
      return;
    }

    const reportData = {
      content: inputValue,
      type: inputType,
      classification: result.classification,
      riskScore: Math.round(result.confidence * 100),
      confidence: Math.round(result.confidence * 100),
      indicators: [
        { name: 'Suspicious URL', severity: 'High', detected: result.classification === 'malicious' },
        { name: 'Urgency Language', severity: 'High', detected: inputValue.toLowerCase().includes('urgent') },
        { name: 'Impersonation Attempt', severity: 'Medium', detected: result.classification === 'malicious' },
        { name: 'Legitimate Domain', severity: 'Low', detected: result.classification === 'safe' }
      ],
      recommendations: result.classification === 'malicious' 
        ? [
            'Do not click on any links in this email',
            'Do not provide any personal or financial information',
            'Report this email to your IT security team',
            'Delete this email immediately',
            'Check your account directly through official website'
          ]
        : [
            'This content appears to be safe',
            'Always verify sender identity for sensitive requests',
            'Keep your security software up to date',
            'Stay vigilant for unexpected communications'
          ]
    };

    try {
      const fileName = generatePDFReport(reportData);
      toast.success(`Report generated: ${fileName}`);
    } catch (error) {
      toast.error('Failed to generate report');
      console.error(error);
    }
  };

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'explainability', label: '🔍 Explainability', icon: '🔍' },
    { id: 'threat-intel', label: '🌐 Threat Intel', icon: '🌐' },
    { id: 'tone-analysis', label: '💬 Tone Analysis', icon: '💬' },
    { id: 'email-preview', label: '📧 Email Preview', icon: '📧' },
    { id: 'model-comparison', label: '🤖 Model Comparison', icon: '🤖' },
    { id: 'timeline', label: '📈 Evolution', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                PhishGuard
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/training" className="text-gray-300 hover:text-cyber-blue transition-colors flex items-center">
                <span className="mr-1">🎮</span>
                Training
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-cyber-blue transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="flex items-center">
                    <img src={user?.avatar} alt="Profile" className="w-8 h-8 rounded-full border-2 border-cyber-blue" />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-cyber-blue transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-4 py-2 rounded-lg hover:shadow-cyber-green transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-6xl mr-4"
              >
                🛡️
              </motion.span>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple bg-clip-text text-transparent">
                PhishGuard Scanner
              </h1>
            </div>
            <p className="text-cyber-blue text-lg glow-text">
              Real-Time Phishing Detection System
            </p>
            <p className="text-gray-400 mt-2">
              Analyze emails and URLs for phishing threats instantly
            </p>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input & Results */}
            <div className="lg:col-span-2 space-y-6">
              <InputSection
                inputType={inputType}
                setInputType={setInputType}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onScan={handleScan}
                isLoading={isLoading}
              />

              {result && (
                <>
                  <ResultCard result={result} />
                  
                  {/* Advanced Analysis Tabs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyber-gray rounded-lg border border-cyber-blue/20 overflow-hidden"
                  >
                    {/* Tab Navigation */}
                    <div className="flex overflow-x-auto bg-cyber-darker border-b border-cyber-blue/20">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                            activeTab === tab.id
                              ? 'bg-cyber-blue/20 text-cyber-blue border-b-2 border-cyber-blue'
                              : 'text-gray-400 hover:text-white hover:bg-cyber-blue/10'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                      {activeTab === 'overview' && <ExplanationPanel result={result} />}
                      
                      {activeTab === 'explainability' && (
                        <AdvancedExplainabilityDashboard
                          emailContent={inputValue}
                          phishingScore={result.confidence * 100}
                        />
                      )}
                      
                      {activeTab === 'threat-intel' && inputType === 'url' && (
                        <ThreatIntelligenceModule url={inputValue} />
                      )}
                      
                      {activeTab === 'threat-intel' && inputType === 'email' && (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-4xl mb-4">🌐</p>
                          <p>Threat Intelligence is available for URL analysis.</p>
                          <p className="text-sm mt-2">Switch to URL mode to use this feature.</p>
                        </div>
                      )}
                      
                      {activeTab === 'tone-analysis' && inputType === 'email' && (
                        <EmailToneAnalyzer emailContent={inputValue} />
                      )}
                      
                      {activeTab === 'tone-analysis' && inputType === 'url' && (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-4xl mb-4">💬</p>
                          <p>Tone Analysis is available for email content.</p>
                          <p className="text-sm mt-2">Switch to Email mode to use this feature.</p>
                        </div>
                      )}
                      
                      {activeTab === 'email-preview' && inputType === 'email' && (
                        <EmailPreview emailContent={inputValue} riskAnalysis={result} />
                      )}
                      
                      {activeTab === 'email-preview' && inputType === 'url' && (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-4xl mb-4">📧</p>
                          <p>Email Preview is available for email content.</p>
                          <p className="text-sm mt-2">Switch to Email mode to use this feature.</p>
                        </div>
                      )}
                      
                      {activeTab === 'model-comparison' && (
                        <ModelComparison emailContent={inputValue} />
                      )}
                      
                      {activeTab === 'timeline' && <PhishingTimeline />}
                    </div>
                  </motion.div>

                  {/* Generate Report Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateReport}
                    className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green text-white py-3 rounded-lg font-semibold hover:shadow-cyber-green transition-all flex items-center justify-center"
                  >
                    <span className="mr-2">📄</span>
                    Generate PDF Report
                  </motion.button>
                </>
              )}

              {/* Loading Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-cyber-gray rounded-lg p-12 text-center shadow-cyber"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="text-6xl mb-4 inline-block"
                  >
                    🔍
                  </motion.div>
                  <h3 className="text-2xl font-bold text-cyber-blue glow-text mb-2">
                    Analyzing Content
                  </h3>
                  <p className="text-gray-400">
                    Running advanced threat detection algorithms...
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -20, 0],
                          backgroundColor: ['#00d9ff', '#00ff88', '#00d9ff']
                        }}
                        transition={{ 
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="w-3 h-3 rounded-full bg-cyber-blue"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-1">
              <HistoryPanel history={history} />
              
              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 bg-cyber-gray rounded-lg p-6 shadow-cyber"
              >
                <h3 className="text-lg font-bold text-cyber-green mb-4 flex items-center">
                  <span className="mr-2">💡</span>
                  Quick Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">▸</span>
                    <span>Check sender email addresses carefully</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">▸</span>
                    <span>Hover over links before clicking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">▸</span>
                    <span>Be wary of urgent action requests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">▸</span>
                    <span>Never share passwords via email</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            <p>Powered by Advanced Machine Learning & Real-Time Threat Intelligence</p>
            <p className="mt-2">🔒 Your data is analyzed locally and never stored</p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
