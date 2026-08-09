'use client';

import React, { useState } from 'react';

interface LeadItem {
  id: string;
  companyName: string;
  website: string;
  email: string;
  phone: string;
  score: number;
  reason: string;
  stage: 'discovered' | 'qualified' | 'in_progress' | 'won' | 'lost';
  value: string;
}

export default function CRMKanbanPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'won'>('all');

  // Sample categorized CRM Pipeline data
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: '1',
      companyName: 'NexGen E-Commerce Inc',
      website: 'nexgen-shop.com',
      email: 'contact@nexgen-shop.com',
      phone: '+1 (415) 890-1234',
      score: 92,
      reason: 'Website conversion rate is low; strongly needs Next.js redesign.',
      stage: 'in_progress',
      value: '$4,500'
    },
    {
      id: '2',
      companyName: 'Urban Real Estate Group',
      website: 'urbanrealty-us.com',
      email: 'sales@urbanrealty-us.com',
      phone: '+1 (212) 555-0199',
      score: 85,
      reason: 'No mobile responsiveness; matches web-dev service portfolio.',
      stage: 'won',
      value: '$8,000'
    },
    {
      id: '3',
      companyName: 'CloudScale SaaS Solutions',
      website: 'cloudscale-io.net',
      email: 'founders@cloudscale-io.net',
      phone: '+1 (312) 400-8811',
      score: 78,
      reason: 'Outdated UI design identified during research scan.',
      stage: 'in_progress',
      value: '$6,200'
    },
    {
      id: '4',
      companyName: 'HealthTech BioLabs',
      website: 'healthtech-biolabs.com',
      email: 'info@healthtech-biolabs.com',
      phone: '+1 (650) 332-9011',
      score: 95,
      reason: 'Proposal approved by human review, meeting scheduled for Tuesday.',
      stage: 'in_progress',
      value: '$12,000'
    },
    {
      id: '5',
      companyName: 'Veritas Law Partners',
      website: 'veritaslaw.org',
      email: 'admin@veritaslaw.org',
      phone: '+1 (202) 789-0012',
      score: 88,
      reason: 'Contract signed! Full web development deal finalized.',
      stage: 'won',
      value: '$15,000'
    },
    {
      id: '6',
      companyName: 'Metro Logistics Co',
      website: 'metrologistics.io',
      email: 'contact@metrologistics.io',
      phone: '+1 (718) 600-4433',
      score: 45,
      reason: 'In-house IT team already working on redesign.',
      stage: 'lost',
      value: '$0'
    }
  ]);

  const columns = [
    { key: 'discovered', title: '📥 Discovered Leads', color: '#64748b' },
    { key: 'qualified', title: '⭐ Qualified (>70)', color: '#3b82f6' },
    { key: 'in_progress', title: '🔄 In Progress (Active)', color: '#8b5cf6' },
    { key: 'won', title: '🏆 Deals Won (Closed)', color: '#10b981' },
    { key: 'lost', title: '❌ Closed Lost', color: '#ef4444' }
  ];

  const moveStage = (id: string, newStage: LeadItem['stage']) => {
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stage: newStage } : item))
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '32px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            📊 CRM Deal Pipeline & Client Management
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Track lead lifecycle: In-Progress active conversations separated from Won deals.
          </p>
        </div>

        {/* View Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: '#1e293b',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #334155'
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'all' ? '#3b82f6' : 'transparent',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            All Pipeline
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'in_progress' ? '#8b5cf6' : 'transparent',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 In Progress Only
          </button>
          <button
            onClick={() => setActiveTab('won')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'won' ? '#10b981' : 'transparent',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🏆 Deals Won Only
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        {columns
          .filter((col) => {
            if (activeTab === 'in_progress') return col.key === 'in_progress';
            if (activeTab === 'won') return col.key === 'won';
            return true;
          })
          .map((col) => {
            const colLeads = leads.filter((item) => item.stage === col.key);
            return (
              <div
                key={col.key}
                style={{
                  background: '#1e293b',
                  borderRadius: '14px',
                  border: '1px solid #334155',
                  padding: '16px',
                  minHeight: '500px'
                }}
              >
                {/* Column Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  marginBottom: '16px',
                  borderBottom: `2px solid ${col.color}`
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>{col.title}</span>
                  <span style={{
                    background: '#0f172a',
                    color: col.color,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {colLeads.length}
                  </span>
                </div>

                {/* Lead Cards */}
                {colLeads.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b', fontSize: '13px' }}>
                    No leads in this stage
                  </div>
                ) : (
                  colLeads.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#0f172a',
                        borderRadius: '12px',
                        border: '1px solid #334155',
                        padding: '16px',
                        marginBottom: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <strong style={{ fontSize: '15px', color: '#f8fafc' }}>{item.companyName}</strong>
                        <span style={{
                          background: item.score >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                          color: item.score >= 80 ? '#6ee7b7' : '#93c5fd',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '6px'
                        }}>
                          Score {item.score}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: '#60a5fa', marginBottom: '6px' }}>🌐 {item.website}</div>

                      <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>
                        📧 {item.email}
                      </div>

                      <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '10px' }}>
                        📞 {item.phone}
                      </div>

                      <div style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        background: '#1e293b',
                        padding: '8px',
                        borderRadius: '6px',
                        marginBottom: '12px'
                      }}>
                        💡 <em>{item.reason}</em>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{item.value}</span>

                        {/* Move Actions */}
                        <select
                          value={item.stage}
                          onChange={(e) => moveStage(item.id, e.target.value as LeadItem['stage'])}
                          style={{
                            background: '#1e293b',
                            border: '1px solid #475569',
                            color: '#cbd5e1',
                            fontSize: '11px',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          <option value="discovered">Discovered</option>
                          <option value="qualified">Qualified</option>
                          <option value="in_progress">In Progress</option>
                          <option value="won">Deals Won</option>
                          <option value="lost">Lost</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
