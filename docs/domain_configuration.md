# Custom Domain Configuration Guide - LeadPilot AI

## Registered Domain Details
- **Apex Domain**: `leadpilot-ai.online`
- **Subdomain**: `www.leadpilot-ai.online`
- **DNS Provider**: Namecheap
- **Hosting Provider**: Vercel

## DNS Records (Namecheap Advanced DNS)
- **A Record**: `@` -> `76.76.21.21` (TTL: 1 min)
- **CNAME Record**: `www` -> `cname.vercel-dns.com.` (TTL: 1 min)

## Vercel Settings
- Project: `leadpilot-ai`
- Assigned Domains:
  1. `leadpilot-ai.online` (308 redirect to `www.leadpilot-ai.online`)
  2. `www.leadpilot-ai.online` (Production target)
