import React from 'react';
import { motion } from 'framer-motion';

const EmailToneAnalyzer = ({ emailText }) => {
  if (!emailText) return null;

  // Analyze text for manipulative tones
  const analyzeTones = () => {
    const tones = [];
    const text = emailText.toLowerCase();

    // Urgency detection
    const urgencyWords = ['urgent', 'immediately', 'now', 'asap', 'hurry', 'quick', 'limited time', 'expires'];
    const urgencyCount = urgencyWords.filter(word => text.includes(word)).length;
    if (urgencyCount > 0) {
      tones.push({
        type: 'Urgency',
        emoji: '⏰',
        color: '#ff0055',
        intensity: Math.min(100, urgencyCount * 25),
        description: 'Creates artificial time pressure to force quick decisions',
        examples: urgencyWords.filter(word => text.includes(word)),
        riskLevel: 'high'
      });
    }

    // Threat detection
    const threatWords = ['suspended', 'closed', 'blocked', 'terminated', 'legal action', 'unauthorized', 'security breach'];
    const threatCount = threatWords.filter(word => text.includes(word)).length;
    if (threatCount > 0) {
      tones.push({
        type: 'Threat',
        emoji: '⚠️',
        color: '#ff3366',
        intensity: Math.min(100, threatCount * 30),
        description: 'Uses fear to manipulate you into taking action',
        examples: threatWords.filter(word => text.includes(word)),
        riskLevel: 'high'
      });
    }

    // Reward detection
    const rewardWords = ['winner', 'prize', 'reward', 'free', 'gift', 'congratulations', 'selected', 'claim'];
    const rewardCount = rewardWords.filter(word => text.includes(word)).length;
    if (rewardCount > 0) {
      tones.push({
        type: 'Reward',
        emoji: '🎁',
        color: '#ffaa00',
        intensity: Math.min(100, rewardCount * 25),
        description: 'Appeals to greed with too-good-to-be-true offers',
        examples: rewardWords.filter(word => text.includes(word)),
        riskLevel: 'medium'
      });
    }

    // Authority/Impersonation detection
    const authorityWords = ['bank', 'paypal', 'amazon', 'microsoft', 'apple', 'irs', 'government', 'police'];
    const authorityCount = authorityWords.filter(word => text.includes(word)).length;
    if (authorityCount > 0) {
      tones.push({
        type: 'Authority',
        emoji: '👮',
        color: '#b829ff',
        intensity: Math.min(100, authorityCount * 35),
        description: 'Impersonates trusted organizations to gain credibility',
        examples: authorityWords.filter(word => text.includes(word)),
        riskLevel: 'high'
      });
    }

    // Curiosity/Mystery detection
    const curiosityWords = ['secret', 'exclusive', 'confidential', 'private', 'hidden', 'revealed'];
    const curiosityCount = curiosityWords.filter(word => text.includes(word)).length;
    if (curiosityCount > 0) {
      tones.push({
        type: 'Curiosity',
        emoji: '🔍',
        color: '#00d9ff',
        intensity: Math.min(100, curiosityCount * 30),
        description: 'Creates mystery to encourage clicking or responding',
        examples: curiosityWords.filter(word => text.includes(word)),
        riskLevel: 'low'
      });
    }

    return tones;
  };

  const detectedTones = analyzeTones();

  if (detectedTones.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-green/30"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">😊</span>
          Emotional Tone Analysis
        </h3>
        <div className="bg-cyber-green/20 border border-cyber-green/50 rounded-lg p-4 text-center">
          <p className="text-cyber-green font-semibold">
            ✅ No manipulative emotional tactics detected
          </p>
          <p className="text-gray-400 text-sm mt-2">
            The content appears to have a neutral tone without emotional manipulation
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">🎭</span>
        Emotional Manipulation Detection
      </h3>
      
      <p className="text-gray-400 text-sm mb-6">
        {detectedTones.length} manipulative {detectedTones.length === 1 ? 'tone' : 'tones'} detected in the content
      </p>

      {/* Tone Cards */}
      <div className="space-y-4">
        {detectedTones.map((tone, index) => (
          <motion.div
            key={tone.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-cyber-darker rounded-lg p-5 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{tone.emoji}</span>
                <div>
                  <h4 className="text-lg font-bold" style={{ color: tone.color }}>
                    {tone.type} Detected
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{tone.description}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                tone.riskLevel === 'high' ? 'bg-cyber-red/20 text-cyber-red' :
                tone.riskLevel === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-cyber-blue/20 text-cyber-blue'
              }`}>
                {tone.riskLevel.toUpperCase()} RISK
              </span>
            </div>

            {/* Intensity Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Intensity</span>
                <span>{tone.intensity}%</span>
              </div>
              <div className="bg-cyber-dark rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tone.intensity}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: tone.color }}
                />
              </div>
            </div>

            {/* Detected Keywords */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Detected keywords:</p>
              <div className="flex flex-wrap gap-2">
                {tone.examples.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="text-xs px-2 py-1 rounded font-mono"
                    style={{ 
                      backgroundColor: `${tone.color}30`,
                      color: tone.color,
                      border: `1px solid ${tone.color}50`
                    }}
                  >
                    "{word}"
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4"
      >
        <h5 className="text-white font-semibold mb-2 flex items-center">
          <span className="mr-2">⚠️</span>
          Psychological Manipulation Alert
        </h5>
        <p className="text-gray-300 text-sm leading-relaxed">
          This content uses <strong className="text-cyber-red">{detectedTones.length} emotional manipulation 
          {detectedTones.length === 1 ? ' technique' : ' techniques'}</strong> commonly found in phishing attacks. 
          Scammers use these psychological tactics to bypass rational thinking and pressure you into making 
          quick decisions without proper verification.
        </p>
      </motion.div>

      {/* Protection Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4"
      >
        <h5 className="text-cyber-blue font-semibold mb-3 flex items-center">
          <span className="mr-2">🛡️</span>
          How to Protect Yourself
        </h5>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start">
            <span className="text-cyber-green mr-2">•</span>
            <span>Take time to verify - Don't act on urgent requests immediately</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyber-green mr-2">•</span>
            <span>Contact organizations directly using official channels, not provided links</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyber-green mr-2">•</span>
            <span>Be skeptical of unsolicited prizes or rewards</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyber-green mr-2">•</span>
            <span>Verify sender identity before responding to threats or warnings</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default EmailToneAnalyzer;
