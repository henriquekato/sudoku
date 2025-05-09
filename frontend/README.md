# Frontend

Interface do site para jogar sudokus

## Starting

### Sem docker

- Inicie a API
- Instale as dependências da API
  ```
  cd sudoku/frontend
  npm i
  ```
- Rode o projeto: `npm run dev`, estará na porta 5173

### Com docker

```
docker build -t imgfrontend .
docker run -d --name frontend --network sudoku -p 3000:3000 imgfrontend
```
- O projeto estará na porta 3000

## Rotas do site

### `/signup`

Página de cadastro
![Página de cadastro](images/singup.png)

### `/login`

Página de login
![Página de cadastro](images/login.png)

### `/`

Home, é possível:

- ver "meus jogos"
- escolher um tabuleiro para jogar
- ver o ranking

![Página de cadastro](images/home.png)

### `/profile`

Página com uma lista dos jogos já completados
![Página de cadastro](images/profile.png)

### `/game`

Página em que é possível jogar sudoku escolhido
![Página de cadastro](images/game.png)

### `/ranking`

Página com os 10 primeiros colocados de um tabuleiro
![Página de cadastro](images/ranking.png)
