import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('phishguard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-redirect on 401 - let the component/context handle it
    // Just log the error for debugging
    if (error.response?.status === 401) {
      console.warn('API: 401 Unauthorized - Token may be invalid');
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Authentication
  signup: (name, email, password) => api.post('/api/auth/signup', { name, email, password }),
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  getProfile: () => api.get('/api/auth/me'),
  updateProfile: (updates) => api.put('/api/auth/profile', updates),

  // Scanning
  analyzeURL: (url) => api.post('/api/analyze/url', { url }),
  analyzeEmail: (emailContent) => api.post('/api/analyze/email', { email_content: emailContent }),

  // History
  getHistory: () => api.get('/api/history'),
  getHistoryStats: () => api.get('/api/history/stats'),
  deleteScan: (scanId) => api.delete(`/api/history/${scanId}`),
  saveScan: (scanData) => api.post('/api/history/save', scanData),
};

export default api;
