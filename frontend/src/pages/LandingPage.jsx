import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                PhishGuard
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-cyber-blue transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Pricing
              </a>
              <Link
                to="/login"
                className="text-cyber-blue hover:text-cyber-green transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-6 py-2 rounded-lg hover:shadow-cyber-green transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple bg-clip-text text-transparent">
                  Protect Yourself
                </span>
                <br />
                <span className="text-white">From Phishing Attacks</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Real-time AI-powered phishing detection for emails and URLs. 
                Stay safe with advanced threat intelligence and instant alerts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-cyber-green transition-all text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/scanner"
                  className="bg-cyber-gray text-white px-8 py-4 rounded-lg text-lg font-semibold border border-cyber-blue/30 hover:border-cyber-blue hover:shadow-cyber transition-all text-center"
                >
                  Try Scanner
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="text-cyber-green text-2xl mr-2">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyber-green text-2xl mr-2">✓</span>
                  <span>100% Free to start</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-cyber-gray rounded-2xl p-8 shadow-cyber">
                <div className="bg-cyber-darker rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyber-red text-4xl">⚠️</span>
                    <span className="text-cyber-red font-bold text-xl">MALICIOUS</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    "URGENT: Your account will be suspended! Click here immediately..."
                  </p>
                  <div className="bg-cyber-red/20 border border-cyber-red/50 rounded p-3">
                    <p className="text-cyber-red text-xs">
                      🚨 Detected manipulative urgency tactics and suspicious domain
                    </p>
                  </div>
                </div>
                <div className="text-center text-cyber-green text-sm">
                  ✓ Threat Detected in 0.3s
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Scans Processed', value: '10M+', icon: '🔍' },
              { label: 'Threats Blocked', value: '2.5M+', icon: '🛡️' },
              { label: 'Active Users', value: '50K+', icon: '👥' },
              { label: 'Accuracy Rate', value: '99.8%', icon: '🎯' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-cyber-blue mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Security Features
            </h2>
            <p className="text-xl text-gray-400">
              Enterprise-grade protection powered by AI and machine learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Detection',
                description: 'Advanced machine learning models trained on millions of phishing examples',
              },
              {
                icon: '⚡',
                title: 'Real-Time Analysis',
                description: 'Get instant results in under 1 second with our optimized engine',
              },
              {
                icon: '📊',
                title: 'Detailed Reports',
                description: 'Comprehensive analysis with risk indicators and security recommendations',
              },
              {
                icon: '🔔',
                title: 'Smart Alerts',
                description: 'Receive notifications for critical threats and suspicious patterns',
              },
              {
                icon: '📈',
                title: 'Analytics Dashboard',
                description: 'Track scan history, trends, and security metrics over time',
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'Your data is analyzed securely and never stored or shared',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cyber-gray rounded-lg p-6 hover:shadow-cyber transition-all duration-300 border border-transparent hover:border-cyber-blue/30"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple, fast, and secure in 3 steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Input Content',
                description: 'Paste email text or enter a URL you want to analyze',
                icon: '📝',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI scans for phishing patterns and threats',
                icon: '🔬',
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive instant verdict with detailed explanation',
                icon: '✅',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-cyber-gray rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-4xl">
                  {item.icon}
                </div>
                <div className="text-cyber-blue text-sm font-bold mb-2">STEP {item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyber-blue/20 to-cyber-green/20 rounded-2xl p-12 text-center border border-cyber-blue/30"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Stay Protected?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of users protecting themselves from phishing attacks
            </p>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-12 py-4 rounded-lg text-lg font-semibold hover:shadow-cyber-green transition-all"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyber-darker border-t border-cyber-blue/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">🛡️</span>
                <span className="text-xl font-bold text-cyber-blue">PhishGuard</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered phishing detection to keep you safe online.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-cyber-blue">Features</a></li>
                <li><a href="#pricing" className="hover:text-cyber-blue">Pricing</a></li>
                <li><Link to="/scanner" className="hover:text-cyber-blue">Scanner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyber-blue">About</a></li>
                <li><a href="#" className="hover:text-cyber-blue">Blog</a></li>
                <li><a href="#" className="hover:text-cyber-blue">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyber-blue">Privacy</a></li>
                <li><a href="#" className="hover:text-cyber-blue">Terms</a></li>
                <li><a href="#" className="hover:text-cyber-blue">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyber-blue/20 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 PhishGuard. All rights reserved. Built with ❤️ for cybersecurity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
