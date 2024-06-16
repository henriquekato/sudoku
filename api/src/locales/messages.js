module.exports = {
  success: {
    userCreated: "Cadastro feito com sucesso.",
    login: "Login feito com sucesso.",
    list: "Listagem feita com sucesso.",
    boardCreated: "Tabuleiro criado com sucesso.",
    boardEdited: "Tabuleiro editado com sucesso.",
    gameCompleted: "Sudoku completado corretamente.",
  },
  errors: {
    server: "Erro interno do servidor.",
    login: "Usuário ou senha incorretos.",
    emailNotFound: "Email não informado.",
    passwordNotFound: "Senha não informada.",
    validation: {
      emptyName: "O campo 'nome' não pode estar vazio.",
      invalidEmail: "O endereço de e-mail não é válido.",
      emailAlreadyInUse: "Email já cadastrado, informe outro.",
      passwordLength: "A senha deve conter pelo menos 4 caracteres.",
    },
    invalidId: "Id inválido.",
    headerNotFound: "Cabeçalho não informado.",
    tokenNotFound: "Token não informado.",
    invalidToken: "Token inválido.",
    endpointNotFound: "Endpoint não encontrado.",
    boardDoesNotExist: "Esse tabuleiro não existe.",
    gameDoesNotExist: "Esse jogo não existe.",
    unauthorizedAccess: "Acesso não autorizado.",
    incorrectSudokuSolution: "Sudoku completado incorretamente.",
    invalidSudokuBoard:
      "Tabuleiro de sudoku inválido: forneça um tabuleiro 9x9.",
    invalidSudokuGame:
      "Esse jogo não poderá ser completado: há números que quebram as regras.",
    boardHasBeenChanged:
      "Os números previamente estabelecidos no tabuleiro são fixos e não devem ser modificados.",
    invalidTime: "Tempo inválido.",
    nullCompletionTime: "Informe o tempo de conclusão.",
    completionTimeIsGreaterThanOneHour:
      "O tempo de conclusão deve ser menor ou igual a 1 hora.",
  },
};
