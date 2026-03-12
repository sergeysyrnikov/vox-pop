'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.access_token) {
      setUser({ token: response.access_token });
      localStorage.setItem('token', response.access_token);
      router.push('/surveys');
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Login failed' };
  };

  const register = async (email, password) => {
    const response = await authService.register(email, password);
    if (response.access_token) {
      setUser({ token: response.access_token });
      localStorage.setItem('token', response.access_token);
      setUser({ token: response.access_token });
      router.push('/surveys');
      return { success: true, message: 'Registration successful' };
    }
    return { success: false, message: 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
    return { success: true, message: 'Logout successful' };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
