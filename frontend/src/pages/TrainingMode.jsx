import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TrainingMode = () => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Training questions database
  const questions = [
    {
      id: 1,
      type: 'email',
      content: 'URGENT: Your PayPal account will be suspended! Click here immediately to verify your information and prevent account closure.',
      isPhishing: true,
      difficulty: 'easy',
      explanation: 'This is phishing! Red flags: urgency tactics, threats, suspicious link, and impersonation of PayPal.',
      indicators: ['Urgency language', 'Threat of account closure', 'Requests immediate action', 'Likely fake link']
    },
    {
      id: 2,
      type: 'email',
      content: 'Hi team, here is the updated project timeline for Q2. Please review and let me know if you have any questions. Thanks!',
      isPhishing: false,
      difficulty: 'easy',
      explanation: 'This is safe! It\'s a normal work email with professional tone, no suspicious links, and reasonable request.',
      indicators: ['Professional language', 'Reasonable request', 'No urgency', 'Context-appropriate']
    },
    {
      id: 3,
      type: 'url',
      content: 'https://amaz0n-verify-account.tk/login?user=12345',
      isPhishing: true,
      difficulty: 'medium',
      explanation: 'Phishing URL! Uses "0" instead of "o", suspicious .tk domain, and unusual query parameters.',
      indicators: ['Typosquatting (amaz0n)', '.tk domain (often used by scammers)', 'Login request in URL', 'Suspicious parameters']
    },
    {
      id: 4,
      type: 'email',
      content: 'Congratulations! You\'ve been selected as a winner of our $10,000 prize draw! Click here to claim your reward now. This offer expires in 24 hours!',
      isPhishing: true,
      difficulty: 'easy',
      explanation: 'Classic phishing! Unsolicited prize, urgency, too-good-to-be-true offer, and pressure to act quickly.',
      indicators: ['Unsolicited prize', 'Urgency (24 hours)', 'Too good to be true', 'Requires immediate action']
    },
    {
      id: 5,
      type: 'url',
      content: 'https://www.bankofamerica.com/login',
      isPhishing: false,
      difficulty: 'medium',
      explanation: 'This is the legitimate Bank of America URL. Correct domain, HTTPS, no typos or suspicious elements.',
      indicators: ['Legitimate domain', 'HTTPS secure', 'No typos', 'Official website']
    },
    {
      id: 6,
      type: 'email',
      content: 'Your package delivery failed. Please update your shipping address at: http://fedex-tracking.info/update',
      isPhishing: true,
      difficulty: 'hard',
      explanation: 'Sophisticated phishing! Mimics legitimate delivery notification but uses fake domain and requests sensitive info.',
      indicators: ['Fake domain (not fedex.com)', 'HTTP (not HTTPS)', 'Unexpected delivery notice', 'Requests personal info']
    }
  ];

  const handleAnswer = (answer) => {
    if (showFeedback) return;

    const isCorrect = answer === questions[currentQuestion].isPhishing;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! Great job! 🎉');
    } else {
      toast.error('Incorrect. Learn from the explanation.');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameCompleted(false);
    setGameStarted(true);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'easy') return 'text-cyber-green';
    if (difficulty === 'medium') return 'text-yellow-400';
    return 'text-cyber-red';
  };

  const getScoreRating = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { title: 'Phishing Expert! 🏆', color: 'text-cyber-green', message: 'Perfect score! You\'re a cybersecurity pro!' };
    if (percentage >= 80) return { title: 'Great Job! 🌟', color: 'text-cyber-blue', message: 'Excellent awareness! Keep it up!' };
    if (percentage >= 60) return { title: 'Good Effort! 👍', color: 'text-yellow-400', message: 'You\'re learning! Review the explanations.' };
    return { title: 'Keep Practicing! 📚', color: 'text-cyber-red', message: 'Don\'t worry, everyone starts somewhere!' };
  };

  // Start Screen
  if (!gameStarted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-cyber-dark">
        {/* Navigation */}
        <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center">
                <span className="text-2xl mr-2">🛡️</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  PhishGuard
                </span>
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-cyber-blue transition-colors">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🎮</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent mb-4">
              Can You Spot the Phish?
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Test your phishing detection skills in this interactive training game!
            </p>

            <div className="bg-cyber-gray rounded-lg p-8 border border-cyber-blue/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">How to Play</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-4xl mb-3">📧</div>
                  <h4 className="text-cyber-blue font-semibold mb-2">Review Content</h4>
                  <p className="text-gray-400 text-sm">
                    Carefully read the email or URL presented to you
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🤔</div>
                  <h4 className="text-cyber-blue font-semibold mb-2">Make Your Choice</h4>
                  <p className="text-gray-400 text-sm">
                    Decide if it's legitimate or a phishing attempt
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">📚</div>
                  <h4 className="text-cyber-blue font-semibold mb-2">Learn & Improve</h4>
                  <p className="text-gray-400 text-sm">
                    Get instant feedback with detailed explanations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 mb-8">
              <h4 className="text-white font-semibold mb-4">Game Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-cyber-blue">{questions.length}</div>
                  <div className="text-sm text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyber-green">3</div>
                  <div className="text-sm text-gray-400">Difficulty Levels</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyber-purple">5 min</div>
                  <div className="text-sm text-gray-400">Estimated Time</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameStarted(true)}
              className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-12 py-4 rounded-lg text-xl font-semibold hover:shadow-cyber-green transition-all"
            >
              Start Training 🚀
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameCompleted) {
    const rating = getScoreRating();
    const percentage = ((score / questions.length) * 100).toFixed(0);

    return (
      <div className="min-h-screen bg-cyber-dark">
        <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center">
                <span className="text-2xl mr-2">🛡️</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  PhishGuard
                </span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h1 className={`text-5xl font-bold ${rating.color} mb-4`}>
              {rating.title}
            </h1>
            <p className="text-xl text-gray-400 mb-8">{rating.message}</p>

            <div className="bg-cyber-gray rounded-lg p-8 border border-cyber-blue/20 mb-8">
              <div className="text-6xl font-bold text-white mb-4">
                {score} / {questions.length}
              </div>
              <div className="text-cyber-blue text-2xl font-semibold mb-6">
                {percentage}% Correct
              </div>

              <div className="bg-cyber-darker rounded-full h-4 overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyber-darker rounded-lg p-4">
                  <div className="text-cyber-green text-3xl font-bold">{score}</div>
                  <div className="text-gray-400 text-sm">Correct Answers</div>
                </div>
                <div className="bg-cyber-darker rounded-lg p-4">
                  <div className="text-cyber-red text-3xl font-bold">{questions.length - score}</div>
                  <div className="text-gray-400 text-sm">Incorrect Answers</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
                className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white px-8 py-3 rounded-lg font-semibold hover:shadow-cyber-green transition-all"
              >
                Play Again 🔄
              </motion.button>
              <Link
                to="/dashboard"
                className="bg-cyber-gray text-white px-8 py-3 rounded-lg font-semibold border border-cyber-blue/30 hover:border-cyber-blue hover:shadow-cyber transition-all"
              >
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game Questions
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <nav className="bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                PhishGuard Training
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-cyber-blue font-semibold">
                Score: {score}/{questions.length}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className={getDifficultyColor(question.difficulty)}>
              {question.difficulty.toUpperCase()}
            </span>
          </div>
          <div className="bg-cyber-darker rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-cyber-gray rounded-lg p-8 border border-cyber-blue/20 mb-6"
          >
            <div className="mb-6">
              <span className="text-sm text-cyber-blue font-semibold px-3 py-1 bg-cyber-blue/20 rounded-full">
                {question.type.toUpperCase()}
              </span>
            </div>

            <div className="bg-cyber-darker rounded-lg p-6 mb-6">
              <p className="text-white text-lg leading-relaxed font-mono">
                {question.content}
              </p>
            </div>

            {!showFeedback ? (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(false)}
                  className="bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border-2 border-cyber-green/50 py-6 rounded-lg font-bold text-xl transition-all"
                >
                  ✅ Legitimate
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(true)}
                  className="bg-cyber-red/20 hover:bg-cyber-red/30 text-cyber-red border-2 border-cyber-red/50 py-6 rounded-lg font-bold text-xl transition-all"
                >
                  ⚠️ Phishing
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-6 border-2 ${
                  selectedAnswer === question.isPhishing
                    ? 'bg-cyber-green/10 border-cyber-green'
                    : 'bg-cyber-red/10 border-cyber-red'
                }`}
              >
                <h4 className={`text-2xl font-bold mb-4 ${
                  selectedAnswer === question.isPhishing ? 'text-cyber-green' : 'text-cyber-red'
                }`}>
                  {selectedAnswer === question.isPhishing ? '✅ Correct!' : '❌ Incorrect'}
                </h4>
                
                <div className="mb-4">
                  <p className="text-white font-semibold mb-2">Explanation:</p>
                  <p className="text-gray-300">{question.explanation}</p>
                </div>

                <div className="mb-6">
                  <p className="text-white font-semibold mb-2">Key Indicators:</p>
                  <ul className="space-y-2">
                    {question.indicators.map((indicator, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-cyber-blue mr-2">•</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green text-white py-4 rounded-lg font-bold text-lg"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrainingMode;
