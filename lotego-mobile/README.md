# LotGo Mobile

React Native app para a plataforma LotGo usando Expo.

## Setup

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

Adicione suas credenciais do Supabase e Mapbox no arquivo `.env`.

3. Rodar o app:
```bash
# iOS
npm run ios

# Android  
npm run android

# Web
npm run web
```

## Estrutura

```
src/
├── screens/        # Telas do app
├── components/     # Componentes reutilizáveis
├── navigation/     # Configuração de navegação
├── services/       # Serviços (Supabase, etc)
├── hooks/          # Custom hooks
├── types/          # TypeScript types
├── utils/          # Utilidades
└── constants/      # Constantes e configurações
```

## Build

Para criar builds de produção:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Build para iOS
eas build --platform ios

# Build para Android
eas build --platform android
```