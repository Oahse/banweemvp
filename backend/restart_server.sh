#!/bin/bash

# Kill any existing uvicorn processes
echo "Stopping existing server..."
pkill -f "uvicorn main:app"
sleep 2

# Start the server
echo "Starting backend server..."
cd "$(dirname "$0")"
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
