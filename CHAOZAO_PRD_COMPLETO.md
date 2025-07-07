# PRD - Product Requirements Document
## Plataforma de Imóveis Rurais baseada no Chãozão

### 1. VISÃO GERAL DO PRODUTO

**Nome**: Portal de Imóveis Rurais  
**Tagline**: "O Maior Portal de Imóveis Rurais do Brasil"  
**Objetivo**: Conectar compradores e vendedores de propriedades rurais (fazendas, sítios, chácaras, terrenos rurais)  
**Público-Alvo**: Investidores, produtores rurais, famílias buscando qualidade de vida no campo  

### 2. ESPECIFICAÇÕES TÉCNICAS

#### 2.1 Stack Tecnológico
- **Frontend**: Next.js 15 com React 19
- **UI Library**: Chakra UI (ou equivalente)
- **Styling**: Tailwind CSS v4
- **TypeScript**: Implementação obrigatória
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Maps**: Mapbox GL JS
- **Analytics**: Google Tag Manager
- **Deploy**: Vercel

#### 2.2 Design System

**Cores Principais:**
```css
--brand-primary: #38A169;    /* Verde principal */
--brand-secondary: #F7B82B;  /* Amarelo */
--gray-50: #F7FAFC;         /* Fundo claro */
--gray-900: #171923;        /* Texto escuro */
--white: #FFFFFF;           /* Backgrounds */
```

**Tipografia:**
- **Família**: Nunito Sans
- **Pesos**: 400, 600, 700, 800
- **Escala**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl

### 3. ESTRUTURA DE PÁGINAS

#### 3.1 Homepage (/)
**Componentes obrigatórios:**
- Header com logo e navegação
- Hero section com busca principal
- Seção de propriedades em destaque
- Categorias de propriedades
- Estatísticas da plataforma
- Seção "Como funciona"
- Footer completo

#### 3.2 Autenticação
- **/login**: Email + senha com validação
- **/register**: Cadastro simplificado
- **/forgot-password**: Recuperação de senha

#### 3.3 Propriedades
- **/imovel/[slug]/[id]**: Página detalhada da propriedade
- **/buscar**: Página de busca com filtros
- **/favoritos**: Propriedades salvas (usuário logado)

#### 3.4 Institucionais
- **/sobre**: Quem somos
- **/contato**: Informações de contato
- **/termos**: Termos de uso
- **/privacidade**: Política de privacidade

### 4. FUNCIONALIDADES PRINCIPAIS

#### 4.1 Sistema de Busca
**Filtros obrigatórios:**
- Estado/Cidade
- Tipo de propriedade (Fazenda, Sítio, Chácara, Terreno)
- Faixa de preço
- Área (hectares/alqueires)
- Características (água, energia, benfeitorias)

**Visualização:**
- Lista com cards
- Mapa com pins
- Ordenação por preço, área, relevância

#### 4.2 Página de Propriedade
**Elementos obrigatórios:**
- Galeria de fotos (carrossel)
- Informações básicas (preço, área, localização)
- Descrição detalhada
- Características e benfeitorias
- Mapa da localização
- Botão de contato/WhatsApp
- Propriedades relacionadas

#### 4.3 Sistema de Contato
**Canais integrados:**
- WhatsApp (botão flutuante)
- Telefone comercial
- Email
- Formulário de contato

### 5. ESPECIFICAÇÕES DE INTERFACE

#### 5.1 Header
```jsx
Header = {
  logo: "Chãozão",
  tagline: "O Maior Portal de Imóveis Rurais do Brasil",
  menu: ["Início", "Buscar", "Sobre", "Contato"],
  actions: ["Login", "Cadastrar"],
  responsive: true
}
```

#### 5.2 Hero Section
```jsx
HeroSection = {
  background: "image-overlay",
  headline: "Encontre sua propriedade rural ideal",
  subheadline: "Milhares de fazendas, sítios e chácaras",
  searchForm: {
    location: "dropdown",
    type: "select",
    priceRange: "slider",
    cta: "Buscar Propriedades"
  }
}
```

#### 5.3 Card de Propriedade
```jsx
PropertyCard = {
  image: "carousel-thumb",
  title: "string",
  location: "city, state",
  price: "R$ formatted",
  area: "hectares",
  features: ["water", "energy", "buildings"],
  actions: ["favorite", "share", "contact"]
}
```

### 6. BANCO DE DADOS

#### 6.1 Tabelas Principais
```sql
-- Usuários
profiles (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  phone VARCHAR,
  user_type ENUM('buyer', 'seller', 'broker'),
  created_at TIMESTAMP
);

-- Propriedades
properties (
  id UUID PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  property_type ENUM('fazenda', 'sitio', 'chacara', 'terreno'),
  price DECIMAL(15,2),
  area DECIMAL(10,2),
  area_unit ENUM('hectares', 'alqueires'),
  state VARCHAR(2),
  city VARCHAR,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  features JSONB,
  images TEXT[],
  owner_id UUID REFERENCES profiles(id),
  status ENUM('active', 'sold', 'inactive'),
  created_at TIMESTAMP
);

-- Contatos/Leads
contacts (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id),
  buyer_id UUID REFERENCES profiles(id),
  message TEXT,
  contact_type ENUM('whatsapp', 'phone', 'email'),
  created_at TIMESTAMP
);

-- Favoritos
favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  property_id UUID REFERENCES properties(id),
  created_at TIMESTAMP
);
```

### 7. INTEGRAÇÃO COM MAPBOX

#### 7.1 Funcionalidades
- Mapa interativo na busca
- Pins com preview das propriedades
- Filtro por área geográfica
- Cálculo de distâncias
- Visualização de propriedades próximas

#### 7.2 Implementação
```jsx
// Componente de Mapa
MapboxComponent = {
  properties: "array",
  center: "[lat, lng]",
  zoom: "number",
  markers: "custom-pins",
  popup: "property-preview",
  cluster: true
}
```

### 8. INTEGRAÇÃO WHATSAPP

#### 8.1 Botão Flutuante
```jsx
WhatsAppFloat = {
  position: "fixed-bottom-right",
  number: "5562993076256",
  message: "Olá! Tenho interesse em propriedades rurais",
  visibility: "always"
}
```

#### 8.2 Contato por Propriedade
```jsx
PropertyContact = {
  action: "open-whatsapp",
  number: "owner-phone",
  message: "Tenho interesse na propriedade: [property-title]"
}
```

### 9. SISTEMA DE BUSCA AVANÇADA

#### 9.1 Filtros Disponíveis
- **Localização**: Estado > Cidade > Região
- **Tipo**: Fazenda, Sítio, Chácara, Terreno
- **Preço**: Slider com min/max
- **Área**: Input com unidade (hectares/alqueires)
- **Características**: Checkboxes múltiplas

#### 9.2 Funcionalidades
- Busca por texto livre
- Filtros combinados
- Ordenação múltipla
- Paginação
- Contagem de resultados

### 10. RESPONSIVIDADE

#### 10.1 Breakpoints
```css
/* Mobile First */
sm: '640px',   /* Tablet */
md: '768px',   /* Tablet Large */
lg: '1024px',  /* Desktop */
xl: '1280px',  /* Desktop Large */
2xl: '1536px'  /* Desktop XL */
```

#### 10.2 Componentes Adaptativos
- Menu mobile com hamburger
- Cards em grid responsivo
- Formulários adaptáveis
- Mapas redimensionáveis

### 11. SEO E PERFORMANCE

#### 11.1 SEO
- Meta tags dinâmicas
- Sitemap XML automático
- Schema.org para propriedades
- URLs amigáveis
- Open Graph tags

#### 11.2 Performance
- Lazy loading de imagens
- Otimização de mapas
- Cache de busca
- Compressão de assets

### 12. ANALYTICS E TRACKING

#### 12.1 Google Tag Manager
```jsx
GTM_Events = {
  property_view: "propriedade visualizada",
  contact_click: "contato iniciado",
  search_performed: "busca realizada",
  user_registered: "usuário cadastrado"
}
```

### 13. INFORMAÇÕES DE CONTATO

#### 13.1 Dados da Empresa
```jsx
CompanyInfo = {
  name: "Chãozão",
  address: "Av. Deputado Jamel Cecílio, 2690 - Ed. Metropolitan Tokyo, Sala 1505",
  city: "Jardim Goiás, Goiânia - GO",
  cep: "74810-100",
  phone: "(62) 3030-1821",
  whatsapp: "(62) 99307-6256",
  email: "contato@chaozao.com.br",
  hours: "Segunda a sexta, 9h às 18h"
}
```

#### 13.2 Redes Sociais
- Instagram: @chaozao.br
- Facebook: Chãozão
- LinkedIn: Chãozão
- YouTube: Chãozão

### 14. FLUXOS DE USUÁRIO

#### 14.1 Fluxo de Busca
1. Usuário acessa homepage
2. Utiliza filtros de busca
3. Visualiza resultados (lista/mapa)
4. Clica em propriedade de interesse
5. Visualiza detalhes completos
6. Inicia contato via WhatsApp

#### 14.2 Fluxo de Cadastro
1. Usuário clica em "Cadastrar"
2. Preenche dados básicos
3. Aceita termos de uso
4. Recebe email de confirmação
5. Ativa conta
6. Acessa funcionalidades logadas

### 15. FUNCIONALIDADES FUTURAS

#### 15.1 Fase 2
- Blog sobre mercado rural
- Calculadora de financiamento
- Comparador de propriedades
- Alertas de novas propriedades

#### 15.2 Fase 3
- App mobile nativo
- Tour virtual 360°
- Análise de mercado
- Sistema de propostas

### 16. CRITÉRIOS DE ACEITAÇÃO

#### 16.1 Performance
- Página inicial carrega em < 3s
- Busca retorna resultados em < 2s
- Imagens otimizadas para web
- Score Lighthouse > 85

#### 16.2 Usabilidade
- Funciona em todos os navegadores modernos
- Responsivo em todos os dispositivos
- Acessibilidade WCAG 2.1 nível AA
- Testes de usuário com 90% de sucesso

#### 16.3 Funcionalidade
- Todas as buscas funcionam corretamente
- Integração WhatsApp 100% funcional
- Mapas carregam sem erros
- Formulários com validação completa

### 17. CRONOGRAMA DE DESENVOLVIMENTO

#### 17.1 Sprint 1 (2 semanas)
- Setup do projeto
- Design system básico
- Homepage estrutural
- Autenticação básica

#### 17.2 Sprint 2 (2 semanas)
- Sistema de busca
- Página de propriedade
- Integração com banco de dados
- Mapbox básico

#### 17.3 Sprint 3 (2 semanas)
- WhatsApp integration
- Responsividade completa
- SEO e performance
- Testes e deploy

### 18. RISCOS E MITIGAÇÕES

#### 18.1 Riscos Técnicos
- **Risco**: Performance de mapas
- **Mitigação**: Lazy loading e cluster de pins

#### 18.2 Riscos de Negócio
- **Risco**: Integração WhatsApp
- **Mitigação**: Testes extensivos e fallback

### 19. DEFINIÇÃO DE PRONTO

Uma funcionalidade está pronta quando:
- [ ] Código implementado e testado
- [ ] Responsiva em todos os dispositivos
- [ ] Integrada com backend
- [ ] Validação de dados funcionando
- [ ] Performance otimizada
- [ ] Testes de usuário aprovados
- [ ] Deploy realizado com sucesso

---

**Versão**: 1.0  
**Data**: 2025-01-06  
**Autor**: Claude Code  
**Status**: Aprovado para desenvolvimento