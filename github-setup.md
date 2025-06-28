# 🚀 Instruções para subir LotGo no GitHub

## 1. Criar repositório no GitHub
1. Vá para https://github.com
2. Clique em "New repository"
3. Nome: `lotego`
4. Descrição: `🏡 LotGo - Plataforma digital para compra e venda de terrenos no Brasil`
5. Deixe público ou privado (sua escolha)
6. **NÃO** marque "Add a README file"
7. Clique "Create repository"

## 2. Conectar repositório local (execute estes comandos):

```bash
# Adicionar origem remota (substitua SEU_USERNAME pelo seu usuário GitHub)
git remote add origin https://github.com/SEU_USERNAME/lotego.git

# Renomear branch para main (padrão GitHub)
git branch -M main

# Fazer push inicial
git push -u origin main
```

## 3. Verificar se subiu corretamente
Acesse: https://github.com/SEU_USERNAME/lotego

## 📁 Estrutura do projeto que foi commitada:
- ✅ 43 arquivos
- ✅ 11.340+ linhas de código
- ✅ Documentação completa (CLAUDE.md, README.md, docs/)
- ✅ Código fonte completo (src/)
- ✅ Configurações (package.json, tsconfig.json, etc.)

## 🎯 Próximos passos após o GitHub:
1. Configurar Vercel para deploy automático
2. Adicionar variáveis de ambiente (Supabase + Mapbox)
3. Configurar domínio personalizado
4. Criar issues e milestones para desenvolvimento

## 🔐 Variáveis de ambiente necessárias:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_APP_URL=https://lotego.vercel.app
``` 