# Projeto Completo – Produtos e Categorias

Front-end **Angular 18** consumindo uma API **Spring Boot** integrada ao **MongoDB (Atlas)**.

## Integrantes
| Nome completo | Matrícula |
|---|---|
| Samuel De Souza Santos | 2525050004 |
| Everton Vieira | 2525050036 |

## Estrutura
```
backend/    API REST (Java 25, Spring Boot 4.1, Spring Data MongoDB)
frontend/   Angular 18 (HttpClient)
```

## Como rodar

### 1. Back-end (porta 8080)
Defina a URI do MongoDB na variável de ambiente `MONGODB_URI` (sem ela, usa um Mongo local em `mongodb://localhost:27017/demo`):

```bash
cd backend
# Linux/Mac
export MONGODB_URI="mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/demo"
./mvnw spring-boot:run

# Windows (PowerShell)
$env:MONGODB_URI="mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/demo"
.\mvnw.cmd spring-boot:run
```

### 2. Front-end (porta 4200)
```bash
cd frontend
npm install
npm start
```
Abra http://localhost:4200

## Endpoints da API
| Método | Rota | Descrição |
|---|---|---|
| GET | /categorias | Lista categorias |
| GET | /categorias/{id} | Busca categoria por id |
| POST | /categorias | Cria categoria |
| PUT | /categorias/{id} | Atualiza categoria |
| DELETE | /categorias/{id} | Remove categoria |
| GET | /produtos | Lista produtos |
| GET | /produtos/{id} | Busca produto por id |
| POST | /produtos | Cria produto (com `categoria` referenciada) |
| PUT | /produtos/{id} | Atualiza produto |
| DELETE | /produtos/{id} | Remove produto |

Os dados ficam nas coleções `categorias` e `produtos` do MongoDB (Produto referencia Categoria via `@DBRef`).
O CORS está liberado para `http://localhost:4200` (`CorsConfig.java`).
