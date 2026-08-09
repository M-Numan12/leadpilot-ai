'use client';

import React from 'react';
import {
  Building2,
  Users,
  Plus,
  Building,
  CheckCircle2,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

export default function OrganizationsPage() {
  const orgs = [
    { id: 'org-1', name: 'Acme Sales Global', domain: 'acme.com', seats: '18 / 25', plan: 'Enterprise', status: 'Active', created: '2026-01-10' },
    { id: 'org-2', name: 'TechFront Innovations', domain: 'techfront.io', seats: '12 / 15', plan: 'Growth', status: 'Active', created: '2026-02-14' },
    { id: 'org-3', name: 'Apex Growth Labs', domain: 'apexgrowth.ai', seats: '4 / 5', plan: 'Starter', status: 'Active', created: '2026-03-22' },
    { id: 'org-4', name: 'Vanguard Media Group', domain: 'vanguard.co', seats: '35 / 50', plan: 'Enterprise', status: 'Active', created: '2026-04-01' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="text-purple-400" size={26} /> Organization Tenants
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage multi-tenant workspace organizations, member seats, and enterprise tiers.
          </p>
        </div>

        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2">
          <Plus size={16} /> Create Organization
        </button>
      </div>

      {/* Organizations Table */}
      <div className="rounded-xl bg-[#1e293b] border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f172a] text-xs font-semibold uppercase text-slate-400 border-b border-[#334155]">
            <tr>
              <th className="px-6 py-4">Organization Name</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Plan Tier</th>
              <th className="px-6 py-4">Seats Allocated</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]/60">
            {orgs.map(org => (
              <tr key={org.id} className="hover:bg-[#334155]/30 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                    <Building size={18} />
                  </div>
                  {org.name}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                  {org.domain}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {org.plan}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-300 flex items-center gap-1">
                  <Users size={12} className="text-slate-400" /> {org.seats}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={12} /> {org.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-[#334155] rounded-lg text-slate-400 hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
