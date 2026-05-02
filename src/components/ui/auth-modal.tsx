import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginUser, registerUser } from "@/services/auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaConfirm: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
  if (isLogin) {
    const user = loginUser(form.email, form.senha);

    if (user) {
      alert("Login realizado com sucesso!");
      onClose();
    } else {
      alert("Dados inválidos");
    }
  } else {
    if (form.senha !== form.senhaConfirm) {
      alert("As senhas não coincidem");
      return;
    }

    registerUser({
      nome: form.nome,
      email: form.email,
      senha: form.senha,
    });

    alert("Cadastro realizado!");
    setForm({
      nome: "",
      email: "",
      senha: "",
      senhaConfirm: "",
    });
    setIsLogin(true);
  }
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl w-full max-w-lg p-8 relative border border-border animate-scale-in shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition"
        >
          <X />
        </button>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold font-display">T</span>
          </div>
          <div className="text-left">
            <p className="text-foreground font-display font-bold leading-none">
              TOP Móveis
            </p>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Marcenaria
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6 text-center font-display">
          {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
        </h2>

        <div
          key={isLogin ? "login" : "register"}
          className="flex flex-col gap-5 animate-fade-slide"
        >
          {!isLogin && (
            <input
              name="nome"
              placeholder="Seu nome"
              onChange={handleChange}
              value={form.nome}
              className="p-3.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
            />
          )}

          <input
            name="email"
            placeholder="Seu email"
            onChange={handleChange}
            value={form.email}
            className="p-3.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />

          <input
            name="senha"
            type="password"
            placeholder="Crie uma senha"
            onChange={handleChange}
            value={form.senha}
            className="p-3.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />

          {!isLogin && (
            <input
              name="senhaConfirm"
              type="password"
              placeholder="Confirmar senha"
              onChange={handleChange}
              value={form.senhaConfirm}
              className="p-3.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
            />
          )}

          <Button
            onClick={handleSubmit}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full py-3 text-base font-medium"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-accent transition"
          >
            {isLogin
              ? "Não tem conta? Cadastre-se"
              : "Já tem conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;