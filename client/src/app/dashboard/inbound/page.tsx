'use client';

import React, { useState } from 'react';
import {
  Code2,
  Globe,
  Radio,
  Copy,
  Check,
  Sparkles,
  Layers,
  Send,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ExternalLink,
  Plus,
  Terminal,
  Zap,
  ArrowRight,
  UserCheck,
  Mail,
  Building,
  Phone
} from 'lucide-react';

interface InboundLead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  requirements?: string;
  source: string;
  score: number;
  status: string;
  received_at: string;
}

export default function InboundPage() {
  const [activeTab, setActiveTab] = useState<'builder' | 'webhooks' | 'leads'>('builder');

  // Widget Builder States
  const [widgetTitle, setWidgetTitle] = useState('Get Instant AI Qualification & Demo');
  const [widgetDesc, setWidgetDesc] = useState('Fill in your requirements below to receive a personalized AI strategy report in 60 seconds.');
  const [theme, setTheme] = useState<'indigo' | 'emerald' | 'sunset' | 'dark'>('indigo');
  const [buttonText, setButtonText] = useState('Request AI Assessment ⚡');
  const [includePhone, setIncludePhone] = useState(true);
  const [includeCompany, setIncludeCompany] = useState(true);
  const [includeRequirements, setIncludeRequirements] = useState(true);
  const [embedType, setEmbedType] = useState<'script' | 'iframe'>('script');

  // Copy state
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Live stream leads state
  const [leadsList, setLeadsList] = useState<InboundLead[]>([
    {
      id: 'lead_8f12a9c3',
      name: 'Elena Rostova',
      email: 'elena@cybertech.de',
      company: 'CyberTech Solutions GmbH',
      phone: '+49 171 8920192',
      requirements: 'We need automated SDR agents to handle 500+ B2B inbound inquiries per month.',
      source: 'Website Embed Widget',
      score: 94,
      status: 'qualified',
      received_at: '2 minutes ago'
    },
    {
      id: 'lead_3b771e4d',
      name: 'Marcus Vance',
      email: 'marcus.v@apexglobal.io',
      company: 'Apex Global Logistics',
      phone: '+1 (415) 890-2341',
      requirements: 'Evaluating enterprise CRM integration & automatic lead enrichment capabilities.',
      source: 'Webhooks (Typeform)',
      score: 88,
      status: 'qualified',
      received_at: '14 minutes ago'
    },
    {
      id: 'lead_901bce23',
      name: 'David Chen',
      email: 'd.chen@innovate.co',
      company: 'Innovate AI Labs',
      phone: '+1 (212) 441-9081',
      requirements: 'Requesting pilot test for sales outreach engine.',
      source: 'Website Embed Widget',
      score: 76,
      status: 'review_needed',
      received_at: '1 hour ago'
    }
  ]);

  const [isTestSending, setIsTestSending] = useState(false);

  const themeStyles = {
    indigo: {
      bg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      accent: '#6366f1',
      border: 'rgba(99, 102, 241, 0.4)',
      button: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
    },
    emerald: {
      bg: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
      accent: '#10b981',
      border: 'rgba(16, 185, 129, 0.4)',
      button: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
    },
    sunset: {
      bg: 'linear-gradient(135deg, #7c2d12 0%, #0f172a 100%)',
      accent: '#f97316',
      border: 'rgba(249, 115, 22, 0.4)',
      button: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)'
    },
    dark: {
      bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      accent: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.3)',
      button: 'linear-gradient(135deg, #334155 0%, #475569 100%)'
    }
  };

  const currentTheme = themeStyles[theme];

  const generatedScriptSnippet = `<script 
  src="https://cdn.leadpilot.ai/widget/v1/embed.js" 
  data-widget-id="wgt_98a72e10" 
  data-theme="${theme}" 
  async>
</script>`;

  const generatedIframeSnippet = `<iframe 
  src="https://app.leadpilot.ai/embed/wgt_98a72e10?theme=${theme}" 
  width="100%" 
  height="540px" 
  style="border:none; border-radius:16px; overflow:hidden;" 
  title="Lead capture form">
</iframe>`;

  const copyToClipboard = (text: string, type: 'code' | 'webhook') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedWebhook(true);
      setTimeout(() => setCopiedWebhook(false), 2000);
    }
  };

  const handleSendTestPayload = () => {
    setIsTestSending(true);
    setTimeout(() => {
      const newLead: InboundLead = {
        id: `lead_${Math.random().toString(36).substring(2, 9)}`,
        name: 'Alexander Vance (Test)',
        email: 'alexander.vance@techcorp.io',
        company: 'TechCorp Dynamics',
        phone: '+1 (555) 019-2834',
        requirements: 'Testing live webhook dispatch payload from widget controls.',
        source: 'Webhook Simulator',
        score: 92,
        status: 'qualified',
        received_at: 'Just now'
      };
      setLeadsList([newLead, ...leadsList]);
      setIsTestSending(false);
    }, 800);
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}>
              <Radio size={22} color="#ffffff" />
            </div>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                Inbound Lead Suite & Embed Widget Builder
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
                Capture, auto-qualify, and sync inbound website leads directly into LeadPilot AI CRM pipeline.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid #334155', borderRadius: '12px', padding: '10px 18px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', fontWeight: '600', textTransform: 'uppercase' }}>Active Widgets</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#818cf8' }}>3 Widgets</span>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid #334155', borderRadius: '12px', padding: '10px 18px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', fontWeight: '600', textTransform: 'uppercase' }}>Inbound Leads (30d)</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#34d399' }}>148 Captured</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', marginBottom: '32px', paddingBottom: '4px' }}>
        <button
          onClick={() => setActiveTab('builder')}
          style={{
            padding: '12px 24px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            background: activeTab === 'builder' ? '#1e293b' : 'transparent',
            color: activeTab === 'builder' ? '#ffffff' : '#94a3b8',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: activeTab === 'builder' ? '2px solid #6366f1' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          <Code2 size={18} /> Widget Builder & Live Preview
        </button>

        <button
          onClick={() => setActiveTab('webhooks')}
          style={{
            padding: '12px 24px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            background: activeTab === 'webhooks' ? '#1e293b' : 'transparent',
            color: activeTab === 'webhooks' ? '#ffffff' : '#94a3b8',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: activeTab === 'webhooks' ? '2px solid #6366f1' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          <Globe size={18} /> Inbound Webhooks API
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          style={{
            padding: '12px 24px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            background: activeTab === 'leads' ? '#1e293b' : 'transparent',
            color: activeTab === 'leads' ? '#ffffff' : '#94a3b8',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: activeTab === 'leads' ? '2px solid #6366f1' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          <Radio size={18} /> Live Inbound Queue ({leadsList.length})
        </button>
      </div>

      {/* TAB 1: WIDGET BUILDER & LIVE PREVIEW */}
      {activeTab === 'builder' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '32px' }}>
          {/* Customization Panel */}
          <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '14px' }}>
              <Sliders size={18} color="#818cf8" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Form Customization</h3>
            </div>

            {/* Widget Title Input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Form Heading</label>
              <input
                type="text"
                value={widgetTitle}
                onChange={(e) => setWidgetTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Subtitle Input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Description Subtext</label>
              <textarea
                rows={2}
                value={widgetDesc}
                onChange={(e) => setWidgetDesc(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Theme Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>Theme Palette</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { key: 'indigo', name: 'Indigo', color: '#6366f1' },
                  { key: 'emerald', name: 'Emerald', color: '#10b981' },
                  { key: 'sunset', name: 'Sunset', color: '#f97316' },
                  { key: 'dark', name: 'Dark', color: '#475569' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key as any)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: theme === t.key ? `2px solid ${t.color}` : '1px solid #334155',
                      background: theme === t.key ? 'rgba(99, 102, 241, 0.15)' : '#0f172a',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: t.color }} />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button Text */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>Button Text</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Input Field Toggles */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>Enabled Fields</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeCompany} onChange={(e) => setIncludeCompany(e.target.checked)} />
                  Company Name
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includePhone} onChange={(e) => setIncludePhone(e.target.checked)} />
                  Phone Number
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeRequirements} onChange={(e) => setIncludeRequirements(e.target.checked)} />
                  Requirements Textarea
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Code Generator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Interactive Live Form Preview */}
            <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#818cf8" />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Web Preview</span>
                </div>
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '3px 8px', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)', fontFamily: 'monospace' }}>
                  ● LIVE RENDER
                </span>
              </div>

              {/* Rendered Embed Form Container */}
              <div
                style={{
                  background: currentTheme.bg,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  maxWidth: '520px',
                  margin: '0 auto'
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>{widgetTitle}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.4' }}>{widgetDesc}</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      style={{ width: '100%', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>Business Email *</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      style={{ width: '100%', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  {includeCompany && (
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>Company Name</label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        style={{ width: '100%', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  )}

                  {includePhone && (
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        style={{ width: '100%', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  )}

                  {includeRequirements && (
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>Project Requirements</label>
                      <textarea
                        rows={2}
                        placeholder="Describe your sales goals or current workflow..."
                        style={{ width: '100%', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    style={{
                      marginTop: '8px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentTheme.button,
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: `0 4px 14px ${currentTheme.border}`
                    }}
                  >
                    {buttonText}
                  </button>
                </form>

                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> Powered by LeadPilot AI Engine
                </div>
              </div>
            </div>

            {/* Generated Script Snippet Container */}
            <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Terminal size={18} color="#818cf8" />
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>Embed Snippet Code</h3>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setEmbedType('script')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: embedType === 'script' ? '#6366f1' : '#1e293b',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Script Tag
                  </button>
                  <button
                    onClick={() => setEmbedType('iframe')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: embedType === 'iframe' ? '#6366f1' : '#1e293b',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    iFrame
                  </button>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <pre
                  style={{
                    background: '#0a0e17',
                    border: '1px solid #1e293b',
                    borderRadius: '10px',
                    padding: '16px',
                    color: '#38bdf8',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '12px',
                    overflowX: 'auto',
                    margin: 0
                  }}
                >
                  {embedType === 'script' ? generatedScriptSnippet : generatedIframeSnippet}
                </pre>

                <button
                  onClick={() => copyToClipboard(embedType === 'script' ? generatedScriptSnippet : generatedIframeSnippet, 'code')}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: copiedCode ? '#059669' : '#1e293b',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INBOUND WEBHOOKS API */}
      {activeTab === 'webhooks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '800' }}>Inbound Webhook Integration</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#94a3b8' }}>
              Connect Typeform, Webflow, Calendly, or custom web forms to stream leads into LeadPilot AI.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              {/* Webhook Endpoint */}
              <div style={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Webhook Destination URL</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <code style={{ fontSize: '13px', color: '#a5b4fc', fontFamily: 'monospace' }}>https://api.leadpilot.ai/v1/webhooks/submit</code>
                  <button
                    onClick={() => copyToClipboard('https://api.leadpilot.ai/v1/webhooks/submit', 'webhook')}
                    style={{ padding: '6px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#ffffff', cursor: 'pointer' }}
                    title="Copy URL"
                  >
                    {copiedWebhook ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Webhook Secret */}
              <div style={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>HMAC Secret Signature Key</label>
                <code style={{ fontSize: '13px', color: '#fcd34d', fontFamily: 'monospace' }}>whsec_98a72e10c74b89f1</code>
              </div>
            </div>

            {/* Test Trigger Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={handleSendTestPayload}
                disabled={isTestSending}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isTestSending ? 0.7 : 1
                }}
              >
                {isTestSending ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                Send Simulated Test Lead Payload
              </button>

              <span style={{ fontSize: '12px', color: '#64748b' }}>Dispatches a mock lead payload to verify integration feed.</span>
            </div>
          </div>

          {/* Sample JSON Payload Documentation */}
          <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#cbd5e1' }}>Expected JSON Payload Schema</h4>
            <pre style={{ background: '#0a0e17', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '12px', margin: 0 }}>
{`{
  "name": "Alexander Vance",
  "email": "alexander.vance@techcorp.io",
  "company_name": "TechCorp Dynamics",
  "phone": "+1 (555) 019-2834",
  "requirements": "Need AI sales agent for enterprise SDR team.",
  "source": "Website Embed Form"
}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE INBOUND QUEUE */}
      {activeTab === 'leads' && (
        <div style={{ background: '#131c2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Captured Inbound Lead Stream</h3>
            <button
              onClick={handleSendTestPayload}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#818cf8',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={14} /> Add Mock Lead
            </button>
          </div>

          {/* Leads Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px' }}>Lead Contact</th>
                  <th style={{ padding: '12px 16px' }}>Company</th>
                  <th style={{ padding: '12px 16px' }}>Source</th>
                  <th style={{ padding: '12px 16px' }}>AI Score</th>
                  <th style={{ padding: '12px 16px' }}>Received</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadsList.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '700', color: '#ffffff' }}>{lead.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Mail size={12} /> {lead.email}
                      </div>
                    </td>

                    <td style={{ padding: '16px', color: '#cbd5e1' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building size={14} color="#94a3b8" />
                        {lead.company}
                      </div>
                    </td>

                    <td style={{ padding: '16px' }}>
                      <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: '#1e293b', color: '#a5b4fc', border: '1px solid #334155' }}>
                        {lead.source}
                      </span>
                    </td>

                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          background: lead.score >= 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: lead.score >= 85 ? '#34d399' : '#fcd34d',
                          border: lead.score >= 85 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                        }}
                      >
                        ⚡ {lead.score}/100
                      </span>
                    </td>

                    <td style={{ padding: '16px', color: '#64748b', fontSize: '12px' }}>{lead.received_at}</td>

                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: 'rgba(99, 102, 241, 0.2)',
                          border: '1px solid rgba(99, 102, 241, 0.4)',
                          color: '#a5b4fc',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Push to CRM <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
