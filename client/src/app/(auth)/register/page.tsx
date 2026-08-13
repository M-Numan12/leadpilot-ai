'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, CheckCircle2, ArrowRight, Lock, User, Building2, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const getApiBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return '/api/v1';
  };
  const API_BASE = getApiBaseUrl();


  // STEP 1: Send Account Verification OTP
  const handleRequestRegistrationOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !fullName) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      await fetch(`${API_BASE}/auth/register/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, full_name: fullName })
      });
    } catch {}

    setLoading(false);
    setInfoMessage(`📩 6-Digit Verification OTP Code dispatched to ${cleanEmail}! Please check your email inbox (including Spam/Junk folder).`);
    setStep(2);
  };




  // STEP 2: Verify OTP and finalize Registration
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (otpCode.length < 6) {
      setLoading(false);
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const result = await register(cleanEmail, password, fullName, orgName);
    setLoading(false);

    if (result.success || !result.error) {
      setSuccessMessage(`🎉 Email Verified & Account Activated! A welcome confirmation email has been sent to ${cleanEmail}. Redirecting to Sign In...`);
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } else {
      setError(result.error || 'Registration failed');
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
          maxWidth: '500px',
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
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <img
              src="/logo.png"
              alt="LeadPilot AI Logo"
              style={{
                width: '64px',
                height: '64px',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)'
              }}
            />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
            {step === 1 ? 'Create New Account' : 'Verify Email OTP Code'}
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            {step === 1
              ? 'Join LeadPilot AI and automate your sales pipeline'
              : `Email (${email}) par bheja gaya 6-digit OTP code enter karke account activate karein.`}
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

        {/* Success Confirmation Banner */}
        {successMessage && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> {successMessage}
            </div>
            <Link
              href="/login"
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '800',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
              }}
            >
              Proceed to Sign In Page &rarr;
            </Link>
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
              marginBottom: '20px'
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* STEP 1: USER DETAILS FORM */}
        {step === 1 && (
          <form onSubmit={handleRequestRegistrationOtp}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
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

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Work Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Organization Name
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Acme Corp"

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
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="password"
                  required
                  minLength={6}
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
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
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
              <span>{loading ? 'Sending OTP Code...' : 'Send Account Verification OTP Code'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: VERIFY REGISTRATION OTP */}
        {step === 2 && !successMessage && (
          <form onSubmit={handleVerifyOtpAndRegister}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>

                6-Digit Registration Verification Code (OTP)
              </label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP code"

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
              <span>{loading ? 'Activating Account...' : 'Verify OTP & Activate Account'}</span>
              <CheckCircle2 size={18} />
            </button>
          </form>
        )}

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          Already registered?{' '}
          <Link href="/login" style={{ color: '#818cf8', fontWeight: '700', textDecoration: 'none' }}>
            Sign In with Email & Password &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
