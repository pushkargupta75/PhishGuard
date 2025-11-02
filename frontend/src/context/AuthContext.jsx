import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

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

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('phishguard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=00d9ff&color=fff`,
        subscription: 'Pro',
        joinedDate: new Date().toISOString(),
      };

      localStorage.setItem('phishguard_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Mock signup - replace with actual API call
      const mockUser = {
        id: Date.now(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=00d9ff&color=fff`,
        subscription: 'Free',
        joinedDate: new Date().toISOString(),
      };

      localStorage.setItem('phishguard_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('phishguard_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('phishguard_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
