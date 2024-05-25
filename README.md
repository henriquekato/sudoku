# Sudoku

Site para jogar sudokus.

## Tecnologias e bibliotecas
- Nodejs
- Express
- JWT
- Sequelize
- MySQL

# API

Disponibiliza e verifica sudokus.

## Rotas da api

### Cadastro e Login
- `/cadastro`
- `/login`

### Jogos e Tabuleiros
- `/jogo/novo`
    - Tabuleiro aleatório para ser jogado
- `/jogo/novo/idTabuleiro`
    - Tabuleiro selecionado para ser jogado
- `/jogo/validacao`
    - Valida um jogo
- `/jogo/ranking/idTabuleiro`
    - Ranking de um tabuleiro, por tempo
- `/jogo/meus`
    - Jogos completos do jogador
- `/tabuleiro/todos`
    - Tabuleiros disponíveis

### Apenas administrador
> Tabuleiros precisam ser incompletos para que possam ser jogados
- `/tabuleiro/novo`
    - Criar um tabuleiro
- `/tabuleiro/editar`
    - Editar um tabuleiro
- `/tabuleiro/excluir/idTabuleiro`
    - Excluir um tabuleiro