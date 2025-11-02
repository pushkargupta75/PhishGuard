import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThreatIntelligenceModule = ({ url, type }) => {
  const [loading, setLoading] = useState(true);
  const [threatData, setThreatData] = useState(null);

  useEffect(() => {
    if (url && type === 'url') {
      analyzeThreat();
    }
  }, [url, type]);

  const analyzeThreat = async () => {
    setLoading(true);
    
    // Simulate API call - replace with real threat intelligence API
    setTimeout(() => {
      const mockData = {
        domain: extractDomain(url),
        reputation: Math.random() > 0.5 ? 'safe' : 'suspicious',
        reputationScore: Math.floor(Math.random() * 100),
        domainAge: Math.floor(Math.random() * 3650) + ' days',
        ownerCountry: ['USA', 'China', 'Russia', 'Unknown', 'Netherlands'][Math.floor(Math.random() * 5)],
        sslValid: Math.random() > 0.3,
        blacklisted: Math.random() > 0.7,
        phishTankReports: Math.floor(Math.random() * 50),
        virusTotalDetections: Math.floor(Math.random() * 10),
        registrar: 'GoDaddy LLC',
        lastUpdated: new Date().toLocaleDateString(),
      };
      setThreatData(mockData);
      setLoading(false);
    }, 1500);
  };

  const extractDomain = (urlString) => {
    try {
      const urlObj = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
      return urlObj.hostname;
    } catch {
      return urlString;
    }
  };

  if (type !== 'url') return null;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-cyber-gray rounded-lg p-8 border border-cyber-blue/20 text-center"
      >
        <div className="animate-spin text-5xl mb-4">🌐</div>
        <p className="text-cyber-blue">Checking threat intelligence databases...</p>
      </motion.div>
    );
  }

  if (!threatData) return null;

  const getReputationColor = (reputation) => {
    if (reputation === 'safe') return 'cyber-green';
    if (reputation === 'suspicious') return 'yellow-400';
    return 'cyber-red';
  };

  const getReputationIcon = (reputation) => {
    if (reputation === 'safe') return '✅';
    if (reputation === 'suspicious') return '⚠️';
    return '🚨';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">🌐</span>
        Threat Intelligence Report
      </h3>

      {/* Overall Status */}
      <div className="mb-6 bg-cyber-darker rounded-lg p-6 text-center">
        <div className={`text-6xl mb-3`}>{getReputationIcon(threatData.reputation)}</div>
        <h4 className={`text-2xl font-bold text-${getReputationColor(threatData.reputation)} mb-2`}>
          {threatData.reputation.toUpperCase()}
        </h4>
        <p className="text-gray-400">Domain Reputation Score: {threatData.reputationScore}/100</p>
      </div>

      {/* Intelligence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Domain Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-cyber-darker rounded-lg p-4 border border-cyber-blue/10"
        >
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🏠</span>
            <h5 className="text-lg font-semibold text-white">Domain Information</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Domain:</span>
              <span className="text-white font-mono">{threatData.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Age:</span>
              <span className="text-white">{threatData.domainAge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Registrar:</span>
              <span className="text-white">{threatData.registrar}</span>
            </div>
          </div>
        </motion.div>

        {/* WHOIS Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-cyber-darker rounded-lg p-4 border border-cyber-blue/10"
        >
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">📍</span>
            <h5 className="text-lg font-semibold text-white">WHOIS Data</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Owner Country:</span>
              <span className="text-white">{threatData.ownerCountry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated:</span>
              <span className="text-white">{threatData.lastUpdated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Privacy Protected:</span>
              <span className={`${Math.random() > 0.5 ? 'text-yellow-400' : 'text-cyber-green'}`}>
                {Math.random() > 0.5 ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* SSL Certificate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-darker rounded-lg p-4 border border-cyber-blue/10"
        >
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🔒</span>
            <h5 className="text-lg font-semibold text-white">SSL Certificate</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`font-semibold ${threatData.sslValid ? 'text-cyber-green' : 'text-cyber-red'}`}>
                {threatData.sslValid ? 'Valid ✓' : 'Invalid ✗'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Issuer:</span>
              <span className="text-white">{threatData.sslValid ? 'Let\'s Encrypt' : 'Self-Signed'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expiry:</span>
              <span className="text-white">{threatData.sslValid ? '90 days' : 'N/A'}</span>
            </div>
          </div>
        </motion.div>

        {/* Blacklist Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-cyber-darker rounded-lg p-4 border border-cyber-blue/10"
        >
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🚫</span>
            <h5 className="text-lg font-semibold text-white">Blacklist Check</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Blacklisted:</span>
              <span className={`font-semibold ${threatData.blacklisted ? 'text-cyber-red' : 'text-cyber-green'}`}>
                {threatData.blacklisted ? 'Yes ⚠️' : 'No ✓'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">PhishTank Reports:</span>
              <span className={`${threatData.phishTankReports > 10 ? 'text-cyber-red' : 'text-white'}`}>
                {threatData.phishTankReports}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">VirusTotal:</span>
              <span className={`${threatData.virusTotalDetections > 3 ? 'text-cyber-red' : 'text-cyber-green'}`}>
                {threatData.virusTotalDetections}/89 engines
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4"
      >
        <h5 className="text-white font-semibold mb-2 flex items-center">
          <span className="mr-2">💡</span>
          Analysis Summary
        </h5>
        <p className="text-gray-300 text-sm leading-relaxed">
          {threatData.reputation === 'safe' 
            ? `This domain appears legitimate with a valid SSL certificate, no blacklist entries, and has been registered for ${threatData.domainAge}. However, always verify the sender before clicking links.`
            : `This domain shows suspicious characteristics including ${!threatData.sslValid ? 'invalid SSL certificate, ' : ''}${threatData.blacklisted ? 'blacklist presence, ' : ''}and ${threatData.phishTankReports} phishing reports. Exercise extreme caution.`
          }
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ThreatIntelligenceModule;
