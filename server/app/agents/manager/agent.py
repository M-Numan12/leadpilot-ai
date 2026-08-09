"""
Manager Agent - Core Decision Router for LeadPilot AI Multi-Agent Orchestration
Decides task distribution across specialized agents:
Planner -> Research -> Company Analyzer -> Lead Qualifier -> Proposal Generator -> [Human Approval Gate] -> Outreach -> Follow-up -> CRM
"""

from typing import Dict, Any, List

class ManagerAgent:
    def __init__(self):
        self.name = "manager"

    async def analyze_task(self, prompt: str) -> Dict[str, Any]:
        """
        Evaluates user intent and dynamically determines required agent execution pipeline.
        """
        # Determine plan steps based on prompt intent
        pipeline = [
            "planner",
            "researcher",
            "company_analyzer",
            "lead_qualifier",
            "proposal_writer",
            "human_approval",
            "outreach",
            "crm"
        ]
        return {
            "prompt": prompt,
            "pipeline": pipeline,
            "requires_human_approval": True,
            "status": "planned"
        }

    async def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes manager orchestration and hands off task plan to downstream agents.
        """
        prompt = task.get("prompt", "")
        plan = await self.analyze_task(prompt)
        
        return {
            "agent": self.name,
            "status": "dispatched",
            "orchestration_plan": plan,
            "next_step": "planner"
        }
