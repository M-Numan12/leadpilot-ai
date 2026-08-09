'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  Building2,
  Cpu,
  Layers,
  MessageSquare,
  BarChart3,
  Search,
  Mail,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Globe,
  Lock,
  Play
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'agent' | 'crm' | 'outreach' | 'admin'>('agent');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'LeadPilot AI kis tarha B2B leads research karta hai?',
      a: 'LeadPilot AI Autonomous Web Scraper aur Search Agent public APIs, company registries, aur web search ke zariye permitted data extract karta hai. Is ke baad machine learning algorithms leads ko IC-Score (0-100) assign kartay hain.'
    },
    {
      q: 'Kya main apne CRM (Salesforce / HubSpot) ke sath sync kar sakta hoon?',
      a: 'Jaan han! LeadPilot AI me built-in CRM Sync hai jisse aap one-click me qualified leads ko apne existing sales stack me push kar sakte hain.'
    },
    {
      q: 'Admin Portal mein mujhe kya permissions milti hain?',
      a: 'Admin Portal superusers ko full authorization deta hai: User Management, System Uptime Telemetry, Multi-Tenant Organizations, Background Job Queue monitoring, aur Security Audit Logs.'
    },
    {
      q: 'Kya free trial available hai?',
      a: 'Ji bilkul! Aap Sign Up karke 14-day free trial start kar sakte hain bina credit card ke.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. TOP NAVBAR HEADER */}
      <nav style={{ height: '76px', borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 50, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '22px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
            ⚡
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '900', fontSize: '21px', color: '#ffffff', letterSpacing: '-0.4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              LeadPilot <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', border: '1px solid rgba(99, 102, 241, 0.3)' }}>AI</span>
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Sales Automation Platform</span>
          </div>
        </Link>

        {/* Center Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '14px', fontWeight: '600' }}>
          <a href="#features" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Features</a>
          <a href="#how-it-works" style={{ color: '#cbd5e1', textDecoration: 'none' }}>How It Works</a>
          <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Pricing</a>
          <a href="#faq" style={{ color: '#cbd5e1', textDecoration: 'none' }}>FAQ</a>
          <Link href="/admin" style={{ color: '#fcd34d', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <ShieldCheck size={16} /> Admin Portal
          </Link>
        </div>

        {/* Right CTA Buttons (SIGN IN & SIGN UP) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            href="/login"
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </Link>

          <Link
            href="/register"
            style={{
              padding: '10px 22px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Sign Up Free</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section style={{ padding: '90px 24px 70px 24px', maxWidth: '1240px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Badge Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '9999px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc', fontSize: '13px', fontWeight: '700', marginBottom: '32px' }}>
          <Sparkles size={16} style={{ color: '#818cf8' }} /> 🚀 LeadPilot AI 2.0 – Autonomous Multi-Agent Sales Platform
        </div>

        {/* Main Heading */}
        <h1 style={{ fontSize: '60px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1.8px', lineHeight: 1.12, maxWidth: '980px', margin: '0 auto' }}>
          Automate B2B Prospecting & Outbound Sales with{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #fcd34d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Autonomous AI Agents
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ marginTop: '24px', fontSize: '20px', color: '#cbd5e1', maxWidth: '780px', margin: '24px auto 0 auto', lineHeight: '1.6' }}>
          LeadPilot AI conducts deep web research, scores decision-maker prospects, drafts hyper-personalized proposals, and manages deals in a drag-and-drop CRM — 10x faster.
        </p>

        {/* Action Buttons */}
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="/register"
            style={{ padding: '18px 36px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)', color: '#ffffff', fontWeight: '800', fontSize: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 28px rgba(79, 70, 229, 0.45)' }}
          >
            <span>Start Free 14-Day Trial</span>
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/dashboard/overview"
            style={{ padding: '18px 32px', borderRadius: '14px', background: '#1e293b', color: '#ffffff', border: '1px solid #334155', fontWeight: '800', fontSize: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Play size={18} style={{ color: '#818cf8' }} /> Explore Live Dashboard
          </Link>

          <Link
            href="/admin"
            style={{ padding: '18px 28px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.4)', fontWeight: '800', fontSize: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShieldCheck size={20} /> Admin Portal
          </Link>
        </div>

        {/* Feature Checkmarks */}
        <div style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '32px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', borderTop: '1px solid #1e293b', paddingTop: '32px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#34d399' }} /> No credit card required</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#34d399' }} /> 500 Free AI Research Credits</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#34d399' }} /> Complete Admin Portal Included</span>
        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT SHOWCASE SECTION */}
      <section style={{ padding: '60px 24px', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ background: '#1e293b', borderRadius: '24px', border: '1px solid #334155', padding: '24px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)' }}>
          {/* Tabs header */}
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('agent')}
              style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'agent' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Bot size={16} /> AI Research Agent
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'crm' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Target size={16} /> CRM Kanban Pipeline
            </button>

            <button
              onClick={() => setActiveTab('outreach')}
              style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'outreach' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Mail size={16} /> Personalized Outreach
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'admin' ? '#f59e0b' : 'transparent', color: activeTab === 'admin' ? '#ffffff' : '#fcd34d', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ShieldCheck size={16} /> Admin Telemetry
            </button>
          </div>

          {/* Tab Content Display */}
          <div style={{ background: '#0f172a', borderRadius: '16px', padding: '32px', border: '1px solid #334155' }}>
            {activeTab === 'agent' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
                    <Search size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Natural Language Prompt Query</h4>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>"USA mein web development clients find karo with team size 10-50"</p>
                  </div>
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', background: '#1e293b', border: '1px solid #334155', fontSize: '13px', fontFamily: 'monospace', color: '#34d399' }}>
                  ✅ AI Agent Discovered 24 Qualified Companies • Average IC-Fit Score: 88/100 • Scraped Emails & Decision Makers
                </div>
                <Link href="/dashboard/ai-agent" style={{ fontSize: '13px', fontWeight: '700', color: '#818cf8', textDecoration: 'none' }}>
                  Test AI Research Desk in Dashboard &rarr;
                </Link>
              </div>
            )}

            {activeTab === 'crm' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>5-Stage Sales Kanban Board</h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Drag and drop leads between Lead Sourced ➔ Qualified ➔ Contacted ➔ Proposal Sent ➔ Won.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #60a5fa', fontSize: '12px', fontWeight: '700' }}>Discovery (42)</div>
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #34d399', fontSize: '12px', fontWeight: '700' }}>Qualified (18)</div>
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #c084fc', fontSize: '12px', fontWeight: '700' }}>Contacted (12)</div>
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #fbbf24', fontSize: '12px', fontWeight: '700' }}>Proposal (8)</div>
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #38bdf8', fontSize: '12px', fontWeight: '700' }}>Won Deals (5)</div>
                </div>
                <Link href="/dashboard/crm" style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', textDecoration: 'none' }}>
                  Open Interactive CRM Kanban &rarr;
                </Link>
              </div>
            )}

            {activeTab === 'outreach' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>AI Cold Email & LinkedIn Pitch Generator</h4>
                <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', fontSize: '13px', color: '#cbd5e1', border: '1px solid #334155' }}>
                  <strong style={{ color: '#ffffff' }}>Subject:</strong> Scaling Acme Corp&apos;s Engineering Team with AI Automation<br/>
                  <span style={{ color: '#94a3b8' }}>Hi Sarah, I noticed your recent expansion into cloud services...</span>
                </div>
                <Link href="/dashboard/proposals" style={{ fontSize: '13px', fontWeight: '700', color: '#34d399', textDecoration: 'none' }}>
                  View Proposal & Outreach Generator &rarr;
                </Link>
              </div>
            )}

            {activeTab === 'admin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#fcd34d', margin: 0 }}>Superuser Admin Portal</h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Manage user roles, server CPU/memory, PostgreSQL database pools, Celery queue workers, and security audit logs.</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: '700' }}>1,420 Users</span>
                  <span style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '12px', fontWeight: '700' }}>99.98% Server Uptime</span>
                  <span style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '12px', fontWeight: '700' }}>8 Celery Workers</span>
                </div>
                <Link href="/admin" style={{ fontSize: '13px', fontWeight: '700', color: '#fcd34d', textDecoration: 'none' }}>
                  Go to Full Admin Dashboard &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID ("WHAT LEADPILOT AI DOES") */}
      <section id="features" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px' }}>Everything You Need to Scale Outbound Sales</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '10px' }}>Comprehensive multi-agent architecture designed for modern revenue engines.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Feature 1 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>AI Prospect Search Agent</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Scours permitted web data and public company registries to discover high-value decision makers with accurate contact emails.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>ICP Fit Scoring Engine</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Automatically ranks leads from 0-100 based on company revenue, headcount, tech stack, and buying intent before initiating contact.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <MessageSquare size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Multi-Channel Campaigns</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Orchestrate automated cold email sequences and personalized LinkedIn connection requests with smart follow-ups.
            </p>
          </div>

          {/* Feature 4 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Enterprise Admin Portal</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Superuser portal for tenant management, user authorization, Celery worker queue health, and immutable audit logs.
            </p>
          </div>

          {/* Feature 5 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Interactive CRM Pipeline</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Visual Kanban board for moving deals through pipeline stages, recording call notes, and tracking revenue closed.
            </p>
          </div>

          {/* Feature 6 */}
          <div style={{ padding: '32px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Celery & Redis Worker Queues</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Asynchronous task queues ensure high-throughput background processing without blocking web application UI performance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3-STEP PROCESS) */}
      <section id="how-it-works" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid #1e293b', background: 'rgba(30, 41, 59, 0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff' }}>How LeadPilot AI Works in 3 Easy Steps</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '10px' }}>From raw prompt criteria to closed deals in record time.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', fontSize: '22px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)' }}>1</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Define Target Criteria</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Enter your ideal client prompt or select industry filters (SaaS, FinTech, E-commerce).</p>
          </div>

          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', color: '#ffffff', fontSize: '22px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 4px 16px rgba(168, 85, 247, 0.4)' }}>2</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>AI Researches & Qualifies</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Autonomous agents extract verified contacts, calculate fit score, and draft personalized pitches.</p>
          </div>

          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)', color: '#ffffff', fontSize: '22px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)' }}>3</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Track & Close Deals</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Manage interested leads in CRM Kanban board and monitor admin telemetry.</p>
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section id="pricing" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff' }}>Flexible Pricing Plans</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '10px' }}>Transparent monthly plans for solo founders, sales teams, and enterprises.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Starter Plan */}
          <div style={{ padding: '36px', borderRadius: '24px', background: '#1e293b', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#818cf8', textTransform: 'uppercase' }}>Starter</span>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', marginTop: '12px' }}>$49 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>/mo</span></div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '8px' }}>Ideal for solo founders and freelancers sourcing early leads.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> 500 AI Research Credits / mo</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> 1 Active AI Search Agent</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Full CRM Kanban Access</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Email & Web Support</li>
              </ul>
            </div>
            <Link href="/register" style={{ padding: '14px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontWeight: '700', fontSize: '14px', textDecoration: 'none', textAlign: 'center' }}>
              Get Started with Starter
            </Link>
          </div>

          {/* Pro Plan (Popular) */}
          <div style={{ padding: '36px', borderRadius: '24px', background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)', border: '2px solid #6366f1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 12px 36px rgba(99, 102, 241, 0.25)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', right: '24px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase' }}>MOST POPULAR</span>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', textTransform: 'uppercase' }}>Professional</span>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', marginTop: '12px' }}>$149 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>/mo</span></div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '8px' }}>Designed for growing sales teams requiring high lead volume.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#f8fafc' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> 3,000 AI Research Credits / mo</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> 5 Active AI Search Agents</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> ICP Fit Lead Scoring (0-100)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Automated Email Campaigns</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Admin Portal Access</li>
              </ul>
            </div>
            <Link href="/register" style={{ padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', fontWeight: '800', fontSize: '14px', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
              Start Free Pro Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div style={{ padding: '36px', borderRadius: '24px', background: '#1e293b', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#fcd34d', textTransform: 'uppercase' }}>Enterprise</span>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', marginTop: '12px' }}>$399 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>/mo</span></div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '8px' }}>Custom multi-tenant deployment for large enterprises.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Unlimited AI Research Credits</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Dedicated Superuser Admin Portal</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> Custom Celery Worker Queues</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#34d399' }} /> SLA 99.99% Uptime Guarantee</li>
              </ul>
            </div>
            <Link href="/register" style={{ padding: '14px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fcd34d', fontWeight: '700', fontSize: '14px', textDecoration: 'none', textAlign: 'center' }}>
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section id="faq" style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto', borderTop: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff' }}>Frequently Asked Questions</h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>Everything you need to know about LeadPilot AI.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ width: '100%', padding: '20px 24px', background: 'transparent', border: 'none', color: '#ffffff', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={20} style={{ color: '#818cf8' }} /> : <ChevronDown size={20} style={{ color: '#94a3b8' }} />}
              </button>
              {openFaq === idx && (
                <div style={{ padding: '0 24px 20px 24px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', borderTop: '1px solid #334155/40', paddingTop: '12px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ padding: '48px', borderRadius: '32px', background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)', border: '1px solid rgba(99, 102, 241, 0.4)', boxShadow: '0 20px 50px rgba(79, 70, 229, 0.2)' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', margin: 0 }}>Start Automating Your B2B Outbound Today</h2>
          <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '600px', margin: '16px auto 32px auto', lineHeight: '1.6' }}>
            Join hundreds of high-growth sales teams closing more deals with LeadPilot AI agents.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/register"
              style={{ padding: '16px 36px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', fontWeight: '800', fontSize: '16px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              style={{ padding: '16px 28px', borderRadius: '14px', background: '#0f172a', color: '#ffffff', border: '1px solid #334155', fontWeight: '800', fontSize: '16px', textDecoration: 'none' }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '48px 32px 32px 32px', backgroundColor: '#0b1329', color: '#94a3b8', fontSize: '13px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontWeight: '900', fontSize: '18px', color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚡ LeadPilot AI
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
              Intelligent Sales Automation Platform powered by multi-agent web research and superuser telemetry.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>Product</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/dashboard/overview" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sales Dashboard</Link></li>
              <li><Link href="/dashboard/crm" style={{ color: '#94a3b8', textDecoration: 'none' }}>CRM Kanban</Link></li>
              <li><Link href="/dashboard/ai-agent" style={{ color: '#94a3b8', textDecoration: 'none' }}>AI Research Agent</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>Admin & Security</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/admin" style={{ color: '#fcd34d', textDecoration: 'none' }}>Admin Portal</Link></li>
              <li><Link href="/admin/users" style={{ color: '#94a3b8', textDecoration: 'none' }}>User Management</Link></li>
              <li><Link href="/admin/system" style={{ color: '#94a3b8', textDecoration: 'none' }}>System Telemetry</Link></li>
              <li><Link href="/admin/logs" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security Audit Logs</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>Account</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sign In</Link></li>
              <li><Link href="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>Register New Account</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '24px', color: '#64748b' }}>
          © 2026 LeadPilot AI. All rights reserved. Built for B2B Revenue Leaders.
        </div>
      </footer>
    </div>
  );
}
