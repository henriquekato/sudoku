module.exports = {
  success: {
    userCreated: "Cadastro feito com sucesso",
    login: "Login feito com sucessos",
    list: "Listagem feita com sucesso",
    boardCreated: "Tabuleiro criado com sucesso",
    boardEdited: "Tabuleiro editado com sucesso",
    gameCompleted: "Sudoku completado corretamente",
  },
  errors: {
    server: "Erro interno do servidor",
    login: "Usuário ou senha incorretos",
    emailNotFound: "Email não informado",
    passwordNotFound: "Senha não informada",
    validation: {
      emptyName: "O campo 'nome' não pode estar vazio.",
      invalidEmail: "O endereço de e-mail não é válido.",
      emailAlreadyInUse: "Email já cadastrado, informe outro",
      passwordLength: "A senha deve conter pelo menos 4 caracteres",
    },
    invalidId: "Id inválido",
    headerNotFound: "Cabeçalho não informado",
    tokenNotFound: "Token não informado",
    invalidToken: "Token inválido",
    endpointNotFound: "Endpoint não encontrado",
    boardDoesNotExist: "Esse tabuleiro não existe",
    gameDoesNotExist: "Esse jogo não existe",
    unauthorizedAccess: "Acesso não autorizado",
    incorrectSudokuSolution: "Sudoku completado incorretamente",
    invalidSudokuBoard: "Tabuleiro de sudoku inválido: precisa ser 9x9",
    invalidSudokuGame: "Esse jogo não poderá ser completado: há números duplicados que quebram as regras"
  },
};
