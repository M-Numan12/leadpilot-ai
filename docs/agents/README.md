# LeadPilot AI - Multi-Agent Architecture Documentation

## Overview
LeadPilot AI utilizes a **LangGraph-based multi-agent hierarchy** designed for goal decomposition, autonomous execution, and human-in-the-loop safety.

```text
Manager Agent (Task Decision Router)
      │
      ▼
Planner Agent (Workflow Execution Graph)
      │
      ├──► Research Agent (Company/Lead Discovery)
      │
      ├──► Company Analyzer (Tech Stack & Business Analysis)
      │
      ├──► Lead Qualifier (ICP Scoring)
      │
      ├──► Proposal Agent (Draft Pitch Generation)
      │       │
      │       ▼
      │   [ Human Approval Gate ]
      │       │
      ├──► Outreach Agent (Campaign Dispatch)
      │
      ├──► Follow-up Agent (Interactions Tracking)
      │
      └──► CRM Agent (Pipeline Management)
```

## Agent Definitions

### Manager Agent (`server/app/agents/manager/`)
The primary router agent. Evaluates incoming user prompts, selects required specialized agents, and triggers the Planner Agent graph.

### Planner Agent (`server/app/agents/planner/`)
Decomposes complex requests into sequential execution nodes and maintains the LangGraph state machine.

### Proposal Agent & Human Approval Gate (`server/app/agents/proposal_writer/`)
Generates context-aware proposal drafts. Before handing off to the Outreach Agent, the proposal state shifts to `requires_human_approval`.

### Outreach Agent (`server/app/agents/outreach/`)
Executes messaging campaigns via official APIs **only after** human approval has been recorded.

## Security Controls
- No raw user credentials supplied to agents.
- Agents operate strictly with OAuth tokens and restricted scope API keys.
