'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
