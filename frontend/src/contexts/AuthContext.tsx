'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export type UserRole = 'admin' | 'resident';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  unitId?: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  inviteCode?: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('residex_token');
    setToken(null);
    setUser(null);
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem('residex_token');
    if (!stored) {
      setIsLoading(false);
      return;
    }
    setToken(stored);
    api
      .get<User>('/auth/me')
      .then((u) => setUser(u))
      .catch(() => logout())
      .finally(() => setIsLoading(false));
  }, [logout]);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('residex_token', res.token);
    setToken(res.token);
    setUser(res.user);
    router.push(res.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/resident');
  };

  const register = async (data: RegisterData) => {
    const res = await api.post<{ token: string; user: User }>('/auth/register', data);
    localStorage.setItem('residex_token', res.token);
    setToken(res.token);
    setUser(res.user);
    router.push(res.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/resident');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
