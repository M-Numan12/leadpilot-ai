#!/usr/bin/env bash
set -e

echo "=== LeadPilot AI Setup Script ==="
echo "1. Installing Client Dependencies..."
cd client && npm install && cd ..

echo "2. Setting up Python Virtual Environment..."
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

echo "=== Setup Complete! ==="
