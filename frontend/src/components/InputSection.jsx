import React from 'react';
import { motion } from 'framer-motion';

const InputSection = ({ 
  inputType, 
  setInputType, 
  inputValue, 
  setInputValue, 
  onScan, 
  isLoading 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-cyber-gray rounded-lg p-6 shadow-cyber"
    >
      {/* Toggle Switch */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg bg-cyber-darker p-1">
          <button
            onClick={() => setInputType('email')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              inputType === 'email'
                ? 'bg-cyber-blue text-white shadow-cyber'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📧 Email
          </button>
          <button
            onClick={() => setInputType('url')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              inputType === 'url'
                ? 'bg-cyber-blue text-white shadow-cyber'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔗 URL
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <label className="block text-cyber-blue mb-2 font-semibold">
          {inputType === 'email' ? 'Paste Email Content' : 'Enter URL'}
        </label>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            inputType === 'email'
              ? 'Paste the suspicious email content here...'
              : 'https://example.com/suspicious-link'
          }
          className="w-full bg-cyber-darker text-white border border-cyber-blue/30 rounded-lg p-4 min-h-[200px] focus:outline-none focus:border-cyber-blue focus:shadow-cyber transition-all duration-300 resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Scan Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onScan}
        disabled={isLoading || !inputValue.trim()}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
          isLoading || !inputValue.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyber-blue to-cyber-green text-white shadow-cyber-green hover:shadow-cyber'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
            Analyzing...
          </div>
        ) : (
          '🔍 Scan for Threats'
        )}
      </motion.button>
    </motion.div>
  );
};

export default InputSection;
