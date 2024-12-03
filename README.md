
# ToDo App

Projeto de um ToDo App, objetivo do usuário:
- Criar tarefas
- Atualizar status das tarefas
- Remover tarefas
- Listar todas as tarefas

Para realizar todas as operações de tarefas, o usuário deve estar previamento logado e caso não tenha uma conta, poderá se registrar.




## Tech Stack

**Database:** MongoDb, Redis

**Servidor:** Node.js, Express

**Deploy:** Heroku

**Bibliotecas e frameworks**: bcrypt, cookie-parser, dotenv, helmet, jsonwebtoken, mongoose







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


Takes two numbers and returns the sum.


## Roadmap

- Criação de testes unitários para as requisições

- Documentação da API no swagger



## Support

Para suporte, email: vinyby@gmail.com

