#!/bin/bash

echo "🚀 Iniciando servidor LotGo..."

# Kill any existing Next.js processes
echo "Limpando processos antigos..."
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Clear Next.js cache
echo "Limpando cache..."
rm -rf .next

# Start server
echo "Iniciando servidor na porta 3000..."
PORT=3000 npm run dev &

# Wait for server to start
echo "Aguardando servidor iniciar..."
sleep 5

# Test if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Servidor rodando em http://localhost:3000"
    echo "🌐 Para acessar do Windows: http://$(hostname -I | awk '{print $1}'):3000"
else
    echo "❌ Erro ao iniciar servidor"
fi