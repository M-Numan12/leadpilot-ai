import { NextResponse } from 'next/server';

export async function GET() {
  const sampleLeads = [
    {
      id: 'lead_001',
      company_name: 'Nexus Digital Agency',
      domain: 'nexusgrowth.io',
      website_url: 'https://www.nexusgrowth.io',
      industry: 'Marketing & Sales',
      location: 'New York, USA',
      emails: 'contact@nexusgrowth.io',
      phones: '+1 (555) 234-5678',
      platform: 'facebook',
      source_label: 'Facebook Business Page & Groups',
      score: 94,
      qualification_reason: 'High activity on Facebook Business. Budget > $10k/mo.',
      crm_stage: 'qualified',
      created_at: new Date().toISOString()
    },
    {
      id: 'lead_002',
      company_name: 'Apex Cloud Solutions',
      domain: 'apexcloud.com',
      website_url: 'https://www.apexcloud.com',
      industry: 'Technology & SaaS',
      location: 'San Francisco, USA',
      emails: 'hello@apexcloud.com',
      phones: '+1 (555) 987-6543',
      platform: 'linkedin',
      source_label: 'LinkedIn Corporate Network',
      score: 88,
      qualification_reason: 'Discovered via LinkedIn Sales Navigator crawler.',
      crm_stage: 'contacted',
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'lead_003',
      company_name: 'Global Enterprise Partners',
      domain: 'globalpart.co',
      website_url: 'https://www.globalpart.co',
      industry: 'Management Consulting',
      location: 'London, UK',
      emails: 'info@globalpart.co',
      phones: '+44 20 7946 0912',
      platform: 'google',
      source_label: 'Google Search & Maps Directory',
      score: 79,
      qualification_reason: 'Identified on Google Maps directory with 4.9 rating.',
      crm_stage: 'discovered',
      created_at: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  return NextResponse.json({
    success: true,
    total: sampleLeads.length,
    leads: sampleLeads
  });
}
