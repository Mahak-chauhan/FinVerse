import { createContext, useState, useEffect, useCallback } from 'react';
import {
  login as loginApi,
  register as registerApi,
  getMe,
} from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const persistAuth = useCallback((data) => {
    localStorage.setItem('token', data.token);
    const { token, ...userData } = data;
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const res = await loginApi({ email, password });
      persistAuth(res.data.data);
      return res.data.data;
    },
    [persistAuth]
  );

  const register = useCallback(
    async (userData) => {
      const res = await registerApi(userData);
      persistAuth(res.data.data);
      return res.data.data;
    },
    [persistAuth]
  );

  const fetchMe = useCallback(async () => {
    try {
      const res = await getMe();
      setUser(res.data.data);
      localStorage.setItem('user', JSON.stringify(res.data.data));
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, loading, login, register, logout, fetchMe, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
