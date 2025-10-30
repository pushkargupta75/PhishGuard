import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ModelComparison = ({ emailContent }) => {
  const [predictions, setPredictions] = useState([]);
  const [consensus, setConsensus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    simulateModelPredictions();
  }, [emailContent]);

  const simulateModelPredictions = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simulate predictions from different models
      const models = [
        {
          name: 'Logistic Regression',
          icon: '📊',
          prediction: Math.random() > 0.5 ? 'Phishing' : 'Legitimate',
          confidence: Math.random() * 40 + 60, // 60-100%
          processingTime: Math.random() * 50 + 10, // 10-60ms
          features: {
            'URL Analysis': Math.random() * 100,
            'Text Patterns': Math.random() * 100,
            'Sender Info': Math.random() * 100,
            'Content Structure': Math.random() * 100,
            'Link Density': Math.random() * 100
          }
        },
        {
          name: 'Random Forest',
          icon: '🌲',
          prediction: Math.random() > 0.4 ? 'Phishing' : 'Legitimate',
          confidence: Math.random() * 30 + 70, // 70-100%
          processingTime: Math.random() * 100 + 50, // 50-150ms
          features: {
            'URL Analysis': Math.random() * 100,
            'Text Patterns': Math.random() * 100,
            'Sender Info': Math.random() * 100,
            'Content Structure': Math.random() * 100,
            'Link Density': Math.random() * 100
          }
        },
        {
          name: 'BERT (Transformer)',
          icon: '🤖',
          prediction: Math.random() > 0.3 ? 'Phishing' : 'Legitimate',
          confidence: Math.random() * 20 + 80, // 80-100%
          processingTime: Math.random() * 200 + 100, // 100-300ms
          features: {
            'URL Analysis': Math.random() * 100,
            'Text Patterns': Math.random() * 100,
            'Sender Info': Math.random() * 100,
            'Content Structure': Math.random() * 100,
            'Link Density': Math.random() * 100
          }
        },
        {
          name: 'Gradient Boosting',
          icon: '⚡',
          prediction: Math.random() > 0.4 ? 'Phishing' : 'Legitimate',
          confidence: Math.random() * 35 + 65, // 65-100%
          processingTime: Math.random() * 80 + 40, // 40-120ms
          features: {
            'URL Analysis': Math.random() * 100,
            'Text Patterns': Math.random() * 100,
            'Sender Info': Math.random() * 100,
            'Content Structure': Math.random() * 100,
            'Link Density': Math.random() * 100
          }
        }
      ];

      setPredictions(models);
      
      // Calculate consensus
      const phishingCount = models.filter(m => m.prediction === 'Phishing').length;
      const legitimateCount = models.length - phishingCount;
      const avgConfidence = models.reduce((sum, m) => sum + m.confidence, 0) / models.length;
      
      setConsensus({
        result: phishingCount > legitimateCount ? 'Phishing' : 'Legitimate',
        agreement: Math.max(phishingCount, legitimateCount) / models.length * 100,
        phishingVotes: phishingCount,
        legitimateVotes: legitimateCount,
        avgConfidence
      });
      
      setLoading(false);
    }, 1500);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-cyber-green';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-cyber-red';
  };

  const getPredictionColor = (prediction) => {
    return prediction === 'Phishing' ? 'text-cyber-red' : 'text-cyber-green';
  };

  const prepareChartData = () => {
    return predictions.map(model => ({
      name: model.name.split(' ')[0],
      confidence: model.confidence.toFixed(1)
    }));
  };

  const prepareRadarData = () => {
    if (predictions.length === 0) return [];
    
    const features = Object.keys(predictions[0].features);
    return features.map(feature => {
      const data = { feature };
      predictions.forEach(model => {
        data[model.name.split(' ')[0]] = model.features[feature].toFixed(1);
      });
      return data;
    });
  };

  if (loading) {
    return (
      <div className="bg-cyber-gray rounded-lg p-8 border border-cyber-blue/20">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block text-6xl mb-4"
          >
            🤖
          </motion.div>
          <p className="text-gray-400">Running multiple AI models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Consensus Card */}
      {consensus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${
            consensus.result === 'Phishing'
              ? 'from-cyber-red/20 to-cyber-red/5'
              : 'from-cyber-green/20 to-cyber-green/5'
          } border-2 ${
            consensus.result === 'Phishing' ? 'border-cyber-red' : 'border-cyber-green'
          } rounded-lg p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Model Consensus
            </h3>
            <div className={`px-4 py-2 rounded-full font-bold ${
              consensus.result === 'Phishing'
                ? 'bg-cyber-red/30 text-cyber-red'
                : 'bg-cyber-green/30 text-cyber-green'
            }`}>
              {consensus.result.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cyber-darker rounded-lg p-4">
              <div className="text-cyber-blue text-3xl font-bold">
                {consensus.agreement.toFixed(0)}%
              </div>
              <div className="text-gray-400 text-sm">Agreement</div>
            </div>
            <div className="bg-cyber-darker rounded-lg p-4">
              <div className="text-cyber-red text-3xl font-bold">{consensus.phishingVotes}</div>
              <div className="text-gray-400 text-sm">Phishing Votes</div>
            </div>
            <div className="bg-cyber-darker rounded-lg p-4">
              <div className="text-cyber-green text-3xl font-bold">{consensus.legitimateVotes}</div>
              <div className="text-gray-400 text-sm">Legitimate Votes</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Individual Model Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((model, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all hover:shadow-cyber"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{model.icon}</span>
                <div>
                  <h4 className="text-white font-semibold">{model.name}</h4>
                  <p className="text-xs text-gray-400">{model.processingTime.toFixed(0)}ms</p>
                </div>
              </div>
              <div className={`text-right ${getPredictionColor(model.prediction)}`}>
                <div className="font-bold">{model.prediction}</div>
                <div className={`text-sm ${getConfidenceColor(model.confidence)}`}>
                  {model.confidence.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-cyber-darker rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${model.confidence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`h-full ${
                    model.prediction === 'Phishing'
                      ? 'bg-cyber-red'
                      : 'bg-cyber-green'
                  }`}
                />
              </div>
            </div>

            {/* Feature Importance Mini Bars */}
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-400 font-semibold">Top Features:</p>
              {Object.entries(model.features)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([feature, value], i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 w-24 truncate">{feature}</span>
                    <div className="flex-1 bg-cyber-darker rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-cyber-blue"
                      />
                    </div>
                    <span className="text-xs text-cyber-blue w-10 text-right">{value.toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confidence Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
      >
        <h4 className="text-white font-semibold mb-4">Confidence Comparison</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={prepareChartData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #00d9ff',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="confidence" fill="#00d9ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Feature Importance Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-cyber-gray rounded-lg p-6 border border-cyber-blue/20"
      >
        <h4 className="text-white font-semibold mb-4">Feature Analysis Across Models</h4>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={prepareRadarData()}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis dataKey="feature" stroke="#94a3b8" />
            <PolarRadiusAxis stroke="#94a3b8" domain={[0, 100]} />
            <Radar name="Logistic" dataKey="Logistic" stroke="#00d9ff" fill="#00d9ff" fillOpacity={0.3} />
            <Radar name="Random" dataKey="Random" stroke="#00ff88" fill="#00ff88" fillOpacity={0.3} />
            <Radar name="BERT" dataKey="BERT" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
            <Radar name="Gradient" dataKey="Gradient" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Model Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4"
      >
        <h5 className="text-cyber-blue font-semibold mb-3 flex items-center">
          <span className="mr-2">ℹ️</span>
          About Multi-Model Ensemble
        </h5>
        <p className="text-sm text-gray-400 mb-2">
          Our system uses multiple AI models working together to provide more accurate and reliable phishing detection:
        </p>
        <ul className="space-y-1 text-sm text-gray-400 ml-4">
          <li>• <strong className="text-white">Logistic Regression</strong>: Fast, interpretable baseline model</li>
          <li>• <strong className="text-white">Random Forest</strong>: Ensemble learning with high accuracy</li>
          <li>• <strong className="text-white">BERT Transformer</strong>: Advanced NLP for context understanding</li>
          <li>• <strong className="text-white">Gradient Boosting</strong>: Powerful iterative learning approach</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ModelComparison;
