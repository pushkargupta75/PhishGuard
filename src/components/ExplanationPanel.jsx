import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExplanationPanel = ({ result }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!result) return null;

  const isSafe = result.classification === 'safe';

  const getRiskIndicators = () => {
    if (isSafe) {
      return [
        { label: 'Suspicious Keywords', level: 'low', value: 15 },
        { label: 'Domain Trust', level: 'high', value: 92 },
        { label: 'Grammar Quality', level: 'high', value: 88 },
      ];
    } else {
      return [
        { label: 'Suspicious Keywords', level: 'high', value: 85 },
        { label: 'Domain Trust', level: 'low', value: 22 },
        { label: 'Urgency Tactics', level: 'high', value: 78 },
      ];
    }
  };

  const indicators = getRiskIndicators();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-cyber-gray rounded-lg shadow-cyber overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-cyber-darker transition-colors duration-200"
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">🔬</span>
          <h3 className="text-xl font-bold text-cyber-blue">Detection Explanation</h3>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-cyber-blue text-2xl"
        >
          ▼
        </motion.span>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-cyber-blue/20"
          >
            <div className="p-6">
              {/* Main Explanation */}
              <div className="bg-cyber-darker rounded-lg p-4 mb-6">
                <h4 className="text-cyber-green font-semibold mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Why was this flagged?
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {result.explanation || 
                    (isSafe 
                      ? 'The content appears legitimate with no suspicious patterns detected. Standard security indicators are within normal ranges.'
                      : 'Multiple phishing indicators detected including manipulative language, urgency tactics, and suspicious link patterns. This content attempts to trick users into revealing sensitive information.'
                    )
                  }
                </p>
              </div>

              {/* Risk Indicators */}
              <div>
                <h4 className="text-cyber-blue font-semibold mb-4">Risk Indicators</h4>
                <div className="space-y-4">
                  {indicators.map((indicator, index) => (
                    <motion.div
                      key={indicator.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">{indicator.label}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          indicator.level === 'high' 
                            ? 'bg-cyber-red/20 text-cyber-red' 
                            : indicator.level === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-cyber-green/20 text-cyber-green'
                        }`}>
                          {indicator.level.toUpperCase()}
                        </span>
                      </div>
                      <div className="bg-cyber-darker rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${indicator.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full ${
                            indicator.level === 'high'
                              ? 'bg-cyber-red'
                              : indicator.level === 'medium'
                              ? 'bg-yellow-400'
                              : 'bg-cyber-green'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-cyber-blue font-semibold">ℹ️ Note:</span> This analysis uses 
                  machine learning models trained on thousands of phishing examples. Always verify 
                  sender identity and avoid clicking suspicious links.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExplanationPanel;
