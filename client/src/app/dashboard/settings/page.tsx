'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function BusinessSettingsPage() {
  const { token } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  const [targetGeography, setTargetGeography] = useState('USA');
  const [targetIndustries, setTargetIndustries] = useState('Web Development, SaaS');
  const [pricingSummary, setPricingSummary] = useState('');
  const [caseStudies, setCaseStudies] = useState('');
  const [portfolioLinks, setPortfolioLinks] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    if (!token) return;
    // Load existing profile
    fetch(`${API_BASE}/business/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) {
          setCompanyName(data.company_name || '');
          setServicesDescription(data.services_description || '');
          setTargetGeography(data.target_geography || 'USA');
          setTargetIndustries(data.target_industries || '');
          setPricingSummary(data.pricing_summary || '');
          setCaseStudies(data.case_studies || '');
          setPortfolioLinks(data.portfolio_links || '');
        }
      })
      .catch(() => {});
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE}/business/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          company_name: companyName,
          services_description: servicesDescription,
          target_geography: targetGeography,
          target_industries: targetIndustries,
          pricing_summary: pricingSummary,
          case_studies: caseStudies,
          portfolio_links: portfolioLinks
        })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: '✅ Business Profile saved! AI Agents will now use this context for lead research & personalized proposals.' });
      } else {
        const errData = await res.json();
        setMessage({ type: 'error', text: errData.detail || 'Failed to save business profile.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Server connection failed.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '32px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            🏢 Business Profile & Knowledge Setup
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Provide your business information so AI Agents can find relevant clients & write custom proposals.
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <div style={{
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '14px',
            background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: message.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: message.type === 'success' ? '#6ee7b7' : '#fca5a5'
          }}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #334155',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
        }}>
          {/* Company Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Your Business / Agency Name *
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Apex Web Solutions"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Services Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Services & Core Expertise *
            </label>
            <textarea
              required
              rows={4}
              value={servicesDescription}
              onChange={(e) => setServicesDescription(e.target.value)}
              placeholder="Describe your services in detail (e.g. Custom Next.js Web App Development, UI/UX Redesign, E-commerce Optimization)."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Target Geography & Industries */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Target Country / Region
              </label>
              <input
                type="text"
                value={targetGeography}
                onChange={(e) => setTargetGeography(e.target.value)}
                placeholder="e.g. USA, UK, Canada"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Target Industries
              </label>
              <input
                type="text"
                value={targetIndustries}
                onChange={(e) => setTargetIndustries(e.target.value)}
                placeholder="e.g. Real Estate, E-Commerce, SaaS"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#f8fafc',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Pricing Summary */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Pricing Model & Packages
            </label>
            <input
              type="text"
              value={pricingSummary}
              onChange={(e) => setPricingSummary(e.target.value)}
              placeholder="e.g. Starting from $1,500/project or $50/hour"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Case Studies */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Past Success Stories / Case Studies
            </label>
            <textarea
              rows={3}
              value={caseStudies}
              onChange={(e) => setCaseStudies(e.target.value)}
              placeholder="e.g. Helped E-commerce brand increase conversion rate by 35% via custom Shopify redesign."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Portfolio Links */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Portfolio / Website Links
            </label>
            <input
              type="text"
              value={portfolioLinks}
              onChange={(e) => setPortfolioLinks(e.target.value)}
              placeholder="https://myagency.com, https://github.com/myagency"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)'
            }}
          >
            {saving ? 'Saving Profile...' : 'Save Business Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
