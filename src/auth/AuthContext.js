import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

function safeParseUser(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('AuthContext: failed to parse donation_user from localStorage, clearing it.', err);
    try { localStorage.removeItem('donation_user'); } catch(e) {}
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeParseUser(localStorage.getItem('donation_user')));
  const [token, setToken] = useState(() => localStorage.getItem('donation_token') || null);

  useEffect(() => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('AuthContext: Authorization header set');
    } else {
      delete API.defaults.headers.common['Authorization'];
      console.log('AuthContext: Authorization header removed');
    }
  }, [token]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    try {
      console.log('AuthContext.login called with token:', token, 'user:', user);
      localStorage.setItem('donation_token', token);
      localStorage.setItem('donation_user', JSON.stringify(user));
    } catch (err) {
      console.warn('AuthContext: failed to store token/user', err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('donation_token');
      localStorage.removeItem('donation_user');
    } catch (err) {
      console.warn('AuthContext: failed to remove localStorage keys', err);
    }
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

