#!/bin/bash

echo "🚀 LotGo Development Server"
echo "=========================="
echo ""
echo "⚠️  WSL2 tem problemas com servidores HTTP."
echo "📁 Abrindo versão estática para desenvolvimento..."
echo ""

# Build the project
echo "🔨 Building LotGo..."
npm run build

# Create static preview
echo "📄 Criando preview estático..."
cp lotgo-test.html public/index-preview.html

# Open in browser
echo "🌐 Abrindo no browser..."
google-chrome file:///home/he_orce/projetos/lotego/public/index-preview.html &

echo ""
echo "✅ LotGo aberto no browser!"
echo ""
echo "📱 Para desenvolvimento completo com hot-reload:"
echo "   1. Use Windows com: http://localhost:3000"
echo "   2. Ou configure WSL2 networking"
echo ""