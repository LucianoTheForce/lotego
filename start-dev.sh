#!/bin/bash

# Kill any existing processes
pkill -f "next dev" 2>/dev/null
pkill -f "node.*next" 2>/dev/null
sleep 2

# Get WSL IP
WSL_IP=$(hostname -I | awk '{print $1}')

echo "🚀 Starting LotGo Development Server"
echo "===================================="
echo ""
echo "📱 Access URLs:"
echo "   • http://localhost:3000"
echo "   • http://127.0.0.1:3000"
echo "   • http://$WSL_IP:3000"
echo ""
echo "💡 If localhost doesn't work, try the IP address above"
echo ""

# Start the server
npm run dev -- --hostname 0.0.0.0 --port 3000