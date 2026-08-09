"""
Outreach AI Agent - Prepares & Dispatches Approved Communications
Enforces security check: Only executes if proposal status is 'approved' by human operator.
"""

from typing import Dict, Any

class OutreachAgent:
    def __init__(self):
        self.name = "outreach"

    async def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes outreach dispatch if human approval flag is true.
        """
        is_approved = task.get("human_approved", False)
        
        if not is_approved:
            return {
                "agent": self.name,
                "status": "blocked",
                "reason": "Human approval required before outreach execution.",
                "executed": False
            }
            
        return {
            "agent": self.name,
            "status": "dispatched",
            "message": "Outreach email/campaign sent via official API.",
            "executed": True
        }
