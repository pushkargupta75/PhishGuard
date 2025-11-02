# 🛡️ PhishGuard - Real-Time Phishing Detection System

A modern, production-ready full-stack application for real-time phishing detection with authentication, analytics dashboard, and comprehensive security features.

![PhishGuard](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)

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
└── backend/              # Backend services (coming soon)
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

### Backend (Coming Soon)
- Node.js / Express
- MongoDB / PostgreSQL
- JWT Authentication
- ML Model Integration

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

The app works in demo mode by default. To connect to a backend API:

Update `frontend/src/pages/Scanner.jsx`:
```javascript
const API_ENDPOINT = 'https://your-backend-api.com/analyze';
```

Expected API response format:
```json
{
  "classification": "safe" | "malicious",
  "confidence": 0.87,
  "highlighted_text": "Suspicious content...",
  "explanation": "Detection reasoning..."
}
```

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
