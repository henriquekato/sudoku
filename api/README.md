# API

Disponibiliza e verifica sudokus

## Pré-requisitos

- Nodejs
- PostgreSQL

## Starting

### Sem docker

- Crie a database no PostgreSQL
- Coloque suas chaves pública ( `public.key` ) e privada ( `private.key` ) em `/api/keys`
- Instale as dependências da API

  ```
  cd sudoku/api
  npm i
  ```

- Crie um arquivo `.env` (na pasta `/api`) como no exemplo, com o seu usuário e senha:

  ```
  HOST=localhost
  PORT=5432
  DIALECT=postgres
  DATABASE=sudoku
  USER=user
  PASSWORD=passsword
  ```

- Crie o banco de dados com os seguintes comandos:

  ```
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
  ```

- Inicie a API: `node server.js`, estará na porta 8000

### Com docker

```
docker network create sudoku

docker build -f .\Dockerfile.database -t imgbanco .
docker run -d --name banco --network sudoku -p 5432:5432 imgbanco

docker build -f .\Dockerfile.backend -t imgbackend .
docker run -d --name backend --network sudoku -p 8000:8000 imgbackend
```

## Rotas da API

### Requests

As requisições POST precisam que o `Content-type` esteja com o valor `application/json`

Todas as rotas precisam do token JWT no header da requisição, exceto as rotas `/signup` e `/login`, no formato

```
Authorization: Bearer `token`
Content-type: application/json
```

### Responses

Todas as "responses" possuem uma chave de menssagem com uma breve descrição do que ocorreu, exceto as com status code 204

- Responses de sucesso têm a chave "success" contendo um string
- Responses de erro têm a chave "errors" contendo um array de strings

```
{
    "success": "Cadastro feito com sucesso"
}
```

## Lista dos endpoints

| Endpoint                                  | Descrição                |
| ----------------------------------------- | ------------------------ |
| POST <kbd>/signup</kbd>                   | Cadastra um jogador      |
| POST <kbd>/login</kbd>                    | Autentica um jogador     |
| GET <kbd>/game/new</kbd>                  | Jogo aleatório de sudoku |
| GET <kbd>/game/new/{boardId}</kbd>        | Jogo de sudoku           |
| POST <kbd>/game/validate</kbd>            | Valida sudoku            |
| GET <kbd>/profile</kbd>                   | Jogos concluídos         |
| GET <kbd>/profile/{gameId}</kbd>          | Jogo concluído           |
| GET <kbd>/ranking/{boardId}</kbd>         | Ranking de um tabuleiro  |
| GET <kbd>/board/all</kbd>                 | Tabuleiros cadastrados   |
| POST <kbd>/board/create</kbd>             | Cadastra um tabuleiro    |
| PUT <kbd>/board/edit/{boardId}</kbd>      | Edita um tabuleiro       |
| DELETE <kbd>/board/delete/{boardId}</kbd> | Deleta um tabuleiro      |

### POST /signup

Fazer o cadastro de um jogador

**REQUEST**

```
{
    "name": "name"
    "email": "email@email.email",
    "password": "password"
}
```

**RESPONSE 201**

Cadastro do jogador

**RESPONSE 400**

Se pelo menos algum dos campos não passar da validação:

- nome: não pode ser vazio
- email: email válido
- senha: 4 a 50 caracteres

**RESPONSE 409**

Se o email já tiver sido cadastrado

### POST /login

**REQUEST**

```
{
    "email": "email@email.email",
    "password": "password"
}
```

**RESPONSE 200**

```
{
    "token": { jwt token },
    "succcess": "Login feito com sucesso"
}
```

**RESPONSE 401**

Se pelo menos algum dos campos não passar da validação: campos faltando, email não cadastrado ou senha incorreta

### GET /game/new

Um tabuleiro aleatório para jogar

Apenas onde tiver números "0" devem ser preenchidos

**RESPONSE 200**

```
{
    "success": "Listagem feita com sucesso",
    "id": 1,
    "matrix": "[
      [1, 2, 3, 4, 5, 6, 7, 8, 0],
      [4, 5, 0, 7, 8, 9, 0, 0, 3],
      [7, 8, 0, 1, 2, 3, 4, 5, 6],
      [2, 3, 0, 5, 6, 7, 8, 9, 1],
      [5, 6, 0, 8, 9, 1, 2, 3, 4],
      [8, 9, 0, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ]"
}
```

**RESPONSE 204**

Quando não há nenhum tabuleiro cadastrado

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

### GET /game/new/{boardId}

O tabuleiro de ID informado

Apenas onde tiver números "0" devem ser preenchidos

**RESPONSE 200**

```
{
    "success": "Listagem feita com sucesso",
    "id": 1,
    "matrix": "[
      [1, 2, 3, 4, 5, 6, 7, 8, 0],
      [4, 5, 0, 7, 8, 9, 0, 0, 3],
      [7, 8, 0, 1, 2, 3, 4, 5, 6],
      [2, 3, 0, 5, 6, 7, 8, 9, 1],
      [5, 6, 0, 8, 9, 1, 2, 3, 4],
      [8, 9, 0, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ]"
}
```

**RESPONSE 400**

Se o ID não for um inteiro (nessa API os ids são representados por inteiros)

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 404**

Se o tabuleiro de ID informado não existir

### POST /game/validate

Valida um jogo de sudoku

**REQUEST**

```
{
  "boardId": 3,
  "matrix": [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
  ],
  "completionTime": "00:12:45"
}
```

**RESPONSE 201**

Solução válida

**RESPONSE 400**

- Se o ID não for um inteiro (nessa API os ids são representados por inteiros)
- Se a matriz for inválida: não for uma matriz 9x9 ou os números predefinidos foram modificados
- Se o tempo de conclusão for inválido

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 404**

Se o tabuleiro de ID informado não existir

**RESPONSE 422**

- Se o tempo de conclusão for maior que 1 hora
- Solução inválida

  ```
  {
    "errors": ["Sudoku completado incorretamente."],
    "invalidNumberPositions": [[1,1],[1,2],[6,2]]
  }
  ```

### GET /profile

Informações dos jogos concluídos pelo jogador: id do jogo, tempo de conclusão e id do tabuleiro

Não é possível que um jogador liste as partidas de outro jogador

**RESPONSE 200**

```

{
  "success": "Listagem feita com sucesso",
  "gameIds": [
    {
      "id": 3,
      "completionTime": "00:10:00",
      "boardId": 1
    },
    {
      "id": 4,
      "completionTime": "00:09:00",
      "boardId": 2
    },
    {
      "id": 5,
      "completionTime": "00:05:00",
      "boardId": 3
    }
  ]
}

```

### GET /profile/{gameId}

Jogo concluído

Não é possível que um jogador liste a partida de outro jogador

**RESPONSE 200**

```

{
  "success": "Listagem feita com sucesso",
  "game": {
    "id": 3,
    "completionTime": "00:10:10",
    "matrix": [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ],
    "boardId": 1
  }
}

```

**RESPONSE 400**

Se o ID não for um inteiro (nessa API os ids são representados por inteiros)

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 403**

Se a partida for de outro jogador

**RESPONSE 404**

Se o jogo de ID informado não existir

### GET /game/ranking/{boardId}

Ranking de um tabuleiro, por tempo, dos 10 primeiros colocados

**RESPONSE 200**

```

{
  "success": "Listagem feita com sucesso",
  "ranking": [
    {
      "id": 17,
      "completionTime": "00:05:00",
      "userName": "player1"
    },
    {
      "id": 22,
      "completionTime": "00:07:00",
      "userName": "player2"
    }
  ]
}

```

**RESPONSE 400**

Se o ID não for um inteiro (nessa API os ids são representados por inteiros)

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 404**

Se o tabuleiro de ID informado não existir

### GET /board/all

Todos os IDs de tabuleiros cadatrados

**RESPONSE 200**

```

{
  "success": "Listagem feita com sucesso",
  "boardIds": [2,3,4,1,5]
}

```

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

### POST /board/create

Cadastra um tabuleiro de sudoku

O número "0" indica que deverá ser preenchido com algum número pelo jogador

**REQUEST**

```

{
  "matrix": [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [0, 8, 9, 1, 0, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 0, 7, 8, 9, 1, 0, 3, 4],
    [8, 9, 1, 2, 0, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 0, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 0, 5, 6, 7, 8]
  ]
}

```

**RESPONSE 201**

Tabuleiro cadastrado

**RESPONSE 400**

Se a matriz for inválida: não for uma matriz 9x9

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 422**

Não será possível ter uma solução válida

### PUT /board/edit/{boardId}

Edita um tabuleiro de sudoku

**REQUEST**

```

{
  "matrix": [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [0, 8, 9, 1, 0, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 0, 7, 8, 9, 1, 0, 3, 4],
    [8, 9, 1, 2, 0, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 0, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 0, 5, 6, 7, 8]
  ]
}

```

**RESPONSE 200**

Tabuleiro editado

**RESPONSE 400**

- Se o ID não for um inteiro (nessa API os ids são representados por inteiros)
- Se a matriz for inválida: não for uma matriz 9x9

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

**RESPONSE 422**

Não será possível ter uma solução válida

### DELETE /board/delete/{boardId}

Deleta um tabuleiro de sudoku

**RESPONSE 204**

Tabuleiro deletado

**RESPONSE 401**

Se o token for inválido: requisições sem header, requisições sem token, token inválido ou token expirado

## Tabelas do banco de dados

### Tabela `user`

- `id`: id do usuário (integer, primary key, autoincrement)
- `name`: nome do usuário (string, not null)
- `email`: email do usuário (string, not null, unique)
- `password`: senha do usuário (string, not null)

### Tabela `board`

- `id`: id do tabuleiro (integer, primary key, autoincrement)
- `matrix`: matriz 9x9 de um tabuleiro incompleto (json, not null)

### Tabela `game`

- `id`: id do jogo (integer, primary key, autoincrement)
- `completionTime`: tempo de conclusão do jogo (time, not null)
- `matrix`: matriz após a conclusão do jogo (json, not null)
- `userId`: usuário que completou o jogo (integer, foreign key)
- `boardId`: tabuleiro usado (integer, foreign key)

### Notas

- `matrix` precisa ser 9x9, em que o número 0 representa espaços que devem ser preenchidos
