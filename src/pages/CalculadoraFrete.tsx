import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Truck,
    Calculator as CalculatorIcon,
    Zap,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    Info,
    DollarSign,
    Gauge,
    MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TruckData {
    marca: string;
    modelo: string;
    ano: string;
    tipo: string;
    capacidade: string;
    financiamento: number;
    seguro: number;
    ipva: number;
    licenciamento: number;
    rastreador: number;
    contador: number;
    internet: number;
    associacao: number;
    salarioMotorista: number;
    consumoMedio: number;
    precoDiesel: number;
    manutencaoKm: number;
    vidaUtilPneu: number;
    custoPneu: number;
    mediaKmRodado: number;
}

const CalculadoraFrete = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userCpf = localStorage.getItem('user_cpf');
        if (!userCpf) {
            toast.error("Acesso Restrito", {
                description: "Por favor, faça login para acessar a calculadora de frete.",
            });
            navigate('/login');
        }
    }, [navigate]);

    const [truckData, setTruckData] = useState<TruckData>(() => {
        const saved = localStorage.getItem("afb_truck_data");
        if (saved) return JSON.parse(saved);
        return {
            marca: "", modelo: "", ano: "", tipo: "Truck", capacidade: "",
            financiamento: 0, seguro: 0, ipva: 0, licenciamento: 0, rastreador: 0,
            contador: 0, internet: 0, associacao: 0, salarioMotorista: 0,
            consumoMedio: 2.5, precoDiesel: 6.00, manutencaoKm: 0.50,
            vidaUtilPneu: 80000, custoPneu: 2500, mediaKmRodado: 10000
        };
    });

    useEffect(() => {
        localStorage.setItem("afb_truck_data", JSON.stringify(truckData));
    }, [truckData]);

    // Módulo 1 Calculations
    const totalCustoFixoMensal =
        Number(truckData.financiamento) + Number(truckData.seguro) +
        (Number(truckData.ipva) / 12) + (Number(truckData.licenciamento) / 12) +
        Number(truckData.rastreador) + Number(truckData.contador) +
        Number(truckData.internet) + Number(truckData.associacao) +
        Number(truckData.salarioMotorista);

    const custoFixoPorKm = totalCustoFixoMensal / (Number(truckData.mediaKmRodado) || 1);
    const custoCombustivelKm = Number(truckData.precoDiesel) / (Number(truckData.consumoMedio) || 1);
    const custoPneuKm = Number(truckData.custoPneu) / (Number(truckData.vidaUtilPneu) || 1);
    const custoVariavelKm = custoCombustivelKm + Number(truckData.manutencaoKm) + custoPneuKm;
    const custoTotalKm = custoFixoPorKm + custoVariavelKm;

    // Simulation State (Modulo 2)
    const [simData, setSimData] = useState({
        origem: "", destino: "", kmTotal: 0, valorFrete: 0, pedagio: 0,
        dias: 1, retornoVazio: false, comissao: 0
    });

    const receitaTotal = Number(simData.valorFrete);
    const custoViagem = (custoTotalKm * Number(simData.kmTotal)) + Number(simData.pedagio);
    const comissaoValor = (Number(simData.comissao) / 100) * receitaTotal;
    const lucroBruto = receitaTotal - custoViagem - comissaoValor;
    const lucroLiquido = lucroBruto; // Simplified for this context
    const margem = (lucroLiquido / (receitaTotal || 1)) * 100;
    const lucroPorKm = lucroLiquido / (Number(simData.kmTotal) || 1);

    const getProfitColor = (m: number) => {
        if (m < 5) return "text-red-500";
        if (m < 15) return "text-yellow-500";
        return "text-green-500";
    };

    const getProfitStatus = (m: number) => {
        if (m < 5) return "🔴 Frete Ruim";
        if (m < 15) return "🟡 No Limite";
        return "🟢 Bom Frete";
    };

    // Currency Formatting Helpers
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const parseCurrency = (value: string) => {
        const cleanValue = value.replace(/\D/g, "");
        return Number(cleanValue) / 100;
    };

    const handleCurrencyChange = (field: keyof TruckData | string, value: string, isTruckData = true) => {
        const numericValue = parseCurrency(value);
        if (isTruckData) {
            setTruckData({ ...truckData, [field as keyof TruckData]: numericValue });
        } else {
            setSimData({ ...simData, [field as string]: numericValue });
        }
    };

    // Quick Calc State (Modulo 3)
    const [quickKm, setQuickKm] = useState(0);
    const [quickValue, setQuickValue] = useState(0);
    const quickLucro = quickValue - (custoTotalKm * quickKm);
    const quickMargem = (quickLucro / (quickValue || 1)) * 100;

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20 pt-24 pb-12">
                <div className="container-custom">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/ferramentas")}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Calculadora de Frete</h1>
                            <p className="text-muted-foreground">Gestão técnica e financeira para sua operação</p>
                        </div>
                    </div>

                    <Tabs defaultValue="modulo1" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-white border shadow-sm">
                            <TabsTrigger value="modulo1" className="py-3 items-center gap-2">
                                <Truck className="h-4 w-4" /> 1. Meu Caminhão
                            </TabsTrigger>
                            <TabsTrigger value="modulo2" className="py-3 items-center gap-2">
                                <CalculatorIcon className="h-4 w-4" /> 2. Simular Frete
                            </TabsTrigger>
                            <TabsTrigger value="modulo3" className="py-3 items-center gap-2">
                                <Zap className="h-4 w-4" /> 3. Calculadora Rápida
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="modulo1">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Dados do Veículo</CardTitle>
                                            <CardDescription>Informações básicas para referência</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Marca / Modelo</Label>
                                                <Input value={truckData.marca} onChange={e => setTruckData({ ...truckData, marca: e.target.value })} placeholder="Ex: Volvo FH 540" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tipo</Label>
                                                <select className="w-full p-2 rounded-md border" value={truckData.tipo} onChange={e => setTruckData({ ...truckData, tipo: e.target.value })}>
                                                    <option>Toco</option>
                                                    <option>Truck</option>
                                                    <option>Carreta</option>
                                                    <option>Bitrem</option>
                                                    <option>Rodotrem</option>
                                                </select>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Custos Fixos Mensais</CardTitle>
                                            <CardDescription>O que você paga todo mês, rodando ou não</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Financiamento</Label>
                                                <Input value={formatCurrency(truckData.financiamento)} onChange={e => handleCurrencyChange('financiamento', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Seguro</Label>
                                                <Input value={formatCurrency(truckData.seguro)} onChange={e => handleCurrencyChange('seguro', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Salário (ou Pró-labore)</Label>
                                                <Input value={formatCurrency(truckData.salarioMotorista)} onChange={e => handleCurrencyChange('salarioMotorista', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>IPVA (Anual)</Label>
                                                <Input value={formatCurrency(truckData.ipva)} onChange={e => handleCurrencyChange('ipva', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Associação / Outros</Label>
                                                <Input value={formatCurrency(truckData.associacao)} onChange={e => handleCurrencyChange('associacao', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Média KM Rodado/Mês</Label>
                                                <Input type="number" value={truckData.mediaKmRodado} onChange={e => setTruckData({ ...truckData, mediaKmRodado: Number(e.target.value) })} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Custos Variáveis</CardTitle>
                                            <CardDescription>Gastos proporcionais à distância percorrida</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Consumo Médio (km/l)</Label>
                                                <Input type="number" step="0.1" value={truckData.consumoMedio} onChange={e => setTruckData({ ...truckData, consumoMedio: Number(e.target.value) })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Preço do Diesel</Label>
                                                <Input value={formatCurrency(truckData.precoDiesel)} onChange={e => handleCurrencyChange('precoDiesel', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Manutenção (R$/km)</Label>
                                                <Input value={formatCurrency(truckData.manutencaoKm)} onChange={e => handleCurrencyChange('manutencaoKm', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Custo Pneu (Unidade)</Label>
                                                <Input value={formatCurrency(truckData.custoPneu)} onChange={e => handleCurrencyChange('custoPneu', e.target.value)} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="space-y-6">
                                    <Card className="bg-primary text-white sticky top-24">
                                        <CardHeader>
                                            <CardTitle className="text-white flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5" /> Resumo de Custos
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="border-b border-white/20 pb-4">
                                                <p className="text-white/70 text-sm">Custo Fixo Total / Mês</p>
                                                <p className="text-3xl font-bold">R$ {totalCustoFixoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <p className="text-white/70 text-sm italic">Custo por KM Rodado:</p>
                                                    <div className="space-y-2 mt-2">
                                                        <div className="flex justify-between">
                                                            <span>Fixo:</span>
                                                            <span className="font-semibold">R$ {custoFixoPorKm.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Variável:</span>
                                                            <span className="font-semibold">R$ {custoVariavelKm.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between pt-2 border-t border-white/20">
                                                            <span className="font-bold">TOTAL:</span>
                                                            <span className="text-xl font-bold">R$ {custoTotalKm.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white/10 p-4 rounded-lg">
                                                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Ponto de Equilíbrio</p>
                                                <p className="font-bold">Este caminhão começa a dar lucro após os primeiros {(totalCustoFixoMensal / (custoTotalKm - custoVariavelKm || 1)).toFixed(0)} km no mês.</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="modulo2">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Detalhes da Viagem</CardTitle>
                                        <CardDescription>Simule a rentabilidade da rota</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Origem</Label>
                                                <Input value={simData.origem} onChange={e => setSimData({ ...simData, origem: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Destino</Label>
                                                <Input value={simData.destino} onChange={e => setSimData({ ...simData, destino: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Distância Total (KM)</Label>
                                                <Input type="number" value={simData.kmTotal} onChange={e => setSimData({ ...simData, kmTotal: Number(e.target.value) })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Valor do Frete (R$)</Label>
                                                <Input value={formatCurrency(simData.valorFrete)} onChange={e => handleCurrencyChange('valorFrete', e.target.value, false)} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Pedágio (R$)</Label>
                                                <Input value={formatCurrency(simData.pedagio)} onChange={e => handleCurrencyChange('pedagio', e.target.value, false)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Comissão Agenciador (%)</Label>
                                                <Input type="number" value={simData.comissao} onChange={e => setSimData({ ...simData, comissao: Number(e.target.value) })} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="flex flex-col">
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle>Resultado da Análise</CardTitle>
                                            <span className={`px-4 py-1 rounded-full font-bold border ${getProfitColor(margem).replace("text", "bg").replace("500", "100")} ${getProfitColor(margem)}`}>
                                                {getProfitStatus(margem)}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-4 bg-muted rounded-lg">
                                                <p className="text-xs text-muted-foreground uppercase">Receita Bruta</p>
                                                <p className="text-xl font-bold">R$ {receitaTotal.toLocaleString()}</p>
                                            </div>
                                            <div className="p-4 bg-muted rounded-lg">
                                                <p className="text-xs text-muted-foreground uppercase">Custo Total</p>
                                                <p className="text-xl font-bold">R$ {custoViagem.toLocaleString()}</p>
                                            </div>
                                            <div className="p-4 bg-primary/10 rounded-lg col-span-2">
                                                <p className="text-xs text-primary uppercase">Lucro Líquido</p>
                                                <p className={`text-3xl font-bold ${getProfitColor(margem)}`}>
                                                    R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Margem de Lucro:</span>
                                                <span className={`font-bold ${getProfitColor(margem)}`}>{margem.toFixed(2)}%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Lucro por KM:</span>
                                                <span className="font-bold">R$ {lucroPorKm.toFixed(2)}</span>
                                            </div>
                                            <div className="pt-4 border-t">
                                                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Recomendação Técnica</p>
                                                {margem < 5 ? (
                                                    <div className="flex gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                                        <p>Este frete não cobre seus custos adequadamente ou a margem é muito baixa. Recomenda-se negociar um valor mínimo de R$ {(custoViagem * 1.2).toLocaleString()} para chegar a 20% de margem.</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2 text-green-600 bg-green-50 p-3 rounded-md text-sm">
                                                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                                                        <p>Este frete é viável e está dentro de parâmetros saudáveis de rentabilidade.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="modulo3">
                            <div className="max-w-2xl mx-auto space-y-8">
                                <Card className="border-2 border-primary/20">
                                    <CardHeader className="text-center">
                                        <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                                        <CardTitle className="text-2xl">Calculadora de Balcão</CardTitle>
                                        <CardDescription>Respostas rápidas enquanto você está no telefone</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Distância (KM)</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-lg h-12"
                                                    onChange={e => setQuickKm(Number(e.target.value))}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Valor Oferecido (R$)</Label>
                                                <Input
                                                    placeholder="R$ 0,00"
                                                    className="text-lg h-12"
                                                    value={formatCurrency(quickValue)}
                                                    onChange={e => setQuickValue(parseCurrency(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-primary text-white p-6 rounded-xl space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="text-center">
                                                <p className="text-white/70 text-sm uppercase font-semibold">Estimativa de Lucro</p>
                                                <p className="text-4xl font-bold">R$ {quickLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                                                <div className="text-center">
                                                    <p className="text-xs opacity-70">Margem</p>
                                                    <p className="font-bold text-lg">{quickMargem.toFixed(1)}%</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs opacity-70">Status</p>
                                                    <p className="font-bold text-lg">
                                                        {quickMargem > 15 ? "✅ FECHAR" : quickMargem > 5 ? "⚠️ ATENÇÃO" : "❌ RECUSAR"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-muted rounded-lg flex items-start gap-3">
                                            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                            <p className="text-sm text-muted-foreground">
                                                Esta calculadora utiliza seu custo base de <strong>R$ {custoTotalKm.toFixed(2)}/km</strong> definido no Módulo 1.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
};

export default CalculadoraFrete;

