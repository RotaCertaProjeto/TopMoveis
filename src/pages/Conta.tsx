import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Conta = () => {
    const [usuario, setUsuario] = useState<any>(null);
    const [orcamentos, setOrcamentos] = useState<any[]>([]);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState<any | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario") || "{}");
        setUsuario(user);

        const lista = JSON.parse(localStorage.getItem("orcamentos") || "[]");
        setOrcamentos(lista);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        window.location.reload();
    };

    const excluirOrcamento = (id: number) => {
        const lista = JSON.parse(localStorage.getItem("orcamentos") || "[]");
        const novaLista = lista.filter((item: any) => item.id !== id);

        localStorage.setItem("orcamentos", JSON.stringify(novaLista));
        setOrcamentos(novaLista);
    };


    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-24">
                <section className="container mx-auto px-6 py-16 space-y-10">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-flex rounded-full bg-orange-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
                                Área do cliente
                            </span>

                            <h1 className="text-3xl font-display font-bold">
                                <span className="text-accent">Minha</span> conta
                            </h1>

                            <p className="text-foreground/70">
                                Gerencie seus pedidos e acompanhe seus orçamentos
                            </p>
                        </div>

                        {usuario && (
                            <div className="flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4 shadow-sm">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                                    <span className="text-accent-foreground font-bold">
                                        {usuario.nome?.charAt(0)}
                                    </span>
                                </div>

                                <div className="text-sm">
                                    <p className="font-medium">{usuario.nome}</p>
                                    <p className="text-muted-foreground">{usuario.email}</p>
                                </div>

                                <Button onClick={handleLogout} variant="outline" className="ml-4 rounded-full">
                                    Sair
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <p className="text-sm text-muted-foreground">Orçamentos realizados</p>
                            <p className="text-3xl font-bold mt-2">{orcamentos.length}</p>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <p className="text-sm text-muted-foreground">Último orçamento</p>
                            <p className="text-lg font-medium mt-2">
                                {orcamentos.length > 0
                                    ? `R$ ${orcamentos[orcamentos.length - 1].valor}`
                                    : "Nenhum ainda"}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-border bg-card p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            <span className="text-accent">Histórico</span> de orçamentos
                        </h2>

                        {orcamentos.length === 0 ? (
                            <div className="text-center space-y-4">
                                <p className="text-muted-foreground">
                                    Você ainda não fez nenhum orçamento.
                                </p>
                                <Button onClick={() => navigate("/orcamento")} className="rounded-full">
                                    Fazer primeiro orçamento
                                </Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {orcamentos.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border border-border rounded-2xl p-5 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.tipoMovel} • {item.material}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.largura}m x {item.altura}m
                                                </p>
                                            </div>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${item.status === "em_analise"
                                                    ? "bg-yellow-400/20 text-yellow-600"
                                                    : "bg-green-400/20 text-green-600"
                                                    }`}
                                            >
                                                {item.status === "em_analise" ? "Em análise" : "Aprovado"}
                                            </span>
                                        </div>

                                        <p className="text-accent font-bold mt-3">
                                            R$ {item.valor}
                                        </p>

                                        <p className="text-xs text-muted-foreground mt-1">
                                            {item.data}
                                        </p>

                                        <div className="flex gap-2 mt-4">
                                            <Button size="sm" variant="outline" onClick={() => setOrcamentoSelecionado(item)}>
                                                Ver
                                            </Button>

                                           

                                            {item.status === "em_analise" && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="mt-2"
                                                    onClick={() => excluirOrcamento(item.id)}
                                                >
                                                    Excluir
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {orcamentoSelecionado && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setOrcamentoSelecionado(null)}>
                    <div className="bg-card p-6 rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">Detalhes do orçamento</h3>

                        <div className="space-y-2 text-sm">
                            <p><strong>Nome:</strong> {orcamentoSelecionado.nome}</p>
                            <p><strong>Telefone:</strong> {orcamentoSelecionado.telefone}</p>
                            <p><strong>Tipo:</strong> {orcamentoSelecionado.tipoMovel}</p>
                            <p><strong>Material:</strong> {orcamentoSelecionado.material}</p>
                            <p><strong>Medidas:</strong> {orcamentoSelecionado.largura}m x {orcamentoSelecionado.altura}m</p>
                            <p><strong>Valor:</strong> R$ {orcamentoSelecionado.valor}</p>
                            <p><strong>Data:</strong> {orcamentoSelecionado.data}</p>
                        </div>

                        <Button className="mt-6 w-full" onClick={() => setOrcamentoSelecionado(null)}>
                            Fechar
                        </Button>
                    </div>
                </div>
            )}


            <Footer />
        </div>
    );
};

export default Conta;