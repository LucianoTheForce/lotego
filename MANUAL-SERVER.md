# 🚨 MANUAL PARA RESOLVER SERVIDOR LOTGO

## Problema Recorrente
O servidor Next.js compila mas não fica acessível do navegador.

## ✅ SOLUÇÃO DEFINITIVA

### 1. Limpar tudo primeiro:
```bash
cd /home/he_orce/projetos/lotego
pkill -f "next" || true
rm -rf .next
sleep 3
```

### 2. Iniciar servidor em background:
```bash
nohup npm run dev -- --port 3847 > server.log 2>&1 &
```

### 3. Aguardar e testar:
```bash
sleep 10
curl http://localhost:3847
```

### 4. Se não funcionar, tentar sem Turbopack:
```bash
pkill -f "next" || true
sleep 3
TURBOPACK=false npm run dev -- --port 3847
```

### 5. URLs para testar:
- Local: http://localhost:3847
- Windows: http://$(hostname -I | awk '{print $1}'):3847
- Busca: http://localhost:3847/buscar

### 6. Debug:
```bash
# Ver se processo está rodando
ps aux | grep next

# Ver log
tail -f server.log

# Testar API
curl http://localhost:3847/api/properties
```

## 🎯 TÉCNICA QUE FUNCIONOU ANTES:
Quando funcionou, você acessou: http://localhost:3847/buscar
E viu as propriedades carregando da API.

## ⚠️ IMPORTANTE:
Se continuar falhando, o problema pode ser:
1. WSL/Windows networking
2. Firewall bloqueando
3. Conflito de porta
4. Problema no código que impede o bind da porta