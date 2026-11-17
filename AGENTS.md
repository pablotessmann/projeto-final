# AGENTS.md

Instruções para agentes de IA (assistentes de código) que trabalham neste repositório.
O conteúdo é o mesmo do `CLAUDE.md`: ao mudar um, mude o outro também.

# Projeto Final Senac

```
Navegador (Vue 3)  →  API NestJS (Node)  →  MySQL no alwaysdata
localhost:3000        localhost:8080         (online, fora do Docker)
```

## Stack
- backend/: API NestJS 11 (TypeScript) + TypeORM + mysql2
- frontend/: Vue 3 + Vite, JavaScript (sem TypeScript), Vue Router, <script setup>
- Banco: MySQL online no alwaysdata. Não criar container nem banco local.

## Tudo roda no Docker
- Não há Node.js instalado: não use npm install, npm create nem nest new/generate.
  Escreva os arquivos diretamente; os pacotes são baixados no build do Docker.
  Para adicionar um pacote, edite `backend/package.json` ou `frontend/package.json` à mão.
- Subir tudo: `docker compose up --build` (site em http://localhost:3000, API em http://localhost:8080)
- Conferir se compila: `docker compose build api` e `docker compose build web`
- Desligar: `docker compose down`
- Não há testes automatizados nem lint. As rotas da API são testadas à mão com
  `backend/Api.http` (extensão REST Client do VS Code) ou pelo Swagger em
  http://localhost:8080/api/docs (configurado em `backend/src/main.ts`).

## Arquitetura (o que não é óbvio)
- **Backend em módulos do Nest**: cada entidade tem uma pasta em `backend/src/` com
  `*.entity.ts` (tabela), `*.dto.ts` (dados enviados pelo cliente), `*.service.ts` (acesso ao banco via `Repository` do TypeORM),
  `*.controller.ts` (rotas) e `*.module.ts`. O módulo é importado em `src/app.module.ts`.
- **TypeORM com `synchronize: false`**: as tabelas já existem no alwaysdata e o TypeORM
  nunca as altera. Tabela nova = criar à mão no phpMyAdmin. Colunas DECIMAL chegam como
  texto do mysql2; use um `transformer` para virar número (ver `produto.entity.ts`).
- **Banco**: chega pelas variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
  (do `.env`, via `env_file` do compose), lidas em `src/app.module.ts`. Sem elas a API não
  sobe. O formato está em `.env.example`.
- **URL da API no frontend é fixada no build**: `VITE_API_URL` é um build arg do Docker
  (definido em `compose.yaml`) e vira constante no JS. É `localhost:8080` porque quem chama
  a API é o navegador, não o container. Mudou o valor? Precisa rebuildar a imagem `web`.
- **Frontend em produção**: o build do Vite é servido por nginx; `frontend/nginx.conf` manda
  qualquer rota para `index.html` (necessário para o Vue Router com `createWebHistory`).
- `src/services/api.js` tem a função base `pedir()` (lança erro se a resposta não for ok e
  retorna `null` em 204). Novas chamadas devem usá-la. Alias `@` = `frontend/src`.

## Adicionar uma nova entidade (caminho completo)
1. Pasta `backend/src/<entidade>/` com entity, DTO, service, controller (`@Controller('api/...')`)
   e module; importar o module em `backend/src/app.module.ts`. Para o Swagger: `@ApiProperty`
   nos campos da entity e do DTO, `@ApiTags`/`@ApiOperation`/`@Api...Response` no controller
   (modelo: `src/produtos/`). O corpo das rotas usa o DTO, nunca `Partial<Entidade>`.
2. Exemplos das rotas em `backend/Api.http`
3. Funções em `frontend/src/services/api.js`
4. View em `frontend/src/views/` + rota em `frontend/src/router/index.js`
5. Atualizar a tabela de rotas no `README.md`

## Regras
- Os dados do banco ficam só no .env da raiz. Nunca escrever senha no código.
- Não abrir nem mostrar o conteúdo do .env.
- SQL sempre com parâmetros (métodos do Repository ou `?` em query manual), nunca juntando texto.
- Rotas da API começam com /api/. CORS liberado só para http://localhost:3000.
- Toda chamada HTTP do frontend fica em src/services/api.js.
- Nomes de variáveis, funções e comentários em português, seguindo o código existente.

## Como me ajudar
- Sou estudante: explique cada mudança em português, de forma simples.
- Trabalhe em etapas pequenas e diga como eu testo cada uma.
