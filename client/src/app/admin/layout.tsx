'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in -> Redirect to login
        router.push('/login');
      } else if (!user.is_superuser) {
        // Not a superuser -> Redirect to standard dashboard
        router.push('/dashboard/overview');
      }
    }
  }, [user, isLoading, router]);

  // Loading spinner while checking credentials
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Loader2 size={36} className="animate-spin text-amber-400" />
          <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Verifying Super Administrator Access...</span>
        </div>
      </div>
    );
  }

  // Access Denied fallback UI for non-superusers
  if (!user || !user.is_superuser) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', padding: '24px' }}>
        <div style={{ background: '#1e293b', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '20px', padding: '36px', maxWidth: '440px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', marginBottom: '16px' }}>
            <ShieldAlert size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff' }}>Access Denied</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 24px 0' }}>
            The Admin Control Portal is strictly restricted to Super Administrators only. Please log in with an authorized Super Admin email & password.
          </p>
          <button
            onClick={() => router.push('/login')}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', border: 'none', color: '#ffffff', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
          >
            Go to Admin Login Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: '260px', transition: 'all 0.3s ease' }}>
        <Header />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
