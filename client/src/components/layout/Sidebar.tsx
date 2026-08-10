'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Target,
  MessageSquare,
  FileText,
  Calendar,
  CheckSquare,
  BarChart3,
  Plug,
  CreditCard,
  Settings,
  Shield,
  Activity,
  Building2,
  Bot,
  Cpu,
  History,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Briefcase,
  Radio
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navigationSections: NavSection[] = [
    {
      title: 'Main Dashboard',
      items: [
        { label: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
        { label: 'CRM Kanban', href: '/dashboard/crm', icon: Target },
        { label: 'Leads Directory', href: '/dashboard/leads', icon: UserCheck },
        { label: 'AI Agent Desk', href: '/dashboard/ai-agent', icon: Bot, badge: 'AI' },
      ],
    },
    {
      title: 'Sales & Outreach',
      items: [
        { label: 'Inbound & Embeds', href: '/dashboard/inbound', icon: Radio, badge: 'NEW' },
        { label: 'Campaigns', href: '/dashboard/campaigns', icon: Briefcase },
        { label: 'Conversations', href: '/dashboard/conversations', icon: MessageSquare },
        { label: 'Proposals', href: '/dashboard/proposals', icon: FileText },
        { label: 'Calendar & Meetings', href: '/dashboard/calendar', icon: Calendar },
        { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
        { label: 'Team', href: '/dashboard/team', icon: Users },
      ],
    },
    {
      title: 'Analytics & Config',
      items: [
        { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Integrations', href: '/dashboard/integrations', icon: Plug },
        { label: 'Billing & Plans', href: '/dashboard/billing', icon: CreditCard },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      ],
    },
    {
      title: 'Admin Portal',
      adminOnly: true,
      items: [
        { label: 'Admin Dashboard', href: '/admin', icon: Shield, badge: 'PRO' },
        { label: 'User Management', href: '/admin/users', icon: Users },
        { label: 'System Health', href: '/admin/system', icon: Activity },
        { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
        { label: 'AI Agents Control', href: '/admin/agents', icon: Cpu },
        { label: 'Background Jobs', href: '/admin/jobs', icon: Sparkles },
        { label: 'Audit Logs', href: '/admin/logs', icon: History },
      ],
    },
  ];

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? '80px' : '260px',
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        borderRight: '1px solid #1e293b',
        transition: 'all 0.3s ease',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Header / Logo Section */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderBottom: '1px solid #1e293b',
            height: '64px'
          }}
        >
          {!collapsed ? (
            <Link href="/dashboard/overview" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
                }}
              >
                ⚡
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '800', fontSize: '17px', color: '#ffffff', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  LeadPilot <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>AI</span>
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Sales Automation</span>
              </div>
            </Link>
          ) : (
            <Link href="/dashboard/overview" style={{ margin: '0 auto', textDecoration: 'none' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                ⚡
              </div>
            </Link>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: '#1e293b',
              border: 'none',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div
          style={{
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 140px)'
          }}
        >
          {navigationSections.map((section, sIdx) => (
            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {!collapsed && (
                <div
                  style={{
                    padding: '0 10px 6px 10px',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{section.title}</span>
                  {section.adminOnly && (
                    <span
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#fbbf24',
                        fontSize: '9px',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontWeight: '600'
                      }}
                    >
                      ADMIN
                    </span>
                  )}
                </div>
              )}

              {section.items.map((item, iIdx) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));

                return (
                  <Link
                    key={iIdx}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '500',
                      textDecoration: 'none',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      background: isActive ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : 'transparent',
                      boxShadow: isActive ? '0 4px 12px rgba(79, 70, 229, 0.35)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <IconComponent
                      size={18}
                      style={{
                        color: isActive ? '#ffffff' : '#94a3b8',
                        flexShrink: 0
                      }}
                    />
                    {!collapsed && (
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        style={{
                          fontSize: '9px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          background: item.badge === 'PRO' ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'rgba(99, 102, 241, 0.2)',
                          color: item.badge === 'PRO' ? '#ffffff' : '#a5b4fc',
                          border: item.badge === 'PRO' ? 'none' : '1px solid rgba(99, 102, 241, 0.3)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Info & Sign Out Footer */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid #1e293b',
          background: 'rgba(11, 19, 41, 0.6)'
        }}
      >
        {!collapsed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '10px',
              background: '#1e293b',
              border: '1px solid #334155'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  flexShrink: 0
                }}
              >
                {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.full_name || 'Admin User'}
                </span>
                <span style={{ fontSize: '10px', color: '#818cf8', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.is_superuser ? 'Super Admin' : user?.email || 'admin@leadpilot.ai'}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '6px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '6px'
              }}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}
