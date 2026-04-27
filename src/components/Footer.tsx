import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-primary-foreground/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">T</span>
              </div>
              <div>
                <span className="text-primary-foreground font-display font-bold text-lg block leading-none">TOP Móveis</span>
                <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">Marcenaria</span>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Há mais de 30 anos transformando sonhos em móveis sob medida com qualidade e tradição.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Navegação</h4>
            <nav className="space-y-2">
              {["Início", "Serviços", "Portfólio", "Sobre", "Contato"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Serviços</h4>
            <nav className="space-y-2">
              {["Cozinhas Planejadas", "Dormitórios", "Salas de Estar", "Banheiros", "Escritórios"].map((s) => (
                <span key={s} className="block text-sm text-primary-foreground/50">{s}</span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-primary-foreground/50">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                Rua da Marcenaria, 1000, São Paulo - SP
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                (11) 99999-9999
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                contato@topmoveis.com.br
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} TOP Móveis Marcenaria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
