# 🚀 Como Acessar o LotGo do Windows

## ✅ Servidor Rodando!

O servidor Next.js está funcionando perfeitamente no WSL.

### 🌐 URLs de Acesso:

#### Do WSL (Linux):
- **Homepage:** http://localhost:3000
- **Busca Mobile:** http://localhost:3000/buscar
- **API:** http://localhost:3000/api/properties

#### Do Windows (Navegador):
- **Homepage:** http://172.24.232.248:3000
- **Busca Mobile:** http://172.24.232.248:3000/buscar
- **API:** http://172.24.232.248:3000/api/properties

### 🔧 Como iniciar o servidor:

1. No terminal WSL:
```bash
cd /home/he_orce/projetos/lotego
npm run dev
```

2. Ou use o script:
```bash
./start-server.sh
```

### 📱 Interface Mobile-First Airbnb:
- Header expansível com busca
- Filtros horizontais em pills
- Cards estilo Airbnb
- Mapa interativo com overlay
- Animações suaves

### ⚠️ Troubleshooting:

Se não conseguir acessar do Windows:
1. Verifique se o firewall permite a conexão
2. Use o comando `wsl hostname -I` para pegar o IP atual
3. Certifique-se que o servidor está rodando com `ps aux | grep next`