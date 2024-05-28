module.exports = {
  success: {
    userCreated: "Cadastro feito com sucesso",
    login: "Login feito com sucessos",
    getBoard: "Listagem feita com sucesso",
    createBoard: "Tabuleiro criado com sucesso",
    editBoard: "Tabuleiro editado com sucesso",
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
    headerNotFound: "Cabeçalho não informado",
    tokenNotFound: "Token não informado",
    invalidToken: "Token inválido",
    endpointNotFound: "Endpoint não encontrado",
    boardDoesNotExist: "Tabuleiro com esse id não existe",
  },
};
