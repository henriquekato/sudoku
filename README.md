# Sudoku

Site para jogar sudokus.

## Tecnologias

- React
- Styled components
- Nodejs
- Express
- JWT
- Sequelize
- PostgreSQL

## Cloning

```
git clone https://github.com/henriquekato/sudoku.git
```

## Com docker

```
docker network create sudoku
```

Na pasta `api`
```
docker build -f .\Dockerfile.database -t imgbanco .
docker run -d --name banco --network sudoku -p 5432:5432 imgbanco

docker build -f .\Dockerfile.backend -t imgbackend .
docker run -d --name backend --network sudoku -p 8000:8000 imgbackend
```

Na pasta `frontend`

```
docker build -t imgfrontend .
docker run -d --name frontend --network sudoku -p 3000:3000 imgfrontend
```
- O projeto estará na porta 3000

## API

Para utilizar a api, siga os passos em [api](api)

## Frontend

Para utilizar o frontend, siga os passos em [frontend](frontend), além de rodar a API em conjunto
