import React from 'react';
import { motion } from 'framer-motion';

const HistoryPanel = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-cyber-gray rounded-lg p-6 shadow-cyber"
    >
      <h3 className="text-xl font-bold text-cyber-blue mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Recent Scans
      </h3>
      
      <div className="space-y-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-cyber-darker rounded-lg p-4 hover:bg-cyber-darker/70 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-3">
                  {item.classification === 'safe' ? '✅' : '⚠️'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded mr-2 ${
                      item.type === 'email' 
                        ? 'bg-cyber-blue/20 text-cyber-blue' 
                        : 'bg-cyber-purple/20 text-cyber-purple'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className={`font-semibold ${
                      item.classification === 'safe' ? 'text-cyber-green' : 'text-cyber-red'
                    }`}>
                      {item.classification === 'safe' ? 'Safe' : 'Malicious'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {item.preview}
                  </p>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className={`text-lg font-bold ${
                  item.classification === 'safe' ? 'text-cyber-green' : 'text-cyber-red'
                }`}>
                  {Math.round(item.confidence * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {item.timestamp}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {history.length >= 5 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Showing last 5 scans
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPanel;
