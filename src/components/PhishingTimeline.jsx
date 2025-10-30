import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PhishingTimeline = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTactic, setSelectedTactic] = useState(null);

  // Historical phishing evolution data
  const evolutionData = {
    '2020': [
      { month: 'Jan', attacks: 45000, sophistication: 55 },
      { month: 'Feb', attacks: 47000, sophistication: 56 },
      { month: 'Mar', attacks: 89000, sophistication: 65 }, // COVID spike
      { month: 'Apr', attacks: 95000, sophistication: 68 },
      { month: 'May', attacks: 87000, sophistication: 67 },
      { month: 'Jun', attacks: 78000, sophistication: 66 },
      { month: 'Jul', attacks: 72000, sophistication: 64 },
      { month: 'Aug', attacks: 75000, sophistication: 65 },
      { month: 'Sep', attacks: 79000, sophistication: 66 },
      { month: 'Oct', attacks: 82000, sophistication: 67 },
      { month: 'Nov', attacks: 88000, sophistication: 69 },
      { month: 'Dec', attacks: 91000, sophistication: 70 }
    ],
    '2021': [
      { month: 'Jan', attacks: 93000, sophistication: 71 },
      { month: 'Feb', attacks: 89000, sophistication: 72 },
      { month: 'Mar', attacks: 95000, sophistication: 73 },
      { month: 'Apr', attacks: 98000, sophistication: 74 },
      { month: 'May', attacks: 102000, sophistication: 75 },
      { month: 'Jun', attacks: 105000, sophistication: 76 },
      { month: 'Jul', attacks: 108000, sophistication: 77 },
      { month: 'Aug', attacks: 112000, sophistication: 78 },
      { month: 'Sep', attacks: 115000, sophistication: 79 },
      { month: 'Oct', attacks: 119000, sophistication: 80 },
      { month: 'Nov', attacks: 123000, sophistication: 81 },
      { month: 'Dec', attacks: 126000, sophistication: 82 }
    ],
    '2022': [
      { month: 'Jan', attacks: 128000, sophistication: 83 },
      { month: 'Feb', attacks: 132000, sophistication: 84 },
      { month: 'Mar', attacks: 138000, sophistication: 85 },
      { month: 'Apr', attacks: 142000, sophistication: 86 },
      { month: 'May', attacks: 145000, sophistication: 87 },
      { month: 'Jun', attacks: 149000, sophistication: 88 },
      { month: 'Jul', attacks: 153000, sophistication: 89 },
      { month: 'Aug', attacks: 157000, sophistication: 90 },
      { month: 'Sep', attacks: 161000, sophistication: 91 },
      { month: 'Oct', attacks: 165000, sophistication: 92 },
      { month: 'Nov', attacks: 169000, sophistication: 93 },
      { month: 'Dec', attacks: 173000, sophistication: 94 }
    ],
    '2023': [
      { month: 'Jan', attacks: 176000, sophistication: 94 },
      { month: 'Feb', attacks: 179000, sophistication: 95 },
      { month: 'Mar', attacks: 183000, sophistication: 95 },
      { month: 'Apr', attacks: 187000, sophistication: 96 },
      { month: 'May', attacks: 191000, sophistication: 96 },
      { month: 'Jun', attacks: 195000, sophistication: 97 },
      { month: 'Jul', attacks: 199000, sophistication: 97 },
      { month: 'Aug', attacks: 203000, sophistication: 97 },
      { month: 'Sep', attacks: 207000, sophistication: 98 },
      { month: 'Oct', attacks: 211000, sophistication: 98 },
      { month: 'Nov', attacks: 215000, sophistication: 98 },
      { month: 'Dec', attacks: 219000, sophistication: 99 }
    ],
    '2024': [
      { month: 'Jan', attacks: 222000, sophistication: 99 },
      { month: 'Feb', attacks: 226000, sophistication: 99 },
      { month: 'Mar', attacks: 230000, sophistication: 99 },
      { month: 'Apr', attacks: 234000, sophistication: 99 },
      { month: 'May', attacks: 238000, sophistication: 99 },
      { month: 'Jun', attacks: 242000, sophistication: 99 },
      { month: 'Jul', attacks: 246000, sophistication: 99 },
      { month: 'Aug', attacks: 250000, sophistication: 99 },
      { month: 'Sep', attacks: 254000, sophistication: 99 },
      { month: 'Oct', attacks: 258000, sophistication: 99 }
    ]
  };

  const tactics = [
    {
      year: '2015-2017',
      name: 'Simple Email Spoofing',
      icon: '📧',
      description: 'Basic phishing emails with obvious grammatical errors and generic greetings like "Dear Customer"',
      sophistication: 'Low',
      color: 'cyber-green',
      techniques: ['Generic greetings', 'Poor grammar', 'Obvious fake domains', 'Simple HTML templates']
    },
    {
      year: '2018-2019',
      name: 'Business Email Compromise',
      icon: '💼',
      description: 'Targeted attacks impersonating executives and business partners with improved social engineering',
      sophistication: 'Medium',
      color: 'yellow-400',
      techniques: ['CEO impersonation', 'Invoice fraud', 'Wire transfer scams', 'Domain lookalikes']
    },
    {
      year: '2020',
      name: 'COVID-19 Themed Attacks',
      icon: '🦠',
      description: 'Exploiting pandemic fears with fake health alerts, vaccine information, and stimulus check scams',
      sophistication: 'Medium-High',
      color: 'orange-400',
      techniques: ['Health authority spoofing', 'Fake relief funds', 'Remote work exploits', 'Vaccine scams']
    },
    {
      year: '2021-2022',
      name: 'Multi-Channel Attacks',
      icon: '🔗',
      description: 'Coordinated attacks across email, SMS, social media, and voice calls (smishing, vishing)',
      sophistication: 'High',
      color: 'cyber-red',
      techniques: ['SMS phishing', 'Voice phishing', 'QR code attacks', 'Social media lures']
    },
    {
      year: '2023',
      name: 'AI-Generated Content',
      icon: '🤖',
      description: 'Using ChatGPT and AI tools to create convincing, personalized phishing content with perfect grammar',
      sophistication: 'Very High',
      color: 'purple-400',
      techniques: ['AI-written emails', 'Deepfake voices', 'Personalized content', 'Context-aware attacks']
    },
    {
      year: '2024-Present',
      name: 'Adversarial ML Attacks',
      icon: '⚔️',
      description: 'Sophisticated attacks designed to bypass AI detection systems using adversarial machine learning',
      sophistication: 'Critical',
      color: 'cyber-red',
      techniques: ['ML evasion', 'Polymorphic phishing', 'Zero-day exploits', 'Advanced obfuscation']
    }
  ];

  const getSophisticationColor = (level) => {
    if (level === 'Low') return 'text-cyber-green';
    if (level === 'Medium' || level === 'Medium-High') return 'text-yellow-400';
    if (level === 'High' || level === 'Very High') return 'text-orange-400';
    return 'text-cyber-red';
  };

  return (
    <div className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
          <span className="text-3xl mr-3">📈</span>
          Phishing Evolution Timeline
        </h3>
        <p className="text-gray-400">
          Track how phishing tactics have evolved over the years and become increasingly sophisticated
        </p>
      </div>

      {/* Year Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(evolutionData).map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedYear === year
                ? 'bg-cyber-blue text-white shadow-cyber-blue'
                : 'bg-cyber-darker text-gray-400 hover:text-white border border-cyber-blue/20'
            }`}
          >
            {year}
          </motion.button>
        ))}
      </div>

      {/* Attack Volume Chart */}
      <motion.div
        key={selectedYear}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cyber-darker rounded-lg p-4 mb-6"
      >
        <h4 className="text-white font-semibold mb-4">Attack Volume & Sophistication - {selectedYear}</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evolutionData[selectedYear]}>
            <defs>
              <linearGradient id="attacksGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00d9ff" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="sophisticationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0055" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff0055" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#00d9ff" />
            <YAxis yAxisId="right" orientation="right" stroke="#ff0055" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #00d9ff',
                borderRadius: '8px'
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="attacks"
              stroke="#00d9ff"
              fillOpacity={1}
              fill="url(#attacksGradient)"
              name="Attacks"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sophistication"
              stroke="#ff0055"
              strokeWidth={3}
              dot={{ fill: '#ff0055', r: 4 }}
              name="Sophistication %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tactic Evolution Timeline */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold text-xl mb-4">Evolution of Phishing Tactics</h4>
        {tactics.map((tactic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline line */}
            {index < tactics.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-cyber-blue/30" />
            )}
            
            <div
              onClick={() => setSelectedTactic(selectedTactic === index ? null : index)}
              className="bg-cyber-darker rounded-lg p-4 border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all cursor-pointer hover:shadow-cyber"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl bg-cyber-gray rounded-full p-2 shadow-lg"
                >
                  {tactic.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="text-white font-bold text-lg">{tactic.name}</h5>
                      <p className="text-gray-400 text-sm">{tactic.year}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSophisticationColor(tactic.sophistication)}`}>
                      {tactic.sophistication}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{tactic.description}</p>

                  <AnimatePresence>
                    {selectedTactic === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-cyber-blue/20"
                      >
                        <p className="text-sm text-gray-400 font-semibold mb-2">Common Techniques:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {tactic.techniques.map((technique, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center space-x-2 text-sm text-gray-300"
                            >
                              <span className="text-cyber-blue">•</span>
                              <span>{technique}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4"
      >
        <h5 className="text-cyber-blue font-semibold mb-3 flex items-center">
          <span className="mr-2">💡</span>
          Key Insights
        </h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Phishing attacks have increased by <strong className="text-white">400%</strong> since 2020</li>
          <li>• Sophistication levels have risen from <strong className="text-white">55% to 99%</strong> in just 5 years</li>
          <li>• AI-powered attacks can bypass traditional detection with <strong className="text-white">85% success rate</strong></li>
          <li>• Modern phishing is multi-channel, targeting email, SMS, voice, and social media simultaneously</li>
          <li>• Attackers now use adversarial ML to specifically evade AI detection systems</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PhishingTimeline;
