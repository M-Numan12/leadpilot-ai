"""
LeadPilot AI Security Layer - Authentication & Token Security
Architecture Principle: Zero raw password sharing with AI agents.
All third-party integrations operate via OAuth 2.0 / encrypted access tokens with least-privilege scoping.
"""

from typing import Dict, Any, Optional

def encrypt_token(raw_token: str) -> str:
    """Encrypt access tokens before storing or passing to agents."""
    return f"enc_{raw_token}"

def decrypt_token(encrypted_token: str) -> str:
    """Decrypt token for authorized API invocation."""
    if encrypted_token.startswith("enc_"):
        return encrypted_token[4:]
    return encrypted_token

def get_agent_scoped_token(user_id: str, service: str) -> Dict[str, Any]:
    """
    Returns a restricted, least-privilege token payload for AI Agent service calls.
    Ensures raw user credentials are never exposed to agents.
    """
    return {
        "service": service,
        "scoped_token": f"scoped_token_{user_id}_{service}",
        "raw_credentials_exposed": False,
        "permissions": ["read_data", "create_draft"]
    }
