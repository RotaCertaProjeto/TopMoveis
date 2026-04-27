import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Contato</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Vamos conversar sobre seu projeto?
          </h2>
          <p className="text-muted-foreground text-lg">
            Entre em contato conosco e solicite um orçamento sem compromisso.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: "Endereço", value: "Rua da Marcenaria, 1000\nSão Paulo - SP" },
              { icon: Phone, label: "Telefone", value: "(11) 99999-9999\n(11) 3333-3333" },
              { icon: Mail, label: "E-mail", value: "contato@topmoveis.com.br" },
              { icon: Clock, label: "Horário", value: "Seg a Sex: 8h às 18h\nSáb: 8h às 12h" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full mt-4" size="lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chamar no WhatsApp
            </Button>
          </div>

          {/* Form */}
          <Card className="lg:col-span-3 border-border/50">
            <CardContent className="p-8">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nome completo</label>
                    <Input placeholder="Seu nome" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
                    <Input placeholder="(11) 99999-9999" className="rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tipo de projeto</label>
                  <Input placeholder="Ex: Cozinha planejada, dormitório..." className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mensagem</label>
                  <Textarea placeholder="Conte-nos sobre seu projeto..." className="rounded-xl min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
