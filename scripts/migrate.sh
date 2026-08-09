#!/usr/bin/env bash
set -e

echo "=== Running Database Migrations ==="
cd server
alembic upgrade head
echo "=== Migrations Completed Successfully ==="
