import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/ui/auth-modal";
import { Menu, X, Phone, User } from "lucide-react";
import { getUsuarioLogado } from "@/services/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ];

  const atualizarUsuario = () => {
    const nome = getUsuarioLogado();
    setUsuario(nome);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("logado");
    setUsuario(null);
    setOpenUserMenu(false);
  };

  useEffect(() => {
    atualizarUsuario();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-b border-primary-foreground/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            <Link to="/#inicio" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">T</span>
              </div>
              <div>
                <span className="text-primary-foreground font-display font-bold text-lg block leading-none">
                  TOP Móveis
                </span>
                <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">
                  Marcenaria
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                (11) 99999-9999
              </a>

              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
                onClick={() => navigate("/orcamento")}
              >
                Orçamento Grátis
              </Button>

              {usuario ? (
                <div ref={menuRef} className="relative">
                  <button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex items-center gap-2 text-sm text-primary-foreground font-medium hover:text-accent transition"
                  >
                    <User className="h-4 w-4" />
                    Olá, {usuario}
                  </button>

                  {openUserMenu && (
                    <div className="absolute right-0 mt-3 w-44 bg-card border border-border rounded-xl shadow-xl p-2 flex flex-col animate-fade-in">
                      <button
                        onClick={() => {
                          setOpenUserMenu(false);
                          navigate("/conta");
                        }}
                        className="text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition"
                      >
                        Minha conta
                      </button>

                      <button
                        onClick={handleLogout}
                        className="text-left px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-muted transition"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center gap-2 border-orange-300/50 bg-orange-400/20 text-primary-foreground hover:bg-orange-400/30 rounded-full px-6"
                >
                  <User className="h-4 w-4" />
                  Login/Registro
                </Button>
              )}
            </div>

            <button
              className="lg:hidden text-primary-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-primary-foreground/10 pt-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={`/${link.href}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {usuario ? (
                  <>
                    <span className="text-sm text-primary-foreground font-medium">
                      Olá, {usuario}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500 text-sm"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="inline-flex items-center gap-2 border-orange-300/50 bg-orange-400/20 text-primary-foreground hover:bg-orange-400/30 rounded-full px-6"
                  >
                    Login/Registro
                  </Button>
                )}

                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full mt-2 w-full"
                  onClick={() => {
                    navigate("/orcamento");
                    setIsMenuOpen(false);
                  }}
                >
                  Orçamento Grátis
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        open={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          atualizarUsuario();
        }}
      />
    </>
  );
};

export default Header;