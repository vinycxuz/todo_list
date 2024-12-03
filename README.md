
# ToDo App

Projeto de um ToDo App, objetivo do usuário:
- Criar tarefas
- Atualizar status das tarefas
- Remover tarefas
- Listar todas as tarefas

Para realizar todas as operações de tarefas, o usuário deve estar previamento logado e caso não tenha uma conta, poderá se registrar.




## Tech Stack
OBS: Entre parênteses a explicação
**Database:** 
MongoDb (por ser mais leve e buscas mais rápidas e não ter a necessidade de relacionamentos já que nesse caso posso referenciar as tarefas ao usuário único), 
Redis (foi pré-requisito)

**Servidor:** 
Node.js com Express (Por expertise)

**Deploy:** Heroku (O Heroku já faz a configuração de SSL, entçao optei por fazer deploy do backend no heroku e frontend com Azure)

**Bibliotecas e frameworks**: 
- bcrypt (hash das senhas)
- cookie-parser (manipulação dos cookies)
- dotenv 
- helmet (segurança das cabeçalhos HTTPS)
- jsonwebtoken (pré-requisito) 
- mongoose (requisições no banco de dados noSql)
- express-validator (sanitização das entradas)

## Environment Variables

Para rodar esse projeto, irá precisar criar um arquivo .env para:

`STRING_CONNECTION` (string conexão do mongodb)

`JWT_SECRET` (para configuração de token)

`REDIS_HOST` (Host da database criado na sua conta redis)

`REDIS_PASSWORD` (Senha de após criação de database no redis)

`REDIS_PORT` (Porta do host da database criado na sua conta redis)

## API

### Tasks

#### Get all tasks items

```http
  GET /tasks/
```

#### Create Task

```http
  POST /tasks/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.|
| `description`      | `string` | .|
| `status`      | `string` | .|
| `creation_date`      | `string` | .|
| `updated_date`      | `string` | .|
| `user`      | `Schema` | |

User não está como required mas só é possível realizar criação de tasks autenticado

#### Update Task

```http
  PUT /tasks/update/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.|
| `description`      | `string` | .|
| `status`      | `string` | .|
| `creation_date`      | `string` | .|
| `updated_date`      | `string` | .|
| `user`      | `Schema` | |

#### Delete Task

```http
  DELETE /tasks/delete/:id
```

### User

#### Signup User

```http
  POST /users/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.|
| `user`      | `string` | **Required**.|
| `email`      | `string`| **Required**.|
| `password`      | `string` | **Required**.|



```http
  POST /users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string`| **Required**.|
| `password`      | `string` | **Required**.|


OBS: Senha precisa ter uma maiuscula, uma minuscula, um símbolo que não pode ser o ponto, um número e o mínimo de 8 caracteres

## Roadmap dos próximos updates

- Criação de testes unitários para as requisições

- Documentação da API no swagger

- API da openai para sugestão de descrição a partir do título da tarefa

## Support

Para suporte, email: vinyby@gmail.com

