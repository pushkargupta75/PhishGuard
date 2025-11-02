import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const isSafe = result.classification === 'safe';
  const confidencePercentage = Math.round(result.confidence * 100);

  const highlightText = (text, highlighted) => {
    if (!highlighted || result.type === 'url') return text;
    
    // Simple highlighting for demonstration
    const words = ['urgent', 'limited offer', 'click now', 'verify', 'account', 'suspended', 'immediately'];
    let highlightedText = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<span class="bg-cyber-red/30 text-cyber-red font-bold px-1 rounded">$1</span>'
      );
    });
    
    return highlightedText;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-cyber-gray rounded-lg p-6 border-2 ${
        isSafe ? 'border-cyber-green shadow-cyber-green' : 'border-cyber-red shadow-cyber-red'
      }`}
    >
      {/* Classification Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`text-5xl mr-4 ${isSafe ? 'glow-text-green' : 'glow-text-red'}`}
          >
            {isSafe ? '✅' : '⚠️'}
          </motion.div>
          <div>
            <h3 className={`text-2xl font-bold ${isSafe ? 'text-cyber-green' : 'text-cyber-red'}`}>
              {isSafe ? 'Safe' : 'Malicious Detected'}
            </h3>
            <p className="text-gray-400 text-sm">
              {result.type === 'email' ? 'Email Analysis' : 'URL Analysis'}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="text-right">
          <div className={`text-3xl font-bold ${isSafe ? 'text-cyber-green' : 'text-cyber-red'}`}>
            {confidencePercentage}%
          </div>
          <div className="text-xs text-gray-400">Confidence</div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-6">
        <div className="bg-cyber-darker rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full ${
              isSafe 
                ? 'bg-gradient-to-r from-cyber-green to-cyber-blue' 
                : 'bg-gradient-to-r from-cyber-red to-cyber-purple'
            }`}
          />
        </div>
      </div>

      {/* Highlighted Text */}
      {result.highlighted_text && (
        <div className="bg-cyber-darker rounded-lg p-4 mb-4">
          <h4 className="text-cyber-blue font-semibold mb-2">
            {result.type === 'email' ? '📝 Analyzed Content' : '🔗 URL Breakdown'}
          </h4>
          <div
            className="text-sm text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightText(result.highlighted_text, true)
            }}
          />
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-cyber-darker rounded-lg p-3 text-center">
          <div className="text-cyber-blue font-bold text-lg">
            {result.type === 'email' ? '📧' : '🌐'}
          </div>
          <div className="text-xs text-gray-400 mt-1">Type</div>
        </div>
        <div className="bg-cyber-darker rounded-lg p-3 text-center">
          <div className={`font-bold text-lg ${isSafe ? 'text-cyber-green' : 'text-cyber-red'}`}>
            {isSafe ? 'LOW' : 'HIGH'}
          </div>
          <div className="text-xs text-gray-400 mt-1">Risk Level</div>
        </div>
        <div className="bg-cyber-darker rounded-lg p-3 text-center">
          <div className="text-cyber-blue font-bold text-lg">
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">Scanned At</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
