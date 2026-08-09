'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Sparkles,
  Play,
  Pause,
  Sliders,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export default function AgentControlPage() {
  const [agents, setAgents] = useState([
    { id: 'agt-1', name: 'Lead Discovery & Web Research Agent', model: 'gpt-4o-mini', status: 'Running', queriesRun: '4,280', avgTime: '1.2s' },
    { id: 'agt-2', name: 'Lead Qualification & Scoring Agent', model: 'claude-3-5-sonnet', status: 'Running', queriesRun: '1,840', avgTime: '0.8s' },
    { id: 'agt-3', name: 'Personalized Email Outreach Agent', model: 'gpt-4o', status: 'Running', queriesRun: '3,110', avgTime: '1.4s' },
    { id: 'agt-4', name: 'Proposal Generation Agent', model: 'gpt-4o', status: 'Paused', queriesRun: '890', avgTime: '2.1s' },
  ]);

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Running' ? 'Paused' : 'Running' } : a));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="text-amber-400" size={26} /> AI Agents Orchestration
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor, configure, and control multi-agent AI execution pipelines.
          </p>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center gap-2">
          <Sparkles size={16} /> Deploy New Agent
        </button>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map(agt => (
          <div key={agt.id} className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{agt.name}</h3>
                    <span className="text-xs font-mono text-indigo-400">{agt.model}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  agt.status === 'Running' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {agt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 p-3 rounded-xl bg-[#0f172a]/60 border border-[#334155]/60 text-xs">
                <div>
                  <span className="text-slate-400">Total Invocations:</span>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">{agt.queriesRun}</div>
                </div>
                <div>
                  <span className="text-slate-400">Avg Execution Time:</span>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{agt.avgTime}</div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#334155] flex items-center justify-between">
              <button className="px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#334155] text-slate-300 text-xs font-semibold border border-[#334155] flex items-center gap-1.5">
                <Sliders size={14} /> Tune System Prompt
              </button>

              <button
                onClick={() => toggleAgent(agt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  agt.status === 'Running' ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {agt.status === 'Running' ? <><Pause size={14} /> Pause Agent</> : <><Play size={14} /> Resume Agent</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
