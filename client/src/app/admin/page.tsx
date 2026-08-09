'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Activity,
  Building2,
  Cpu,
  Sparkles,
  History,
  ArrowRight,
  TrendingUp,
  Server,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const adminModules = [
    {
      title: 'User Management',
      desc: 'Manage platform accounts, permissions, superuser status, and access roles.',
      href: '/admin/users',
      icon: Users,
      count: '1,420 Users',
      color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      badge: 'Active'
    },
    {
      title: 'System Health & Metrics',
      desc: 'Monitor server CPU, memory, database latency, and API error rates.',
      href: '/admin/system',
      icon: Activity,
      count: '99.98% Uptime',
      color: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      badge: 'Healthy'
    },
    {
      title: 'Organizations & Subscriptions',
      desc: 'Manage enterprise tenants, seat quotas, billing tiers, and usage limits.',
      href: '/admin/organizations',
      icon: Building2,
      count: '86 Tenants',
      color: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      badge: 'Tier 1'
    },
    {
      title: 'AI Agents Control',
      desc: 'Configure prompt templates, OpenAI/Anthropic keys, and agent performance limits.',
      href: '/admin/agents',
      icon: Cpu,
      count: '6 Active Agents',
      color: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
      badge: 'Live'
    },
    {
      title: 'Background Jobs & Queue',
      desc: 'Monitor Celery/Redis tasks, retry failed jobs, and review worker throughput.',
      href: '/admin/jobs',
      icon: Sparkles,
      count: '0 Pending',
      color: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      badge: 'Processing'
    },
    {
      title: 'Audit Logs & Traceability',
      desc: 'Review security logs, authentication attempts, API keys, and administrative actions.',
      href: '/admin/logs',
      icon: History,
      count: '12.4k Events',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      badge: 'Protected'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Banner Header */}
      <div
        style={{
          padding: '32px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ padding: '8px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Shield size={22} />
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                Admin Control Center
              </h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, maxWidth: '600px', lineHeight: '1.6' }}>
              LeadPilot AI System Administration & Operations Dashboard. Monitor platform infrastructure, user authorization, multi-tenant organizations, and autonomous AI agents.
            </p>
          </div>

          <div>
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} /> Quick System Health Check
            </button>
          </div>
        </div>
      </div>

      {/* System Metrics Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Registered Users</span>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>1,420</div>
            <span style={{ fontSize: '12px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={12} /> +12% this month
            </span>
          </div>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <Users size={24} />
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Server CPU & Load</span>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>18.4%</div>
            <span style={{ fontSize: '12px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <CheckCircle2 size={12} /> Optimal Performance
            </span>
          </div>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Server size={24} />
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PostgreSQL DB Pool</span>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>12 / 100</div>
            <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Latency: 4.2ms
            </span>
          </div>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <Database size={24} />
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Celery Workers</span>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>8 Workers</div>
            <span style={{ fontSize: '12px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <AlertTriangle size={12} /> 0 Queue Backlog
            </span>
          </div>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <Cpu size={24} />
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} style={{ color: '#818cf8' }} />
          Administrative Tools & Modules
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {adminModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                href={mod.href}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
                      <Icon size={22} style={{ margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: '700', padding: '3px 10px', borderRadius: '9999px', background: '#0f172a', color: '#cbd5e1', border: '1px solid #334155' }}>
                      {mod.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {mod.title}
                    <ArrowRight size={16} style={{ color: '#818cf8' }} />
                  </h4>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '8px', lineHeight: '1.5', margin: '8px 0 0 0' }}>
                    {mod.desc}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#cbd5e1' }}>
                  <span>{mod.count}</span>
                  <span style={{ color: '#818cf8' }}>Manage module &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
