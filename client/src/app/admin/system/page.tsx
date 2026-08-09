'use client';

import React from 'react';
import {
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  RefreshCw,
  CheckCircle,
  Zap
} from 'lucide-react';

export default function SystemHealthPage() {
  const systemMetrics = [
    { label: 'FastAPI Backend', status: 'Healthy', latency: '14ms', icon: Server, color: 'text-emerald-400' },
    { label: 'PostgreSQL Database', status: 'Connected', latency: '3.8ms', icon: Database, color: 'text-emerald-400' },
    { label: 'Redis Cache', status: 'Connected', latency: '1.1ms', icon: Zap, color: 'text-emerald-400' },
    { label: 'Celery Queue Workers', status: 'Running (8 Workers)', latency: '0ms backlog', icon: Cpu, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Activity className="text-emerald-400" size={26} /> System Health & Metrics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time server infrastructure status, database pools, and API latencies.
          </p>
        </div>

        <button className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-200 border border-[#334155] rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
          <RefreshCw size={16} /> Refresh Telemetry
        </button>
      </div>

      {/* Services Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {systemMetrics.map((sm, idx) => {
          const Icon = sm.icon;
          return (
            <div key={idx} className="p-5 rounded-xl bg-[#1e293b] border border-[#334155] shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{sm.label}</span>
                <Icon size={20} className={sm.color} />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <span className="text-lg font-bold text-white">{sm.status}</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono">
                Latency: <span className="text-slate-200">{sm.latency}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Utilization Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Cpu size={18} className="text-indigo-400" /> CPU Core Usage
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Node 01 (API Core)</span>
                <span className="font-mono text-emerald-400">22.4%</span>
              </div>
              <div className="w-full bg-[#0f172a] h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[22.4%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Node 02 (Worker Queue)</span>
                <span className="font-mono text-emerald-400">41.8%</span>
              </div>
              <div className="w-full bg-[#0f172a] h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[41.8%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <HardDrive size={18} className="text-purple-400" /> RAM & Disk Storage
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>System RAM (32GB Total)</span>
                <span className="font-mono text-indigo-400">8.4 GB (26%)</span>
              </div>
              <div className="w-full bg-[#0f172a] h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[26%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>SSD Storage (256GB SSD)</span>
                <span className="font-mono text-purple-400">42 GB (16%)</span>
              </div>
              <div className="w-full bg-[#0f172a] h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[16%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
