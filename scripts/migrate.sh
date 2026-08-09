#!/usr/bin/env bash
set -e

echo "=== Running Database Migrations ==="
cd backend
alembic upgrade head
echo "=== Migrations Completed Successfully ==="
