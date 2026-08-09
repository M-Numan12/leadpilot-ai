'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Bell,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const getPageTitle = () => {
    if (pathname.startsWith('/admin')) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length === 1) return 'Admin Control Dashboard';
      const sub = parts[1];
      return `Admin - ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
    }
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 1) {
      const sub = parts[1];
      return sub.charAt(0).toUpperCase() + sub.slice(1).replace('-', ' ');
    }
    return 'Dashboard';
  };

  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Left Title & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {getPageTitle()}
          {isAdminRoute && (
            <span
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fcd34d',
                fontFamily: 'monospace',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ShieldCheck size={12} /> ADMIN MODE
            </span>
          )}
        </h1>
      </div>

      {/* Center Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '380px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search leads, campaigns, users, or admin logs..."
          style={{
            width: '100%',
            padding: '8px 16px 8px 36px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '10px',
            fontSize: '13px',
            color: '#f8fafc',
            outline: 'none'
          }}
        />
      </div>

      {/* Right Controls & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!isAdminRoute ? (
          <Link
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%)',
              color: '#fcd34d',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              textDecoration: 'none'
            }}
          >
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </Link>
        ) : (
          <Link
            href="/dashboard/overview"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '10px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              textDecoration: 'none'
            }}
          >
            <ExternalLink size={14} />
            <span>Back to Dashboard</span>
          </Link>
        )}

        {/* Notifications Icon */}
        <button
          style={{
            padding: '8px',
            color: '#94a3b8',
            backgroundColor: '#1e293b',
            borderRadius: '10px',
            border: '1px solid #334155',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Notifications"
        >
          <Bell size={16} />
          <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', backgroundColor: '#6366f1', borderRadius: '50%' }} />
        </button>

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid #1e293b' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', lineHeight: 1.2 }}>
              {user?.full_name || 'Admin User'}
            </span>
            <span style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.2 }}>
              {user?.is_superuser ? 'Super Administrator' : 'Sales Lead'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
