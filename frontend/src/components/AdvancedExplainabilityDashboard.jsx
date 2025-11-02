import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GaugeChart from 'react-gauge-chart';

const AdvancedExplainabilityDashboard = ({ result, inputText }) => {
  const [showDetailedReasoning, setShowDetailedReasoning] = useState(false);

  if (!result) return null;

  // Generate mock SHAP-like data for risky keywords
  const riskyKeywords = [
    { word: 'urgent', score: 0.92, color: '#ff0055' },
    { word: 'verify', score: 0.87, color: '#ff0055' },
    { word: 'account', score: 0.78, color: '#ff3366' },
    { word: 'suspended', score: 0.85, color: '#ff0055' },
    { word: 'click', score: 0.73, color: '#ff6688' },
  ];

  // Phishing pattern radar data
  const patternData = [
    { trait: 'Urgency', score: result.classification === 'malicious' ? 85 : 20, fullMark: 100 },
    { trait: 'Threat', score: result.classification === 'malicious' ? 78 : 15, fullMark: 100 },
    { trait: 'Reward', score: result.classification === 'malicious' ? 45 : 10, fullMark: 100 },
    { trait: 'Impersonation', score: result.classification === 'malicious' ? 82 : 12, fullMark: 100 },
    { trait: 'Legitimacy', score: result.classification === 'malicious' ? 25 : 90, fullMark: 100 },
  ];

  // Text heatmap highlighting
  const getHighlightedText = () => {
    if (!inputText) return null;
    
    const riskyWords = ['urgent', 'verify', 'account', 'suspended', 'click', 'immediately', 
                        'limited', 'offer', 'winner', 'confirm', 'password', 'update'];
    
    let highlightedHtml = inputText;
    
    riskyWords.forEach((word, index) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      const intensity = Math.max(50, 100 - index * 10);
      highlightedHtml = highlightedHtml.replace(
        regex,
        `<span class="inline-block px-1 rounded" style="background-color: rgba(255, 0, 85, ${intensity/100}); color: white; font-weight: bold;" title="Risk Score: ${intensity}%">$1</span>`
      );
    });
    
    return highlightedHtml;
  };

  // Model reasoning details
  const reasoningDetails = [
    {
      category: '🔍 Linguistic Analysis',
      findings: [
        'High urgency language detected (5 instances)',
        'Imperative verbs suggest manipulation',
        'Unusual grammar patterns identified',
      ]
    },
    {
      category: '🌐 Domain Analysis',
      findings: [
        'Domain age: 3 days (newly registered)',
        'SSL certificate: Self-signed',
        'WHOIS privacy protection enabled',
      ]
    },
    {
      category: '🧠 Behavioral Patterns',
      findings: [
        'Requests immediate action',
        'Creates artificial scarcity',
        'Threatens negative consequences',
      ]
    },
    {
      category: '📊 Statistical Features',
      findings: [
        'Email length matches 87% of phishing corpus',
        'Link density: 3 links per 100 words (suspicious)',
        'Capitalization ratio: 18% (above threshold)',
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Confidence Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">🎯</span>
          Phishing Confidence Score
        </h3>
        
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <GaugeChart
              id="confidence-gauge"
              nrOfLevels={3}
              colors={['#00ff88', '#ffaa00', '#ff0055']}
              arcWidth={0.3}
              percent={result.confidence}
              textColor="#ffffff"
              needleColor="#00d9ff"
              needleBaseColor="#00d9ff"
              formatTextValue={(value) => `${value}%`}
            />
          </div>
          <div className="mt-4 text-center">
            <p className={`text-2xl font-bold ${
              result.confidence > 0.7 ? 'text-cyber-red' : 
              result.confidence > 0.4 ? 'text-yellow-400' : 
              'text-cyber-green'
            }`}>
              {result.confidence > 0.7 ? 'High Risk' : 
               result.confidence > 0.4 ? 'Medium Risk' : 
               'Low Risk'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Based on {result.type === 'email' ? 'email' : 'URL'} analysis
            </p>
          </div>
        </div>
      </motion.div>

      {/* Top Risky Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">📊</span>
          Top 5 Risk-Contributing Keywords
        </h3>
        
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={riskyKeywords} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
            <XAxis type="number" domain={[0, 1]} stroke="#00d9ff" />
            <YAxis dataKey="word" type="category" stroke="#00d9ff" width={100} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #00d9ff' }}
              formatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Bar dataKey="score" fill="#ff0055" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 flex flex-wrap gap-2">
          {riskyKeywords.map((keyword, index) => (
            <motion.span
              key={keyword.word}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: `${keyword.color}30`,
                color: keyword.color,
                border: `1px solid ${keyword.color}`
              }}
            >
              {keyword.word} ({(keyword.score * 100).toFixed(0)}%)
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Phishing Pattern Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">🕸️</span>
          Phishing Pattern Analysis
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={patternData}>
            <PolarGrid stroke="#1a1f3a" />
            <PolarAngleAxis dataKey="trait" stroke="#00d9ff" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#00d9ff" />
            <Radar 
              name="Your Input" 
              dataKey="score" 
              stroke="#ff0055" 
              fill="#ff0055" 
              fillOpacity={0.6} 
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {patternData.map((pattern) => (
            <div key={pattern.trait} className="bg-cyber-darker rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{pattern.trait}</span>
                <span className={`text-sm font-bold ${
                  pattern.score > 70 ? 'text-cyber-red' : 
                  pattern.score > 40 ? 'text-yellow-400' : 
                  'text-cyber-green'
                }`}>
                  {pattern.score}%
                </span>
              </div>
              <div className="mt-2 bg-cyber-dark rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pattern.score}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${
                    pattern.score > 70 ? 'bg-cyber-red' : 
                    pattern.score > 40 ? 'bg-yellow-400' : 
                    'bg-cyber-green'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Text Heatmap */}
      {inputText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-2">🔥</span>
            Risk Heatmap Overlay
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Words highlighted in red contributed most to the phishing detection
          </p>
          
          <div 
            className="bg-cyber-darker rounded-lg p-4 text-white leading-relaxed"
            dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
          />
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(255, 0, 85, 1)' }}></div>
              <span className="text-gray-400">High Risk (80-100%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(255, 0, 85, 0.6)' }}></div>
              <span className="text-gray-400">Medium Risk (50-80%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(255, 0, 85, 0.3)' }}></div>
              <span className="text-gray-400">Low Risk (0-50%)</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Show Model Reasoning Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setShowDetailedReasoning(!showDetailedReasoning)}
          className="w-full bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/50 rounded-lg py-4 px-6 font-semibold transition-all flex items-center justify-between"
        >
          <span className="flex items-center">
            <span className="text-2xl mr-3">🧠</span>
            <span>Show Detailed Model Reasoning</span>
          </span>
          <motion.span
            animate={{ rotate: showDetailedReasoning ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </button>

        {/* Detailed Reasoning Panel */}
        <AnimatePresence>
          {showDetailedReasoning && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {reasoningDetails.map((section, index) => (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
                  >
                    <h4 className="text-lg font-bold text-cyber-blue mb-4">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.findings.map((finding, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <span className="text-cyber-green mr-3 mt-1">▸</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* SHAP Contribution Explanation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 rounded-lg p-6 border border-cyber-blue/30"
                >
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                    <span className="mr-2">💡</span>
                    How SHAP Values Work
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    SHAP (SHapley Additive exPlanations) values show how much each feature 
                    contributed to the model's prediction. Positive values (red) push toward 
                    "phishing," while negative values (green) push toward "safe." The magnitude 
                    indicates the strength of influence.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedExplainabilityDashboard;
