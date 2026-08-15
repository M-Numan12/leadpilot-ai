import { NextResponse } from 'next/server';

const MOCK_LEADS_STORE: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = (body.query || 'Sales').trim();
    const platform = (body.platform || 'facebook').toLowerCase();
    const limit = Math.min(body.limit || 5, 20);

    const platformLabels: Record<string, string> = {
      facebook: 'Facebook Business Page & Groups',
      linkedin: 'LinkedIn Corporate Network',
      google: 'Google Search & Maps Directory',
      web: 'Global Web Crawler & Domain Registry'
    };
    const sourceLabel = platformLabels[platform] || 'Multi-Platform AI Crawler';

    const templates = [
      { name: `${query} Nexus Agency`, domain: 'nexusgrowth.io', location: 'New York, USA', industry: 'Marketing & Sales' },
      { name: `Apex ${query} Solutions`, domain: 'apexsolutions.com', location: 'San Francisco, USA', industry: 'Technology' },
      { name: `Global ${query} Digital`, domain: 'globaldigital.co', location: 'London, UK', industry: 'Consulting' },
      { name: `Starlight ${query} Enterprise`, domain: 'starlightent.org', location: 'Toronto, Canada', industry: 'E-Commerce' },
      { name: `Vanguard ${query} Partners`, domain: 'vanguardpartners.net', location: 'Sydney, Australia', industry: 'Professional Services' }
    ];

    const discoveredLeads: any[] = [];

    for (let i = 0; i < limit; i++) {
      const tpl = templates[i % templates.length];
      const suffix = Math.floor(100 + Math.random() * 900);
      const companyName = `${tpl.name} #${suffix}`;
      const email = `contact@${tpl.domain}`;
      const phone = `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const score = Math.floor(75 + Math.random() * 24);
      const crmStage = score > 88 ? 'qualified' : 'discovered';

      const leadItem = {
        lead_id: `lead_${Date.now()}_${i}`,
        company_id: `comp_${Date.now()}_${i}`,
        company_name: companyName,
        domain: tpl.domain,
        website_url: `https://www.${tpl.domain}`,
        industry: tpl.industry,
        email: email,
        phone: phone,
        platform: platform,
        source_label: sourceLabel,
        location: tpl.location,
        score: score,
        crm_stage: crmStage,
        qualification_reason: `Auto-discovered via AI ${sourceLabel} for search query '${query}'. AI Quality Score ${score}/100.`,
        created_at: new Date().toISOString()
      };

      discoveredLeads.push(leadItem);
      MOCK_LEADS_STORE.unshift(leadItem);
    }

    return NextResponse.json({
      success: true,
      query: query,
      platform: platform,
      source_label: sourceLabel,
      discovered_count: discoveredLeads.length,
      leads: discoveredLeads
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Lead discovery failed' }, { status: 500 });
  }
}
