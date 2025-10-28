#!/bin/bash

echo "========================================"
echo "  IT Asset Manager - Quick Update"
echo "========================================"
echo ""

echo "[1/4] Pulling latest changes from GitHub..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to pull changes"
    exit 1
fi
echo ""

echo "[2/4] Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install root dependencies"
    exit 1
fi
echo ""

echo "[3/4] Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install client dependencies"
    exit 1
fi
cd ..
echo ""

echo "[4/4] Starting development server..."
echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "The server will start now..."
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

npm run dev
