import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Helena S.",
    role: "Cozinha Planejada",
    text: "Simplesmente perfeito! A equipe da TOP Móveis entendeu exatamente o que eu queria. Minha cozinha ficou muito além das expectativas. Recomendo de olhos fechados!",
    rating: 5,
  },
  {
    name: "Carlos Eduardo M.",
    role: "Home Office Completo",
    text: "Profissionalismo do início ao fim. O projeto 3D me deu total segurança antes de aprovar. O resultado final ficou impecável e funcional. Excelente!",
    rating: 5,
  },
  {
    name: "Ana Paula R.",
    role: "Apartamento Completo",
    text: "Fizemos todos os móveis do apartamento com a TOP Móveis e não nos arrependemos. Qualidade excepcional, pontualidade na entrega e um atendimento extraordinário.",
    rating: 5,
  },
  {
    name: "Rodrigo L.",
    role: "Closet Sob Medida",
    text: "O acabamento ficou incrível e o atendimento foi super atencioso. Agora meu quarto tem muito mais organização e estilo.",
    rating: 5,
  },
  {
    name: "Beatriz C.",
    role: "Lavanderia Planejada",
    text: "A proposta veio rápido e a instalação foi feita com muito cuidado. O espaço ficou funcional e elegante, do jeito que eu precisava.",
    rating: 5,
  },
  {
    name: "Felipe S.",
    role: "Estante de Sala",
    text: "Projeto fiel à planta e com acabamento excelente. Minha sala ficou mais moderna e a família amou o resultado.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [carouselApi]);

  return (
    <section id="depoimentos" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Depoimentos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            A satisfação dos nossos clientes é nosso maior troféu.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{ loop: true, align: "start", containScroll: "trimSnaps", slidesToScroll: 1 }}
            setApi={setCarouselApi}
            className="overflow-hidden"
          >
            <CarouselContent className="flex gap-4">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="min-w-[100%] md:min-w-[33.333%] md:basis-[33.333%]">
                  <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-accent/30 mb-4" />
                      <p className="text-foreground leading-relaxed mb-6">"{t.text}"</p>
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                className="h-2.5 w-2.5 rounded-full bg-muted transition hover:bg-accent/80"
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
