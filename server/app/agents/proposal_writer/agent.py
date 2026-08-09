"""
Proposal Writer AI Agent - Generates customized proposals and pitches
Enforces mandatory Human-in-the-loop approval gate prior to outreach dispatch.
"""

from typing import Dict, Any

class ProposalWriterAgent:
    def __init__(self):
        self.name = "proposal_writer"

    async def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates proposal draft and tags output for mandatory Human Approval review.
        """
        lead_data = task.get("lead", {})
        proposal_content = f"Custom Proposal Draft for {lead_data.get('name', 'Prospect')}"
        
        return {
            "agent": self.name,
            "status": "pending_human_approval",
            "proposal_id": "prop-draft-001",
            "proposal_content": proposal_content,
            "requires_approval": True,
            "can_auto_send": False
        }
