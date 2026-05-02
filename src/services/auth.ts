type User = {
  nome: string;
  email: string;
  senha: string;
};

export const loginUser = (email: string, senha: string) => {
  const user: User = JSON.parse(localStorage.getItem("usuario") || "null");

  if (user && email === user.email && senha === user.senha) {
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioLogado", user.nome);
    return user;
  }

  return null;
};

export const registerUser = (user: User) => {
  localStorage.setItem("usuario", JSON.stringify(user));
};

export const getUsuarioLogado = () => {
  return localStorage.getItem("usuarioLogado");
};

export const logout = () => {
  localStorage.removeItem("logado");
  localStorage.removeItem("usuarioLogado");
};