import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EmailPreview = ({ emailContent, riskAnalysis }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [parsedContent, setParsedContent] = useState({ html: '', links: [] });

  useEffect(() => {
    parseEmailContent();
  }, [emailContent]);

  const parseEmailContent = () => {
    if (!emailContent) return;

    // Extract URLs from the content
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
    const links = [];
    let match;

    while ((match = urlRegex.exec(emailContent)) !== null) {
      const url = match[0];
      const riskLevel = analyzeUrlRisk(url);
      links.push({
        url,
        position: match.index,
        riskLevel,
        explanation: getRiskExplanation(url, riskLevel)
      });
    }

    // Convert email to HTML-like display
    let htmlContent = emailContent
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    // Highlight links
    links.forEach((link, index) => {
      const colorClass = link.riskLevel === 'high' ? 'text-cyber-red' : 
                        link.riskLevel === 'medium' ? 'text-yellow-400' : 
                        'text-cyber-green';
      
      htmlContent = htmlContent.replace(
        link.url,
        `<span class="link-highlight ${colorClass} underline cursor-pointer font-semibold" data-link-index="${index}">${link.url}</span>`
      );
    });

    setParsedContent({ html: htmlContent, links });
  };

  const analyzeUrlRisk = (url) => {
    const suspiciousPatterns = [
      /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
      /\.(tk|ml|ga|cf|gq)$/, // Suspicious TLDs
      /[0O][0O]/, // Character substitution (00, OO)
      /@/, // @ symbol in URL
      /\-verify|\-secure|\-update|\-login/, // Suspicious keywords
    ];

    const legitimateDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'github.com'];
    
    // Check if it's a legitimate domain
    if (legitimateDomains.some(domain => url.includes(domain))) {
      return 'safe';
    }

    // Check for suspicious patterns
    const suspiciousCount = suspiciousPatterns.filter(pattern => pattern.test(url)).length;
    
    if (suspiciousCount >= 2) return 'high';
    if (suspiciousCount === 1) return 'medium';
    
    // Check for HTTPS
    if (!url.startsWith('https://') && url.startsWith('http://')) {
      return 'medium';
    }

    return 'safe';
  };

  const getRiskExplanation = (url, riskLevel) => {
    const issues = [];

    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
      issues.push('Uses IP address instead of domain name');
    }
    if (/\.(tk|ml|ga|cf|gq)$/.test(url)) {
      issues.push('Suspicious free domain extension');
    }
    if (/[0O]{2,}/.test(url)) {
      issues.push('Character substitution detected (typosquatting)');
    }
    if (/@/.test(url)) {
      issues.push('Contains @ symbol (URL obfuscation)');
    }
    if (/\-verify|\-secure|\-update|\-login/.test(url)) {
      issues.push('Suspicious keywords in domain');
    }
    if (!url.startsWith('https://') && url.startsWith('http://')) {
      issues.push('Not using HTTPS (insecure)');
    }

    if (riskLevel === 'safe') {
      return 'This link appears to be safe. No suspicious indicators detected.';
    }

    return issues.join('. ');
  };

  const handleLinkClick = (e) => {
    const linkIndex = e.target.getAttribute('data-link-index');
    if (linkIndex !== null) {
      e.preventDefault();
      const link = parsedContent.links[parseInt(linkIndex)];
      setHoveredLink(link);
    }
  };

  const getRiskIcon = (riskLevel) => {
    if (riskLevel === 'high') return '🚫';
    if (riskLevel === 'medium') return '⚠️';
    return '✅';
  };

  const getRiskBadge = (riskLevel) => {
    if (riskLevel === 'high') {
      return 'bg-cyber-red/20 text-cyber-red border-cyber-red';
    }
    if (riskLevel === 'medium') {
      return 'bg-yellow-400/20 text-yellow-400 border-yellow-400';
    }
    return 'bg-cyber-green/20 text-cyber-green border-cyber-green';
  };

  return (
    <div className="bg-cyber-gray rounded-lg border border-cyber-blue/20 overflow-hidden">
      {/* Browser-like Header */}
      <div className="bg-cyber-darker border-b border-cyber-blue/20 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">📧</span>
          <div className="flex-1 bg-cyber-gray px-3 py-2 rounded text-sm text-gray-400">
            Email Content Preview
          </div>
          <button className="text-gray-400 hover:text-cyber-blue transition-colors">
            🔍
          </button>
        </div>
      </div>

      {/* Email Content Area */}
      <div className="p-6">
        <div className="bg-white text-gray-900 rounded-lg p-6 min-h-[300px] font-sans">
          <div 
            onClick={handleLinkClick}
            dangerouslySetInnerHTML={{ __html: parsedContent.html || emailContent }}
            className="whitespace-pre-wrap break-words"
          />
        </div>

        {/* Link Analysis Panel */}
        {parsedContent.links && parsedContent.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <span className="text-xl mr-2">🔗</span>
              Detected Links ({parsedContent.links.length})
            </h4>
            <div className="space-y-3">
              {parsedContent.links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`bg-cyber-darker rounded-lg p-4 border-2 ${
                    hoveredLink === link ? getRiskBadge(link.riskLevel).split(' ')[2] : 'border-cyber-blue/20'
                  } transition-all cursor-pointer hover:shadow-cyber`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="text-2xl">{getRiskIcon(link.riskLevel)}</span>
                      <p className="text-sm text-gray-300 font-mono truncate">
                        {link.url}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskBadge(link.riskLevel)} ml-2`}>
                      {link.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  {hoveredLink === link && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-cyber-blue/20"
                    >
                      <p className="text-sm text-gray-400">{link.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4"
        >
          <h5 className="text-cyber-blue font-semibold mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Safety Tips
          </h5>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>• Hover over links before clicking to see the actual destination</li>
            <li>• Be cautious of shortened URLs (bit.ly, tinyurl) - they hide the real destination</li>
            <li>• Verify HTTPS and the padlock icon for secure connections</li>
            <li>• Never enter sensitive information on suspicious websites</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailPreview;
