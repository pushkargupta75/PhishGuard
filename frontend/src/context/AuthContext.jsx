import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:8000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for stored token and user session
    const storedToken = localStorage.getItem('phishguard_token');
    const storedUser = localStorage.getItem('phishguard_user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    
    // Always set loading to false after checking localStorage
    setLoading(false);
  }, []);

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('phishguard_token');
    localStorage.removeItem('phishguard_user');
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data;
        
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        localStorage.setItem('phishguard_token', authToken);
        localStorage.setItem('phishguard_user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { success: false, error: response.data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed. Please try again.' 
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data;
        
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        localStorage.setItem('phishguard_token', authToken);
        localStorage.setItem('phishguard_user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { success: false, error: response.data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Signup failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    clearAuth();
  };

  const updateProfile = async (updates) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        updates,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('phishguard_user', JSON.stringify(updatedUser));
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to update profile' 
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    token,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
