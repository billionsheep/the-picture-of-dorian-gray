#!/bin/bash
echo "============================================"
echo "  The Picture of Dorian Gray"
echo "  Interactive Point-and-Click Game"
echo "============================================"
echo ""
echo "Starting local server..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/dist"

if command -v python3 &> /dev/null; then
    echo "Opening game at http://localhost:8000"
    open http://localhost:8000 2>/dev/null || xdg-open http://localhost:8000 2>/dev/null
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Opening game at http://localhost:8000"
    open http://localhost:8000 2>/dev/null || xdg-open http://localhost:8000 2>/dev/null
    python -m http.server 8000
elif command -v npx &> /dev/null; then
    echo "Opening game at http://localhost:3000"
    open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null
    npx -y serve . -p 3000
else
    echo "ERROR: Neither Python nor Node.js found."
    echo "Please install Python (https://python.org) or Node.js (https://nodejs.org)"
fi
