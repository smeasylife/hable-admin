import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage or sessionStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      // You can validate the token here
      setIsAuthenticated(true);
      setUser({ email: localStorage.getItem('userEmail') });
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with your actual authentication logic
      if (email === 'admin@hable.com' && password === 'admin123') {
        const token = 'fake-jwt-token';
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);
        setUser({ email });
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
      }
    } catch (error) {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};