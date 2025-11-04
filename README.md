# 🛡️ PhishGuard - Real-Time Phishing Detection System

A modern, production-ready full-stack application for real-time phishing detection with authentication, analytics dashboard, and comprehensive security features.

![PhishGuard](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.3.0-F7931E?style=for-the-badge&logo=scikit-learn)

## ✨ Features

- 🔍 **Dual Scanner**: Analyze both emails and URLs for phishing threats
- 📊 **Analytics Dashboard**: Track scans, threats, and trends with interactive charts
- 🔐 **Authentication System**: Secure login/signup with protected routes
- 👤 **User Profile**: Manage account settings and preferences
- 🎨 **Modern UI**: Cybersecurity-themed dark design with smooth animations
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🎯 **Training Mode**: Educational phishing detection scenarios
- 🧠 **Advanced Explainability**: AI-powered analysis with detailed threat intelligence
- 📧 **Email Analysis**: Comprehensive email tone and content analysis
- 📈 **Model Comparison**: Compare multiple detection models side-by-side
   🧠 **AI-Powered Detection**: Machine learning models with 85%+ accuracy
- 🔗 **Real-time Analysis**: Instant URL and email phishing detection
- 📊 **Model Explainability**: Detailed reasoning for every detection
- 🚀 **FastAPI Backend**: High-performance Python API with auto-docs
- 🔍 **Advanced Feature Extraction**: URL structure and email content analysis

## 📂 Project Structure

```
PhishGuard/
├── frontend/              # React + Vite frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
└── backend/               # Python FastAPI backend with AI models
│   ├── api/
│   │   └── main.py        # FastAPI server (port 8000)
│   ├── models/
│   │   ├── url_model.pkl      # URL phishing detection model
│   │   ├── email_model.pkl    # Email phishing detection model
│   │   └── phishing_predictor.py  # AI prediction engine
│   └── requirements.txt   # Python dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pushkargupta75/PhishGuard.git
   cd PhishGuard
   ```

2. **Navigate to frontend**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

   ## 🐍 Backend Setup (Python)

The AI-powered phishing detection backend is now available!

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation & Running

1. **Navigate to backend**
   ```bash
   cd backend
2. **Install Python dependencies**
    pip install -r requirements.txt
3.**Start the FastAPI server**
   bash
cd api
python main.py

4.**Access the backend**
API Server: http://localhost:8000

API Documentation: http://localhost:8000/docs

Health Check: http://localhost:8000/api/health

## 📊 Datasets

The AI models were trained on publicly available cybersecurity datasets from Kaggle:

### 🔗 URL Phishing Detection
- **Dataset:** [Malicious URLs Dataset](https://www.kaggle.com/datasets/sid321axn/malicious-urls-dataset)
- **Size:** 450,000+ URLs
- **Labels:** Malicious vs Benign
- **Features:** URL length, domain characteristics, suspicious patterns
- **Purpose:** Train URL structure analysis model

### 📧 Email Phishing Detection
- **Dataset:** [Email Phishing Dataset](https://www.kaggle.com/datasets/ethancratchley/email-phishing-dataset)
- **Content:** Phishing and legitimate email samples
- **Labels:** Phishing vs Safe
- **Features:** Linguistic patterns, urgency indicators, suspicious keywords
- **Purpose:** Train email content analysis model

### 🎯 Model Performance
- **URL Detection Accuracy:** 85%+
- **Email Detection Accuracy:** 82%+
- **Algorithm:** Random Forest Classifier
- **Training Samples:** 1000+ combined samples
- **Feature Engineering:** Custom URL parsing and text analysis

## 🧠 AI Models & Algorithms

### URL Phishing Detection
- **Algorithm:** Random Forest Classifier
- **Features:** URL length, domain characteristics, suspicious patterns
- **Accuracy:** 85%+ on test data
- **Training Data:** 450,000+ URLs from Kaggle

### Email Phishing Detection  
- **Algorithm:** Random Forest Classifier
- **Features:** Linguistic patterns, urgency indicators, keyword analysis
- **Accuracy:** 82%+ on test data
- **Training Data:** Email phishing dataset from Kaggle

### Model Configuration
```python
RandomForestClassifier(
    n_estimators=100,    # 100 decision trees
    max_depth=10,        # Maximum tree depth
    random_state=42,     # Reproducible results
    n_jobs=-1           # Use all CPU cores
)


### Build for Production

```bash
cd frontend
npm run build
npm run preview
```

## 📦 Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite 7.1** - Build tool and dev server
- **TailwindCSS 3.4** - Utility-first CSS
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend 
-**FastAPI 0.104.1** - Modern Python web framework
-**Scikit-learn 1.3.0** - Machine learning models
-**Random Forest** - AI classification algorithm
-**Pandas & NumPy** - Data processing
-**Uvicorn** - ASGI server

## API Endpoints
Method	Endpoint	Description
POST	/api/analyze/url	Analyze URL for phishing
POST	/api/analyze/email	Analyze email content
GET	/api/health	Service health check
GET	/docs	Interactive API documentation

**Example API Usage**
Analyze URL:

bash
curl -X POST "http://localhost:8000/api/analyze/url" \
  -H "Content-Type: application/json" \
  -d '{"url": "http://paypal-security-verify.com/login"}'
Analyze Email:

bash
curl -X POST "http://localhost:8000/api/analyze/email" \
  -H "Content-Type: application/json" \
  -d '{"emailText": "URGENT: Your account will be suspended!"}'
Running Complete System
Terminal 1 - Backend:

bash
cd backend/api
python main.py
Terminal 2 - Frontend:

bash
cd frontend
npm run dev
Access:

Frontend: http://localhost:3000

Backend API: http://localhost:8000

API Docs: http://localhost:8000/docs

## 🗺️ Application Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/scanner` | Phishing scanner | No |
| `/training` | Training scenarios | No |
| `/dashboard` | Analytics dashboard | Yes |
| `/profile` | User profile | Yes |

## 📝 Available Scripts (Frontend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Change Port

Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001, // Change port here
  },
})
```

### Update Theme Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  cyber: {
    dark: '#0a0e27',
    blue: '#00d9ff',
    green: '#00ff88',
    red: '#ff0055',
  }
}
```

## 🌐 Backend Integration

The app now connects to the real AI backend! Update your frontend configuration:

**Frontend automatically connects to:** `http://localhost:8000`

**API Response Format:**
```json
{
  "classification": "safe" | "malicious",
  "confidence": 0.95,
  "highlighted_text": "Suspicious patterns detected...",
  "explanation": "AI-detected phishing indicators...",
  "features": { ... }
}

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

**Build errors?**
```bash
# Clean install
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Routing issues in production?**

For **Netlify**, create `frontend/public/_redirects`:
```
/*    /index.html   200
```

For **Vercel**, create `frontend/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## 🚧 Future Development

- [ ] Backend API with Node.js/Express
- [ ] Machine Learning model integration
- [ ] Real-time threat intelligence feeds
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication with JWT
- [ ] Email verification system
- [ ] Advanced analytics and reporting
- [ ] API rate limiting and security
- [ ] Deployment pipelines (CI/CD)

## 📄 License

MIT License - Free to use in your projects

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Contact

**Pushkar Gupta** - [@pushkargupta75](https://github.com/pushkargupta75)

Project Link: [https://github.com/pushkargupta75/PhishGuard](https://github.com/pushkargupta75/PhishGuard)

---

**Built for cybersecurity awareness**
