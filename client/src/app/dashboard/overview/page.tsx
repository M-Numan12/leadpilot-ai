'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardOverviewPage() {
  const { user, logout } = useAuth();
  const [promptText, setPromptText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchOutput, setSearchOutput] = useState<string | null>(null);

  // Phase 2 Metric Counters
  const metrics = [
    { label: 'Total Leads', count: '128', icon: '🎯', change: '+14% this week', color: '#3b82f6' },
    { label: 'Qualified Leads', count: '42', icon: '⭐', change: 'Scored > 70', color: '#10b981' },
    { label: 'Conversations', count: '18', icon: '💬', change: 'Active threads', color: '#8b5cf6' },
    { label: 'Proposals', count: '12', icon: '📝', change: 'Generated drafts', color: '#f59e0b' },
    { label: 'Meetings', count: '5', icon: '📅', change: 'Scheduled', color: '#ec4899' },
    { label: 'Won Leads', count: '8', icon: '🏆', change: '$42,500 closed', color: '#06b6d4' },
  ];

  const handleAgentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsSearching(true);
    setSearchOutput(null);

    // Simulate Research Agent Trigger
    setTimeout(() => {
      setIsSearching(false);
      setSearchOutput(`✅ Research Agent triggered for: "${promptText}". Identifying matching target companies...`);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '32px'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
            Sales Automation Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
            Welcome back, <strong style={{ color: '#60a5fa' }}>{user?.full_name || user?.email || 'Sales Manager'}</strong> 👋
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              background: '#1e293b',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #334155',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: m.color
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{m.label}</span>
              <span style={{ fontSize: '20px' }}>{m.icon}</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#f8fafc', marginBottom: '4px' }}>
              {m.count}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* AI Research Agent Prompt Area (Phase 3 Prep) */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)',
        border: '1px solid #4338ca',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '32px',
        boxShadow: '0 10px 25px -5px rgba(67, 56, 202, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>🤖</span>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>AI Research Agent</h2>
            <p style={{ color: '#a5b4fc', fontSize: '13px', margin: 0 }}>
              Ask the agent to find targeted clients using permitted web research
            </p>
          </div>
        </div>

        <form onSubmit={handleAgentSearch} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder='e.g., "USA mein meri web-development service ke liye 20 potential clients find karo."'
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: '10px',
              background: '#0f172a',
              border: '1px solid #475569',
              color: '#f8fafc',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isSearching}
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isSearching ? 'not-allowed' : 'pointer',
              opacity: isSearching ? 0.7 : 1,
              boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.4)'
            }}
          >
            {isSearching ? 'Agent Researching...' : 'Run Research Agent'}
          </button>
        </form>

        {searchOutput && (
          <div style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            color: '#6ee7b7',
            fontSize: '14px'
          }}>
            {searchOutput}
          </div>
        )}
      </div>
    </div>
  );
}
