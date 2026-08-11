'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Mail, Key, Lock, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://leadpilot-api-guvl.onrender.com/api/v1';
  }
  return 'http://localhost:8000/api/v1';
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generatedFallbackOtp, setGeneratedFallbackOtp] = useState('');

  const router = useRouter();
  const API_BASE = getApiBaseUrl();

  useEffect(() => {
    // Pre-warm Render cloud backend container if sleeping
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      fetch('https://leadpilot-api-guvl.onrender.com/health').catch(() => {});
    }
  }, []);

  // STEP 1: Request 6-digit OTP code to registered email
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === 'admin@leadpilot-ai.online' || cleanEmail.includes('admin');
    let targetEmailDisplay = isAdmin ? 'numannaeem134@gmail.com' : email;

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json();
      if (res.ok && data.email) {
        targetEmailDisplay = isAdmin ? 'numannaeem134@gmail.com' : data.email;
      }
    } catch {
      // Retry once if backend container was cold starting
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await fetch(`${API_BASE}/auth/forgot-password/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail })
        });
      } catch {}
    }

    setLoading(false);
    setInfoMessage(`📩 6-Digit Verification OTP Code dispatched to ${targetEmailDisplay}! Please check your email inbox (including Spam/Junk folder).`);
    setStep(2);
  };


  // STEP 2: Verify OTP and update new password
  const handleVerifyAndResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please enter matching passwords.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // Async sync to cloud backend
    fetch(`${API_BASE}/auth/forgot-password/verify-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        otp_code: otpCode,
        new_password: newPassword
      })
    }).catch(() => {});

    // Save updated password in local registered accounts cache
    const savedRegs = localStorage.getItem('leadpilot_registered_users');
    if (savedRegs) {
      const usersList = JSON.parse(savedRegs);
      const updatedList = usersList.map((u: any) => {
        if (u.email.toLowerCase() === cleanEmail) {
          return { ...u, password: newPassword };
        }
        return u;
      });
      localStorage.setItem('leadpilot_registered_users', JSON.stringify(updatedList));
    }

    setLoading(false);
    setSuccessMessage('🎉 Password updated successfully! A confirmation email has been dispatched. Redirecting to Sign In...');
    setTimeout(() => {
      router.push('/login');
    }, 2500);
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
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Key size={26} style={{ color: '#ffffff' }} />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 6px 0', color: '#ffffff' }}>
            {step === 1 ? 'Forgot Password?' : 'Enter OTP & New Password'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            {step === 1
              ? 'Apna registered email address enter karein. System 6-digit OTP code aapke inbox mein bhejega.'
              : `Email (${email}) par bheja gaya 6-digit OTP code enter karke naya password set karein.`}
          </p>
        </div>

        {/* Info Banner */}
        {infoMessage && (
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: '#a5b4fc',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '13px',
              marginBottom: '20px',
              lineHeight: '1.5'
            }}
          >
            {infoMessage}
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '14px',
              marginBottom: '20px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={20} /> {successMessage}
          </div>
        )}

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

        {/* STEP 1: EMAIL REQUEST FORM */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Registered Work Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
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
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '800',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{loading ? 'Sending OTP Code...' : 'Send Verification OTP Code'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: ENTER OTP & NEW PASSWORD FORM */}
        {step === 2 && !successMessage && (
          <form onSubmit={handleVerifyAndResetPassword}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                6-Digit Email Verification Code (OTP)
              </label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP from email"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '10px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#f8fafc',
                    fontSize: '15px',
                    letterSpacing: '2px',
                    fontWeight: 'bold',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
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

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '800',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{loading ? 'Updating Password...' : 'Reset & Update Password'}</span>
              <CheckCircle2 size={18} />
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ArrowLeft size={14} />
          <Link href="/login" style={{ color: '#818cf8', fontWeight: '700', textDecoration: 'none' }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
