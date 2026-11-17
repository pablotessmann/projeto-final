# Projeto Final Senac: NestJS + Vue 3 + MySQL (alwaysdata)

```
Navegador (Vue 3)  →  API NestJS (Node)  →  MySQL no alwaysdata
localhost:3000        localhost:8080         mysql-SUACONTA.alwaysdata.net
```

Tudo roda no Docker: não é preciso instalar Node.js.

## Antes de tudo

1. Rode `banco/schema.sql` no phpMyAdmin do alwaysdata.
2. Copie `.env.example` para `.env` e preencha os dados do banco (`DB_HOST`, `DB_USER`,
   `DB_PASSWORD`, `DB_NAME`).

## Modo 1 · Construir as imagens a partir do código (dia a dia)

Na raiz do projeto:

```bash
docker compose up --build
```

O Docker baixa as imagens oficiais (Node e nginx), compila o código
e cria as imagens do projeto: `projeto-final-api` e `projeto-final-web`.

- Site: http://localhost:3000
- API: http://localhost:8080
- Documentação da API (Swagger): http://localhost:8080/api/docs
- Desligar: `docker compose down`

Para ver as imagens criadas: `docker compose images`

## Modo 2 · Publicar no Docker Hub e usar a imagem pronta (opcional)

Útil para quem vai só usar o sistema, sem esperar a compilação (o professor, por exemplo).
Crie uma conta gratuita em https://hub.docker.com e troque `seuusuario` pelo seu usuário.

**Quem publica (a equipe):**

```bash
docker login
docker build -t seuusuario/projeto-final-api:1.0 ./backend
docker build --build-arg VITE_API_URL=http://localhost:8080 -t seuusuario/projeto-final-web:1.0 ./frontend
docker push seuusuario/projeto-final-api:1.0
docker push seuusuario/projeto-final-web:1.0
```

**Quem usa:** precisa só do `compose.hub.yaml` (com o mesmo usuário) e de um `.env` preenchido.

```bash
docker compose -f compose.hub.yaml pull
docker compose -f compose.hub.yaml up
```

Importante:

- A senha **não** vai dentro da imagem: o `.env` fica fora dela, e cada pessoa usa o seu.
- O endereço da API (`http://localhost:8080`) fica gravado na imagem do site durante o build.
- Mudou o código? Gere uma nova versão (`:1.1`), publique de novo e atualize o `compose.hub.yaml`.

## Rotas da API

| Verbo  | Rota                | O que faz        |
|--------|---------------------|------------------|
| GET    | /api/produtos       | Lista todos      |
| GET    | /api/produtos/{id}  | Busca um         |
| POST   | /api/produtos       | Cadastra         |
| PUT    | /api/produtos/{id}  | Altera           |
| DELETE | /api/produtos/{id}  | Exclui           |

Os testes de cada rota estão em `backend/Api.http` (extensão REST Client do VS Code).
Também dá para testar pelo navegador no Swagger: http://localhost:8080/api/docs
(clique na rota → **Try it out** → **Execute**).
