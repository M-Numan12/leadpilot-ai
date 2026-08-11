'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  is_superuser: boolean;
  is_unlimited_credits?: boolean;
  ai_credits?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (email: string, pass: string, fullName?: string, orgName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://leadpilot-api-guvl.onrender.com/api/v1';
  }
  return 'http://localhost:8000/api/v1';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const API_BASE = getApiBaseUrl();

  useEffect(() => {
    const savedToken = localStorage.getItem('leadpilot_token');
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch {
      // If server unavailable, keep token for retry
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.detail || 'Invalid email or password. Only registered accounts can sign in.' };
      }
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('leadpilot_token', data.access_token);
      return { success: true, user: data.user };
    } catch {
      return { success: false, error: 'Cannot connect to backend server. Please verify backend service status.' };
    }
  };



  const register = async (email: string, pass: string, fullName?: string, orgName?: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: pass,
          full_name: fullName,
          organization_name: orgName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.detail || 'Registration failed' };
      }
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('leadpilot_token', data.access_token);
      return { success: true };
    } catch {
      return { success: false, error: 'Cannot connect to backend server' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('leadpilot_token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
