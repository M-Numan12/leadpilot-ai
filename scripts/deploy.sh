#!/usr/bin/env bash
set -e

echo "=== Deploying LeadPilot AI ==="
docker-compose up -d --build
echo "=== Deployment Successful ==="
