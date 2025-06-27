# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## LotGo - Plataforma Digital para Venda de Terrenos

**Stack Principal:**
- Next.js 15.3.4 (App Router)
- React 19.0.0
- TypeScript 5+
- Tailwind CSS v4
- Supabase (banco de dados e autenticação)
- Mapbox (mapas e geolocalização)
- Deployment: Vercel

## Comandos Essenciais

```bash
npm run dev        # Servidor desenvolvimento (porta aleatória preferida)
npm run build      # Build para produção  
npm run start      # Servidor produção
npm run lint       # Verificar código com ESLint
```

**Nota**: Usar portas aleatórias em desenvolvimento (ex: `next dev --turbopack --port 3847`)

## Arquitetura do Projeto

### Estrutura de Diretórios
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas autenticadas
│   ├── (public)/          # Rotas públicas
│   ├── api/               # API routes
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes UI base
│   ├── map/              # Componentes Mapbox
│   └── forms/            # Formulários
├── lib/                   # Utilidades e configurações
│   ├── supabase/         # Cliente Supabase
│   └── mapbox/           # Configuração Mapbox
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── styles/               # Estilos globais
```

### Funcionalidades Principais

1. **Cadastro de Terrenos**: Upload de imagens, coordenadas geográficas, informações do lote
2. **Busca com Mapas**: Integração Mapbox para visualização e busca por localização
3. **Sistema de Visitas**: Agendamento com corretores estilo Uber
4. **Comissionamento**: Sistema transparente de comissões para corretores e plataforma

### Padrões de Desenvolvimento

- **Componentes**: Funcionais com TypeScript strict, evitar `any`
- **Autenticação**: Supabase Auth com RLS (Row Level Security)
- **API**: Route handlers do Next.js 15 (não API routes antigas)
- **Estado**: React hooks + Context API (evitar estado global desnecessário)
- **Formulários**: React Hook Form + Zod para validação
- **Mapas**: Mapbox GL JS com React wrapper

### Configurações Importantes

1. **Variáveis de Ambiente** (.env.local):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_TOKEN`

2. **Supabase Tables**:
   - `profiles`: Dados de usuários
   - `properties`: Terrenos cadastrados
   - `visits`: Visitas agendadas
   - `commissions`: Comissões de vendas

3. **Segurança**:
   - Nunca commitar .env
   - Usar RLS do Supabase
   - Validar inputs no servidor
   - Sanitizar dados geográficos

### Workflow de Desenvolvimento

1. Sempre rodar lint antes de commits
2. Testar em diferentes viewports (mobile-first)
3. Verificar performance com Lighthouse
4. Manter componentes < 300 linhas
5. Documentar APIs complexas com JSDoc