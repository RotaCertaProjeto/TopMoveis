import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["Todos", "Cozinhas", "Dormitórios", "Salas", "Banheiros", "Escritórios"];

const projects = [
  { id: 1, title: "Cozinha Moderna Integrada", category: "Cozinhas", color: "from-primary/40 to-accent/30" },
  { id: 2, title: "Suíte Master Contemporânea", category: "Dormitórios", color: "from-accent/40 to-primary/20" },
  { id: 3, title: "Sala de Estar Minimalista", category: "Salas", color: "from-primary/30 to-accent/40" },
  { id: 4, title: "Banheiro Spa Luxuoso", category: "Banheiros", color: "from-accent/30 to-primary/30" },
  { id: 5, title: "Home Office Funcional", category: "Escritórios", color: "from-primary/40 to-accent/20" },
  { id: 6, title: "Cozinha Gourmet Premium", category: "Cozinhas", color: "from-accent/40 to-primary/40" },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Portfólio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Projetos que inspiram
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça alguns dos milhares de projetos que realizamos ao longo de nossa trajetória.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className={`rounded-full ${activeCategory === cat ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-accent font-medium tracking-wider uppercase">{project.category}</span>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mt-1">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
