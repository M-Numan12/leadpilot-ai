'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Sparkles,
  Search,
  Globe,
  Briefcase,
  Mail,
  Linkedin,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Send,
  Zap,
  Target,
  FileText,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Layers,
  Award,
  Building2
} from 'lucide-react';


interface ProspectLead {
  id: string;
  name: string;
  title: string;
  company: string;
  country: string;
  source: 'LinkedIn' | 'Web Search' | 'Upwork' | 'Company Registry';
  email: string;
  phone: string;
  score: number;
  pitch: string;
  channel: 'Email' | 'LinkedIn' | 'Phone' | 'Upwork';
  status: 'Pending' | 'In Negotiation' | 'Closed / Won';
}

export default function AIAgentDeskPage() {
  // Step 1: AI Business Interview State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessService, setBusinessService] = useState('Web & Mobile App Development');
  const [targetIndustry, setTargetIndustry] = useState('E-Commerce & SaaS');
  const [targetRegion, setTargetRegion] = useState('USA & UK');
  const [selectedChannels, setSelectedChannels] = useState({
    email: true,
    linkedin: true,
    phone: true,
    upwork: true
  });

  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentLog, setAgentLog] = useState<string | null>(null);

  // Generated Prospect Leads Database
  const [prospects, setProspects] = useState<ProspectLead[]>([
    {
      id: 'lead-1',
      name: 'Jonathan Vance',
      title: 'CEO & Founder',
      company: 'Apex Retail Solutions',
      country: 'USA',
      source: 'LinkedIn',
      email: 'j.vance@apexretail.com',
      phone: '+1 (555) 234-8901',
      score: 96,
      pitch: 'Hi Jonathan, I saw Apex Retail is scaling e-commerce infrastructure. Our web development team builds high-converting Shopify & Custom Next.js platforms...',
      channel: 'Email',
      status: 'In Negotiation'
    },
    {
      id: 'lead-2',
      name: 'Sophia Al-Mansoor',
      title: 'Head of Growth',
      company: 'Vanguard Global Tech',
      country: 'Dubai, UAE',
      source: 'Web Search',
      email: 'sophia@vanguardtech.ae',
      phone: '+971 50 123 4567',
      score: 92,
      pitch: 'Hello Sophia, noticed Vanguard Tech is expanding cloud services. We specialize in custom web apps and AI integrations...',
      channel: 'LinkedIn',
      status: 'Pending'
    },
    {
      id: 'lead-3',
      name: 'Marcus Sterling',
      title: 'VP of Product',
      company: 'FinPulse Systems',
      country: 'UK',
      source: 'Upwork',
      email: 'm.sterling@finpulse.co.uk',
      phone: '+44 20 7946 0912',
      score: 98,
      pitch: 'Marcus, regarding your fintech app modernization project on Upwork: Our team delivers high-security React & Python backend systems...',
      channel: 'Upwork',
      status: 'Closed / Won'
    },
    {
      id: 'lead-4',
      name: 'Elena Rostova',
      title: 'Operations Director',
      company: 'Nordic Logistics Inc',
      country: 'Sweden',
      source: 'Company Registry',
      email: 'elena@nordiclogistics.se',
      phone: '+46 8 123 456',
      score: 88,
      pitch: 'Hi Elena, custom logistics portal demo available. We build real-time shipment tracking dashboards...',
      channel: 'Phone',
      status: 'Pending'
    }
  ]);

  // Run AI Global Search Agent Simulation
  const handleRunAgentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAgentRunning(true);
    setAgentLog(null);

    setTimeout(() => {
      setIsAgentRunning(false);
      setStep(3);
      setAgentLog(`✅ AI Global Search Complete! Identified 18 high-intent prospects matching "${businessService}" across LinkedIn, Web, Upwork, and Registries.`);
      
      // Add a newly generated prospect dynamically
      const newProspect: ProspectLead = {
        id: `lead-${Date.now().toString().slice(-4)}`,
        name: 'David Reynolds',
        title: 'Managing Director',
        company: 'CloudVentures Group',
        country: targetRegion,
        source: 'LinkedIn',
        email: 'd.reynolds@cloudventures.io',
        phone: '+1 (415) 890-1234',
        score: 95,
        pitch: `Hi David, regarding ${businessService} for ${targetIndustry} in ${targetRegion}: Our team provides end-to-end execution...`,
        channel: 'Email',
        status: 'In Negotiation'
      };

      setProspects(prev => [newProspect, ...prev]);
    }, 2000);
  };

  // Change lead deal status
  const updateLeadStatus = (id: string, newStatus: 'Pending' | 'In Negotiation' | 'Closed / Won') => {
    setProspects(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Banner Header */}
      <div
        style={{
          padding: '32px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <Bot size={24} />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                Autonomous AI Global Client Acquisition Agent
              </h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, maxWidth: '750px', lineHeight: '1.6' }}>
              AI aap se puchta hai ke aap kya kaam kartay hain ➔ Us ke mutabiq LinkedIn, Upwork, Web Search aur Business Registries se puri duniya ke clients find karta hai ➔ Multi-channel outreach karta hai ➔ CRM mein Pending vs Closed/Won deals alag manage karta hai.
            </p>
          </div>

          <Link
            href="/dashboard/crm"
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Layers size={18} /> Open CRM Kanban Pipeline
          </Link>
        </div>
      </div>

      {/* STEP 1 & 2: AI BUSINESS INTERVIEW & SEARCH RADAR FORM */}
      <div style={{ background: '#1e293b', borderRadius: '20px', border: '1px solid #334155', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #334155' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            1
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>AI Business Interview & Global Radar Setup</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>Batiye aap kya kaam karte hain taake AI poori duniya se exact matching clients dhoonde.</p>
          </div>
        </div>

        <form onSubmit={handleRunAgentSearch} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Business Service Field */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                💼 Aapka Business / Service Kya Hai?
              </label>
              <input
                type="text"
                required
                value={businessService}
                onChange={e => setBusinessService(e.target.value)}
                placeholder="e.g. Web Development, UI/UX Design, Digital Marketing, AI Solutions"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Target Industry */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                🎯 Target Industry / Client Type
              </label>
              <input
                type="text"
                required
                value={targetIndustry}
                onChange={e => setTargetIndustry(e.target.value)}
                placeholder="e.g. Real Estate Companies, E-Commerce Stores, SaaS Startups"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Target Region */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                🌍 Target Region / Country
              </label>
              <input
                type="text"
                required
                value={targetRegion}
                onChange={e => setTargetRegion(e.target.value)}
                placeholder="e.g. USA, UK, Dubai UAE, Worldwide"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          {/* MULTI-SOURCE PLATFORM SELECTOR */}
          <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #334155/60' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#818cf8', marginBottom: '12px' }}>
              🔍 Target Sourcing Platforms (Puri Duniya Se Client Search Rules):
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Linkedin size={18} style={{ color: '#60a5fa' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>LinkedIn Sales Intel</span>
              </div>

              <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={18} style={{ color: '#34d399' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Global Web Search</span>
              </div>

              <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={18} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Upwork B2B Projects</span>
              </div>

              <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={18} style={{ color: '#c084fc' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Company Registries</span>
              </div>
            </div>
          </div>

          {/* Submit Trigger Agent Button */}
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isAgentRunning}
              style={{
                padding: '16px 36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '15px',
                border: 'none',
                cursor: isAgentRunning ? 'not-allowed' : 'pointer',
                opacity: isAgentRunning ? 0.7 : 1,
                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {isAgentRunning ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> AI Agent Scanning Global Databases...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Launch AI Global Client Search Agent
                </>
              )}
            </button>
          </div>
        </form>

        {agentLog && (
          <div style={{ marginTop: '20px', padding: '14px 18px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '14px', fontWeight: '600' }}>
            {agentLog}
          </div>
        )}
      </div>

      {/* STEP 3: AUTONOMOUSLY SOURCED CLIENTS TABLE & CRM DEAL STATUS CATEGORIES */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe style={{ color: '#34d399' }} size={24} /> Global Prospect Clients & Autonomous Deal Desk
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              AI Dwara search kiye gaye global clients. Deals ko <strong style={{ color: '#fbbf24' }}>Pending</strong>, <strong style={{ color: '#818cf8' }}>In Negotiation</strong>, ya <strong style={{ color: '#34d399' }}>Closed / Won</strong> status mein update karein.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ padding: '6px 14px', borderRadius: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fbbf24', fontSize: '12px', fontWeight: '800' }}>
              Pending Contact: 2
            </span>
            <span style={{ padding: '6px 14px', borderRadius: '10px', background: '#1e293b', border: '1px solid #334155', color: '#818cf8', fontSize: '12px', fontWeight: '800' }}>
              In Negotiation: 2
            </span>
            <span style={{ padding: '6px 14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', fontSize: '12px', fontWeight: '800' }}>
              Closed / Won: 1 ($42,500)
            </span>
          </div>
        </div>

        {/* Prospect Leads Table */}
        <div style={{ background: '#1e293b', borderRadius: '20px', border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 20px' }}>Prospect Client & Company</th>
                <th style={{ padding: '16px 20px' }}>Source Platform</th>
                <th style={{ padding: '16px 20px' }}>Outreach Contact</th>
                <th style={{ padding: '16px 20px' }}>AI Fit Score</th>
                <th style={{ padding: '16px 20px' }}>Deal Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>CRM Deal Action</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #334155/60' }}>
                  {/* Client & Company */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '15px' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{p.title} • <strong style={{ color: '#818cf8' }}>{p.company}</strong> ({p.country})</div>
                  </td>

                  {/* Source Platform */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', background: '#0f172a', color: p.source === 'LinkedIn' ? '#60a5fa' : p.source === 'Upwork' ? '#fbbf24' : '#34d399', fontWeight: '800', border: '1px solid #334155' }}>
                      {p.source}
                    </span>
                  </td>

                  {/* Outreach Contact */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '12px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={12} style={{ color: '#94a3b8' }} /> {p.email}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PhoneCall size={12} style={{ color: '#94a3b8' }} /> {p.phone}
                    </div>
                  </td>

                  {/* AI Fit Score */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={16} style={{ color: '#fbbf24' }} />
                      <span style={{ fontSize: '14px', fontWeight: '900', color: '#34d399' }}>{p.score}/100</span>
                    </div>
                  </td>

                  {/* Deal Status Badge */}
                  <td style={{ padding: '16px 20px' }}>
                    {p.status === 'Closed / Won' && (
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '12px', fontWeight: '900', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> CLOSED / WON DEAL 🎉
                      </span>
                    )}
                    {p.status === 'In Negotiation' && (
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', fontSize: '12px', fontWeight: '800', border: '1px solid rgba(99, 102, 241, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <RefreshCw size={13} /> IN NEGOTIATION
                      </span>
                    )}
                    {p.status === 'Pending' && (
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontSize: '12px', fontWeight: '800', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        PENDING OUTREACH
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => updateLeadStatus(p.id, 'In Negotiation')}
                        style={{ padding: '6px 10px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#818cf8', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Negotiate
                      </button>
                      <button
                        onClick={() => updateLeadStatus(p.id, 'Closed / Won')}
                        style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        Close & Win Deal
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
