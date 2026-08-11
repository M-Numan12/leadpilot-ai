'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleRoleSwitch = (selectedRole: 'user' | 'admin') => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'admin') {
      setEmail('admin@leadpilot-ai.online');
      setPassword('SuperAdmin2026!');
    } else {
      setEmail('');
      setPassword('');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const loggedUser = result.user;
      const cleanEmail = email.trim().toLowerCase();
      const isAdminUser = loggedUser?.is_superuser || cleanEmail.includes('admin') || cleanEmail.includes('numan');

      if (role === 'admin') {
        if (isAdminUser) {
          router.push('/admin');
        } else {
          setError('Access Denied: Standard Sales User accounts cannot access the Admin Portal. Please switch to the "Sales User" tab.');
        }
      } else {
        if (isAdminUser) {
          setError('Access Denied: Super Admin credentials detected. Please switch to the "Admin Portal" tab to log in.');
        } else {
          router.push('/dashboard/overview');
        }
      }
    } else {
      setError(result.error || 'Invalid email address or password. Only registered accounts can log in.');
    }
  };



  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#f8fafc',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(20px)',
          border: role === 'admin' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top Logo & Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: role === 'admin' ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              marginBottom: '16px',
              fontSize: '24px',
              fontWeight: 'bold',
              boxShadow: role === 'admin' ? '0 4px 16px rgba(245, 158, 11, 0.4)' : '0 4px 16px rgba(79, 70, 229, 0.4)'
            }}
          >
            ⚡
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
            LeadPilot AI
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            {role === 'admin' ? 'Super Administrator Portal & Operations' : 'Sales Automation & Prospecting Workspace'}
          </p>
        </div>

        {/* ROLE SELECTION TABS (ADMIN vs USER) */}
        <div
          style={{
            display: 'flex',
            background: '#0f172a',
            borderRadius: '14px',
            padding: '4px',
            marginBottom: '28px',
            border: '1px solid #334155'
          }}
        >
          <button
            type="button"
            onClick={() => handleRoleSwitch('user')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              background: role === 'user' ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : 'transparent',
              color: role === 'user' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={16} /> Sales User
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              background: role === 'admin' ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'transparent',
              color: role === 'admin' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={16} /> Admin Portal
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
              {role === 'admin' ? 'Super Administrator Email' : 'Work Email'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'numan@leadpilot-ai.online' : 'you@company.com'}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1' }}>
                Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: '12px', color: '#818cf8', textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: role === 'admin' ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: role === 'admin' ? '0 4px 16px rgba(245, 158, 11, 0.4)' : '0 4px 16px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>{loading ? 'Authenticating Email & Password...' : role === 'admin' ? 'Sign In to Admin Portal' : 'Sign In to Sales Workspace'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Quick Fill Buttons */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Quick Demo Auto-Fill</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleRoleSwitch('user')}
              style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#818cf8', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
            >
              💼 Sales User Credentials
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('admin')}
              style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fcd34d', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
            >
              🛡️ Super Admin Credentials
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          Need a new workspace?{' '}
          <Link href="/register" style={{ color: '#818cf8', fontWeight: '700', textDecoration: 'none' }}>
            Register Organization &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
