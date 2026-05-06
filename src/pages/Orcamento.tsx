import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const basePricePerSquareMeter: Record<string, number> = {
  "guarda-roupa": 1200,
  cozinha: 1500,
  painel: 950,
  outro: 1100,
};

const materialMultiplier: Record<string, number> = {
  "MDF comum": 1,
  "MDF premium": 1.25,
  "madeira maciça": 1.6,
};

const calculateEstimate = (type: string, material: string, width: number, height: number) => {
  const base = basePricePerSquareMeter[type] ?? 1100;
  const multiplier = materialMultiplier[material] ?? 1;
  const area = Number((width * height).toFixed(2));
  const sizeAdjustment = area > 12 ? 1.35 : area > 8 ? 1.2 : 1;
  const estimate = base * area * multiplier * sizeAdjustment;

  return {
    estimate: Number(estimate.toFixed(2)),
    area,
    sizeAdjustment,
  };
};

const Orcamento = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoMovel, setTipoMovel] = useState("");
  const [material, setMaterial] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [areaCalculada, setAreaCalculada] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState<string>("");

  const formattedEstimate = resultado
    ? new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(resultado)
    : "";

  const salvarOrcamento = (novoOrcamento: any) => {
    const lista = JSON.parse(localStorage.getItem("orcamentos") || "[]");

    const jaExiste = lista.some((item: any) =>
      item.nome === novoOrcamento.nome &&
      item.tipoMovel === novoOrcamento.tipoMovel &&
      item.material === novoOrcamento.material &&
      item.largura === novoOrcamento.largura &&
      item.altura === novoOrcamento.altura &&
      item.valor === novoOrcamento.valor
    );

    if (jaExiste) {
      return; // não salva duplicado
    }

    lista.push(novoOrcamento);
    localStorage.setItem("orcamentos", JSON.stringify(lista));
  };

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const widthValue = Number(largura.replace(",", "."));
    const heightValue = Number(altura.replace(",", "."));

    if (!nome || !telefone || !tipoMovel || !material || widthValue <= 0 || heightValue <= 0) {
      setMensagem("Preencha todos os campos obrigatórios antes de calcular.");
      setResultado(null);
      setAreaCalculada(null);
      return;
    }

    const { estimate, area } = calculateEstimate(tipoMovel, material, widthValue, heightValue);

    setResultado(estimate);
    setAreaCalculada(area);
    setMensagem("");

    // 🔥 SALVAR ORÇAMENTO
    salvarOrcamento({
      id: Date.now(),
      nome,
      telefone,
      tipoMovel,
      material,
      largura,
      altura,
      valor: estimate,
      data: new Date().toLocaleDateString("pt-BR"),
      status: "em_analise"
    });
  };

  const handleSendWhatsApp = () => {
    if (!resultado) {
      setMensagem("Calcule o orçamento antes de enviar via WhatsApp.");
      return;
    }

    const message = `Olá! Gostaria de solicitar um orçamento.%0A%0ANome: ${encodeURIComponent(
      nome,
    )}%0ATipo de móvel: ${encodeURIComponent(tipoMovel)}%0AMaterial: ${encodeURIComponent(
      material,
    )}%0ALargura: ${encodeURIComponent(largura)} m%0AAltura: ${encodeURIComponent(altura)} m%0AValor estimado: ${encodeURIComponent(
      formattedEstimate,
    )}%0A${data ? `Data desejada: ${encodeURIComponent(data)}%0A` : ""}${horario ? `Horário desejado: ${encodeURIComponent(horario)}%0A` : ""}%0AEste valor é uma estimativa e pode variar após análise profissional.`;

    const whatsappUrl = `https://wa.me/5512991980766?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24">
        <section className="container mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-orange-400/20 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
                Simulação de orçamento
              </span>
              <h1 className="text-4xl font-display font-bold leading-tight sm:text-5xl">
                Solicite seu orçamento
              </h1>
              <p className="max-w-2xl text-base leading-8 text-foreground/70">
                Simule o valor do seu móvel planejado em poucos passos. Preencha as informações do projeto e veja uma estimativa instantânea para guarda-roupa, cozinha, painel ou outros móveis sob medida.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-primary-foreground/10 bg-card p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground/75">Design alinhado à marca</p>
                  <p className="mt-3 text-sm text-foreground/70">
                    Componentes e estilos consistentes com botões, inputs e tipografia do projeto.
                  </p>
                </div>
                <div className="rounded-3xl border border-primary-foreground/10 bg-card p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground/75">Simulação no frontend</p>
                  <p className="mt-3 text-sm text-foreground/70">
                    O cálculo é feito na hora com base em tipo de móvel, material e medidas, mantendo a experiência rápida para o usuário.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-primary-foreground/10 bg-card p-8 shadow-lg">
              <div className="mb-8 space-y-2">
                <h2 className="text-2xl font-semibold">Formulário de orçamento</h2>
                <p className="text-sm text-foreground/70">
                  Preencha os dados abaixo para calcular uma estimativa de valor do seu móvel planejado.
                </p>
              </div>

              <form onSubmit={handleCalculate} className="grid gap-5">
                <div className="grid gap-3">
                  <label className="text-sm font-medium text-foreground">Nome</label>
                  <Input
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <label className="text-sm font-medium text-foreground">Telefone</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(event) => setTelefone(event.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <label className="text-sm font-medium text-foreground">Tipo de móvel</label>
                  <Select value={tipoMovel} onValueChange={setTipoMovel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guarda-roupa">Guarda-roupa</SelectItem>
                      <SelectItem value="cozinha">Cozinha</SelectItem>
                      <SelectItem value="painel">Painel</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <label className="text-sm font-medium text-foreground">Material</label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MDF comum">MDF comum</SelectItem>
                      <SelectItem value="MDF premium">MDF premium</SelectItem>
                      <SelectItem value="madeira maciça">Madeira maciça</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <label className="text-sm font-medium text-foreground">Largura (m)</label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      placeholder="Ex: 2.40"
                      value={largura}
                      onChange={(event) => setLargura(event.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm font-medium text-foreground">Altura (m)</label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      placeholder="Ex: 2.20"
                      value={altura}
                      onChange={(event) => setAltura(event.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <label className="text-sm font-medium text-foreground">Data</label>
                    <Input type="date" value={data} onChange={(event) => setData(event.target.value)} />
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm font-medium text-foreground">Horário</label>
                    <Input type="time" value={horario} onChange={(event) => setHorario(event.target.value)} />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="w-full sm:w-auto">
                    Calcular orçamento
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={handleSendWhatsApp}
                  >
                    Enviar orçamento via WhatsApp
                  </Button>
                </div>

                {mensagem ? (
                  <p className="rounded-2xl border border-destructive/10 bg-destructive/5 px-4 py-3 text-sm text-destructive-foreground">
                    {mensagem}
                  </p>
                ) : null}

                {resultado !== null ? (
                  <div className="rounded-[1.75rem] border border-primary-foreground/10 bg-primary/5 p-6 text-foreground">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/70">
                      Valor estimado
                    </p>
                    <p className="mt-3 text-4xl font-semibold leading-tight">{formattedEstimate}</p>
                    <p className="mt-4 text-sm leading-6 text-foreground/70">
                      Este valor é uma estimativa e pode variar após análise profissional.
                    </p>
                    {areaCalculada !== null ? (
                      <p className="mt-4 text-sm text-foreground/70">
                        Área estimada: {areaCalculada.toFixed(2)} m²
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Orcamento;
