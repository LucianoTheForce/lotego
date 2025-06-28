# Instruções para Configurar o Supabase

## 1. Executar as Migrações

Execute os arquivos SQL na seguinte ordem no SQL Editor do Supabase Dashboard:

1. **001_create_tables.sql** - Cria as tabelas principais
2. **002_rls_policies.sql** - Configura as políticas de segurança RLS
3. **003_functions.sql** - Cria funções e triggers úteis
4. **004_storage.sql** - Configura os buckets de storage

## 2. Configurar Autenticação

No Dashboard do Supabase:

1. Vá para Authentication > Providers
2. Habilite Email/Password
3. Configure as URLs de redirecionamento:
   - Site URL: `http://localhost:3000` (desenvolvimento)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 3. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

## 4. Testar a Configuração

Após executar todas as migrações, você pode testar com:

```sql
-- Verificar se as tabelas foram criadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verificar políticas RLS
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Verificar buckets de storage
SELECT * FROM storage.buckets;
```

## 5. Gerar Tipos TypeScript

Após configurar o banco, gere os tipos TypeScript:

```bash
npx supabase gen types typescript --project-id seu_project_id > src/types/supabase.ts
```

## Funcionalidades Implementadas

### Tabelas
- **profiles**: Perfis de usuários (compradores, vendedores, corretores, admin)
- **properties**: Terrenos cadastrados com localização geográfica
- **visits**: Visitas agendadas
- **commissions**: Sistema de comissões

### Segurança (RLS)
- Perfis públicos visíveis para todos
- Apenas proprietários podem editar seus terrenos
- Sistema de permissões baseado em roles
- Proteção de dados sensíveis (comissões)

### Funções Úteis
- `handle_new_user()`: Cria perfil automaticamente no signup
- `search_properties_by_location()`: Busca terrenos por proximidade
- `calculate_commission()`: Calcula comissões e taxas
- `get_property_statistics()`: Estatísticas de um terreno

### Storage
- **property-images**: Imagens de terrenos (até 5MB)
- **avatars**: Fotos de perfil (até 1MB)

## Próximos Passos

1. Implementar a integração com Mapbox no frontend
2. Criar as páginas de cadastro e busca de terrenos
3. Implementar o sistema de agendamento de visitas
4. Adicionar dashboard para corretores e vendedores