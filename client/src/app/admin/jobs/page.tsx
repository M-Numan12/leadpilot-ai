'use client';

import React from 'react';
import {
  Sparkles,
  RefreshCcw,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';

export default function BackgroundJobsPage() {
  const jobs = [
    { id: 'job-9821', task: 'tasks.enrich_lead_data', queue: 'high_priority', status: 'Completed', runtime: '412ms', retries: 0, time: '2 mins ago' },
    { id: 'job-9820', task: 'tasks.send_campaign_email_batch', queue: 'email_outreach', status: 'Completed', runtime: '1.2s', retries: 0, time: '5 mins ago' },
    { id: 'job-9819', task: 'tasks.generate_weekly_lead_analytics', queue: 'default', status: 'Processing', runtime: '850ms', retries: 0, time: 'Running' },
    { id: 'job-9818', task: 'tasks.scrape_company_domain_intel', queue: 'research', status: 'Failed', runtime: '4.5s', retries: 2, time: '14 mins ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="text-pink-400" size={26} /> Background Task Queue
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Celery worker task queue monitor, asynchronous job logs, and retry controls.
          </p>
        </div>

        <button className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-200 border border-[#334155] rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
          <RefreshCcw size={16} /> Purge Queue
        </button>
      </div>

      {/* Jobs Table */}
      <div className="rounded-xl bg-[#1e293b] border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0f172a] text-xs font-semibold uppercase text-slate-400 border-b border-[#334155]">
            <tr>
              <th className="px-6 py-4">Job ID & Task Name</th>
              <th className="px-6 py-4">Target Queue</th>
              <th className="px-6 py-4">Execution Status</th>
              <th className="px-6 py-4">Runtime</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]/60">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-[#334155]/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-mono text-xs font-bold text-indigo-400">{job.id}</div>
                  <div className="font-semibold text-white text-sm">{job.task}</div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                  {job.queue}
                </td>
                <td className="px-6 py-4">
                  {job.status === 'Completed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle size={12} /> Succeeded
                    </span>
                  )}
                  {job.status === 'Processing' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      <Clock size={12} /> Running
                    </span>
                  )}
                  {job.status === 'Failed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                      <AlertCircle size={12} /> Failed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-300">
                  {job.runtime}
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  {job.time}
                </td>
                <td className="px-6 py-4 text-right">
                  {job.status === 'Failed' && (
                    <button className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold border border-red-500/30 transition-colors flex items-center gap-1 ml-auto">
                      <RotateCcw size={12} /> Re-queue Task
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
