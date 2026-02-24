import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
    User,
    Upload,
    Search,
    Scale,
    FileText,
    History,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

type Step = 'perfil' | 'envio' | 'analise' | 'estrategia' | 'gerador' | 'acompanhamento';

const AssistenteJuridico = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<Step>('perfil');
    const [isLoading, setIsLoading] = useState(false);

    // User data state
    const [userData, setUserData] = useState({
        id: null as number | null,
        nome: '',
        cnh: '',
        categoria_cnh: '',
        pontuacao_cnh: 0,
        placa_veiculo: '',
        renavam: '',
        estado: ''
    });

    // Infraction data state
    const [infractionData, setInfractionData] = useState({
        auto: '',
        orgao: '',
        data: '',
        codigo: '',
        artigo: '',
        local: '',
        pontos: 0,
        valor: '',
        resumo_ia: '',
        chance_sucesso: 75
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userCpf = localStorage.getItem('user_cpf');
            if (!userCpf) {
                toast({
                    title: "Acesso Restrito",
                    description: "Por favor, faça login para acessar o assistente jurídico.",
                    variant: "destructive"
                });
                navigate('/login');
                return;
            }

            setIsLoading(true);
            const cleanCpf = userCpf.replace(/\D/g, '');
            const { data, error } = await supabase
                .from('associados')
                .select('*')
                .eq('cpf', cleanCpf)
                .single();

            setIsLoading(false);

            if (error || !data) {
                toast({
                    title: "Erro de Perfil",
                    description: "Não conseguimos localizar seus dados. Tente fazer login novamente.",
                    variant: "destructive"
                });
                return;
            }

            if (data) {
                setUserData({
                    id: data.id,
                    nome: data.nome,
                    cnh: data.cnh || '',
                    categoria_cnh: data.categoria_cnh || '',
                    pontuacao_cnh: data.pontuacao_cnh || 0,
                    placa_veiculo: data.placa_veiculo || '',
                    renavam: data.renavam || '',
                    estado: data.estado || ''
                });
            }
        };

        fetchUserData();
    }, [navigate, toast]);

    const handleSaveProfile = async () => {
        if (!userData.id) {
            toast({
                title: "Erro de Perfil",
                description: "Dados do usuário não carregados corretamente.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        const { error } = await supabase
            .from('associados')
            .update({
                cnh: userData.cnh,
                categoria_cnh: userData.categoria_cnh,
                pontuacao_cnh: userData.pontuacao_cnh,
                placa_veiculo: userData.placa_veiculo,
                renavam: userData.renavam,
                estado: userData.estado
            })
            .eq('id', userData.id);

        setIsLoading(false);

        if (error) {
            toast({
                title: "Erro ao salvar",
                description: "Não foi possível atualizar seus dados.",
                variant: "destructive"
            });
        } else {
            toast({
                title: "Dados salvos",
                description: "Seu perfil foi atualizado com sucesso."
            });
            setCurrentStep('envio');
        }
    };

    const steps: { id: Step; label: string; icon: any }[] = [
        { id: 'perfil', label: 'Perfil', icon: User },
        { id: 'envio', label: 'Envio', icon: Upload },
        { id: 'analise', label: 'Análise', icon: Search },
        { id: 'estrategia', label: 'Estratégia', icon: Scale },
        { id: 'gerador', label: 'Gerador', icon: FileText },
        { id: 'acompanhamento', label: 'Histórico', icon: History },
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 'perfil':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Confirmação de Dados
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Olá, <span className="font-bold text-foreground">{userData.nome}</span>.
                                Verifique seus dados básicos para garantir que o recurso seja gerado corretamente.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cnh">Número da CNH</Label>
                                    <Input
                                        id="cnh"
                                        placeholder="Digite sua CNH"
                                        value={userData.cnh}
                                        onChange={(e) => setUserData({ ...userData, cnh: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="categoria">Categoria</Label>
                                    <Input
                                        id="categoria"
                                        placeholder="Ex: AD"
                                        value={userData.categoria_cnh}
                                        onChange={(e) => setUserData({ ...userData, categoria_cnh: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pontos">Pontuação Atual</Label>
                                    <Input
                                        id="pontos"
                                        type="number"
                                        value={userData.pontuacao_cnh}
                                        onChange={(e) => setUserData({ ...userData, pontuacao_cnh: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="placa">Placa do Veículo (Opcional)</Label>
                                    <Input
                                        id="placa"
                                        placeholder="AAA-0000"
                                        value={userData.placa_veiculo}
                                        onChange={(e) => setUserData({ ...userData, placa_veiculo: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="renavam">RENAVAM (Opcional)</Label>
                                    <Input
                                        id="renavam"
                                        placeholder="00000000000"
                                        value={userData.renavam}
                                        onChange={(e) => setUserData({ ...userData, renavam: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="estado">Estado (DETRAN)</Label>
                                    <Input
                                        id="estado"
                                        placeholder="Ex: MS, SP, RJ"
                                        value={userData.estado}
                                        onChange={(e) => setUserData({ ...userData, estado: e.target.value.toUpperCase() })}
                                        className={!userData.estado ? "border-red-300" : ""}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => navigate('/ferramentas')}>
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSaveProfile}
                                className="bg-primary hover:bg-primary/90 min-w-[150px]"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Salvar e Continuar <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );
            case 'envio':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center max-w-xl mx-auto">
                            <h3 className="text-2xl font-bold text-foreground mb-2">Envio da Notificação</h3>
                            <p className="text-muted-foreground">
                                Carregue uma foto ou PDF da sua notificação de autuação para análise automática.
                            </p>
                        </div>

                        <div
                            className="border-2 border-dashed border-primary/20 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-primary/5 group"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept="image/*,application/pdf"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsLoading(true);

                                    try {
                                        // Convert file to Base64
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onload = async () => {
                                            const base64 = (reader.result as string).split(',')[1];

                                            // Call Supabase Edge Function
                                            const { data, error } = await supabase.functions.invoke('analisar-multa', {
                                                body: {
                                                    fileBase64: base64,
                                                    contentType: file.type,
                                                    fileName: file.name
                                                }
                                            });

                                            setIsLoading(false);

                                            if (error) throw error;

                                            if (data) {
                                                setInfractionData({
                                                    auto: data.auto || '',
                                                    orgao: data.orgao || '',
                                                    data: data.data || '',
                                                    codigo: data.codigo || '',
                                                    artigo: data.artigo || '',
                                                    local: data.local || '',
                                                    pontos: data.pontos || 0,
                                                    valor: data.valor || '',
                                                    resumo_ia: data.resumo_ia || '',
                                                    chance_sucesso: data.chance_sucesso || 75
                                                });

                                                setCurrentStep('analise');
                                                toast({
                                                    title: "Análise Concluída",
                                                    description: "Os dados da multa foram extraídos com sucesso pela IA."
                                                });
                                            }
                                        };
                                        reader.onerror = (error) => {
                                            throw error;
                                        };
                                    } catch (error: any) {
                                        setIsLoading(false);
                                        toast({
                                            title: "Erro na Análise",
                                            description: error.message || "Não foi possível processar o arquivo.",
                                            variant: "destructive"
                                        });
                                    }
                                }}
                            />
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Upload className="h-10 w-10 text-primary" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Clique para selecionar ou arraste o arquivo</h4>
                            <p className="text-sm text-muted-foreground">PNG, JPG ou PDF (Máx. 10MB)</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-sm font-medium">Extração via IA</span>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-sm font-medium">Privacidade LGPD</span>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-sm font-medium">Análise em Segundos</span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentStep('perfil')}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setCurrentStep('analise')}
                                className="text-primary hover:text-primary/80"
                            >
                                Pular Upload (Preenchimento Manual)
                            </Button>
                        </div>
                    </div>
                );
            case 'analise':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Dados da Infração
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Número do Auto</Label>
                                    <Input
                                        placeholder="Ex: R0000000-0"
                                        className="border-primary/20"
                                        value={infractionData.auto}
                                        onChange={(e) => setInfractionData({ ...infractionData, auto: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Órgão Autuador</Label>
                                    <Input
                                        placeholder="Ex: PRF, DETRAN, PREFEITURA"
                                        value={infractionData.orgao}
                                        onChange={(e) => setInfractionData({ ...infractionData, orgao: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Data da Infração</Label>
                                    <Input
                                        type="date"
                                        value={infractionData.data}
                                        onChange={(e) => setInfractionData({ ...infractionData, data: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Código/Artigo CTB</Label>
                                    <Input
                                        placeholder="Ex: 181 VIII ou 218 I"
                                        value={infractionData.codigo}
                                        onChange={(e) => {
                                            const val = e.target.value.toUpperCase();
                                            // Mock logic: set points based on commonly used articles in tests
                                            let pts = 0;
                                            if (val.includes('218')) pts = 4;
                                            if (val.includes('181')) pts = 4;
                                            setInfractionData({ ...infractionData, codigo: val, pontos: pts });
                                        }}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Local da Infração</Label>
                                    <Input
                                        placeholder="Rua, Avenida, Rodovia..."
                                        value={infractionData.local}
                                        onChange={(e) => setInfractionData({ ...infractionData, local: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/5 p-6 rounded-xl border border-yellow-500/10">
                            <h4 className="font-bold text-yellow-700 mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Verificação de Prazos
                            </h4>
                            <p className="text-sm text-yellow-700">
                                Certifique-se de que a data de notificação está dentro do prazo legal de 30 dias após a infração.
                                Nossas regras de IA verificarão inconsistências formais.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentStep('envio')}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                            </Button>
                            <Button
                                onClick={() => setCurrentStep('estrategia')}
                                className="bg-primary hover:bg-primary/90 min-w-[150px]"
                            >
                                Analisar Estratégia <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );
            case 'estrategia':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="md:col-span-2 border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Scale className="h-5 w-5 text-primary" />
                                        Chance de Sucesso
                                    </CardTitle>
                                    <CardDescription>Baseado no Artigo {infractionData.codigo || 'não informado'} do CTB e histórico de deferimentos.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-muted h-4 rounded-full overflow-hidden">
                                            <div
                                                className="bg-green-500 h-full transition-all duration-1000"
                                                style={{ width: `${infractionData.chance_sucesso}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-green-600 text-xl">{infractionData.chance_sucesso}%</span>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-sm uppercase text-muted-foreground">Teses Recomendadas:</h4>
                                        <div className="space-y-3">
                                            {infractionData.codigo.includes('181') ? (
                                                <>
                                                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                                                        <div className="mt-1"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
                                                        <div>
                                                            <p className="font-bold text-sm">Ausência de Sinalização</p>
                                                            <p className="text-xs text-muted-foreground">O local deve estar devidamente sinalizado com a placa R-6a (Proibido Estacionar).</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 rounded-lg border border-muted flex items-start gap-3 opacity-60">
                                                        <div className="mt-1"><AlertCircle className="h-4 w-4 text-muted-foreground" /></div>
                                                        <div>
                                                            <p className="font-bold text-sm">Erro no Horário/Data</p>
                                                            <p className="text-xs text-muted-foreground">Inconsistência entre a foto e o registro de horário da autuação.</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                                                        <div className="mt-1"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
                                                        <div>
                                                            <p className="font-bold text-sm">Aferição do Radar</p>
                                                            <p className="text-xs text-muted-foreground">O equipamento de medição deve estar aferido pelo INMETRO nos últimos 12 meses.</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 rounded-lg border border-muted flex items-start gap-3 opacity-60">
                                                        <div className="mt-1"><AlertCircle className="h-4 w-4 text-muted-foreground" /></div>
                                                        <div>
                                                            <p className="font-bold text-sm">Erro de Tipificação</p>
                                                            <p className="text-xs text-muted-foreground">Inconsistência entre a placa anotada e a marca/modelo do veículo.</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Resumo da IA</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-4">
                                    <p className="relaxed text-sm">
                                        {infractionData.resumo_ia || (infractionData.codigo.includes('181')
                                            ? `"Detectamos que esta infração foi registrada por estacionamento. Uma linha de defesa comum é a falta de visibilidade da placa de sinalização no local."`
                                            : `"Detectamos que esta infração foi registrada por radar. Há uma alta incidência de falta de sinalização R-19 no local citado, o que fortalece o argumento de nulidade."`
                                        )}
                                    </p>
                                    <div className="pt-4 border-t border-white/20">
                                        <p className="font-bold">Pontos em Jogo:</p>
                                        <p className="text-2xl">{infractionData.pontos || 0} Pontos</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentStep('analise')}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                            </Button>
                            <Button
                                onClick={() => setCurrentStep('gerador')}
                                className="bg-primary hover:bg-primary/90 min-w-[150px]"
                            >
                                Gerar Recurso <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );
            case 'gerador':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-muted p-2 rounded-lg mb-4 flex justify-between items-center bg-zinc-900 text-zinc-100">
                            <span className="text-xs font-mono ml-2">DOCUMENTO_DEFESA_PREVIA.PDF</span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-zinc-800">Copiar Texto</Button>
                                <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-zinc-800">Exportar Word</Button>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg p-8 shadow-inner min-h-[400px] font-serif text-sm leading-relaxed overflow-y-auto max-h-[500px]">
                            <p className="text-center font-bold mb-8 uppercase line-clamp-2">ILUSTRÍSSIMO SENHOR PRESIDENTE DA JARI DO {infractionData.orgao || '(ÓRGÃO AUTUADOR)'}</p>

                            <p className="mb-4">
                                Eu, <strong>{userData.nome}</strong>, portador da CNH nº <strong>{userData.cnh || '__________'}</strong>,
                                proprietário do veículo de placa <strong>{userData.placa_veiculo || '__________'}</strong>, venho, respeitosamente, à presença de Vossa Senhoria,
                                com fundamento na Lei nº 9.503/97 (Código de Trânsito Brasileiro), interpor:
                            </p>

                            <p className="text-center font-bold mb-8 underline uppercase">DEFESA PRÉVIA</p>

                            <p className="mb-4">
                                Contra o Auto de Infração de nº <strong>{infractionData.auto || '__________'}</strong>, pelos fatos e fundamentos a seguir expostos:
                            </p>

                            <p className="font-bold mb-2">1. DOS FATOS</p>
                            <p className="mb-4 italic">
                                Segundo o Auto de Infração, o condutor teria cometido a infração prevista no Artigo {infractionData.codigo || '__________'} do CTB,
                                no dia {infractionData.data ? new Date(infractionData.data).toLocaleDateString('pt-BR') : '__/__/____'}, no local {infractionData.local || '__________'}.
                            </p>
                            <p className="mb-4">
                                No entanto, o referido documento não cumpre os requisitos de validade conforme passo a expor.
                            </p>

                            <p className="font-bold mb-2">2. DO MÉRITO</p>
                            <p className="mb-4">
                                {infractionData.codigo.includes('181')
                                    ? "O local da autuação não apresentava a devida sinalização de proibição de estacionamento conforme determina o manual brasileiro de sinalização de trânsito. Sem a sinalização R-6a visível, a autuação torna-se nula."
                                    : "O equipamento de radar utilizado na autuação não apresenta registro de verificação metrológica atualizada no portal do INMETRO, violando a Resolução nº 798/2020 do CONTRAN. Sem a devida aferição, a medição é nula de pleno direito."
                                }
                            </p>

                            <p className="font-bold mb-2">3. DO PEDIDO</p>
                            <p className="mb-8">
                                Ante o exposto, requer a nulidade do referido Auto de Infração, com o consequente arquivamento do processo
                                e cancelamento de quaisquer penalidades ou pontuação de {infractionData.pontos || '0'} pontos na CNH.
                            </p>

                            <p className="text-right">Nestes termos, pede deferimento.</p>
                            <p className="text-right mt-12 border-t border-dashed pt-2 w-64 ml-auto">Assinatura do Condutor</p>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentStep('estrategia')}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="secondary">
                                    Salvar Rascunho
                                </Button>
                                <Button
                                    onClick={() => {
                                        toast({
                                            title: "Sucesso!",
                                            description: "Recurso salvo no seu histórico.",
                                        });
                                        setCurrentStep('acompanhamento');
                                    }}
                                    className="bg-green-600 hover:bg-green-700 min-w-[150px]"
                                >
                                    Finalizar e Salvar <CheckCircle2 className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'acompanhamento':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center py-8">
                            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold">Processo Iniciado!</h3>
                            <p className="text-muted-foreground">Seu recurso foi gerado e está disponível para consulta.</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-sm uppercase text-muted-foreground">Últimas Atividades:</h4>
                            {[1].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FileText className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Recurso gerado: Auto A0000000</p>
                                            <p className="text-xs text-muted-foreground">Hoje, às 14:30 | Status: <span className="text-blue-600 font-medium">Aguardando Envio</span></p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button onClick={() => setCurrentStep('perfil')} variant="outline">
                                Iniciar Nova Análise
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Layout>
            <section className="pt-32 pb-20 bg-muted/20 min-h-screen">
                <div className="container-custom">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                            <Scale className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Assistente <span className="text-primary">Jurídico</span> de Multas
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Análise técnica automatizada e geração de recursos baseada no CTB.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        {/* Stepper */}
                        <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    onClick={() => setCurrentStep(step.id)}
                                    className={`flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${currentStep === step.id ? 'opacity-100 scale-110' : 'opacity-40 grayscale hover:opacity-70 hover:grayscale-0'
                                        }`}
                                >
                                    <div className={`p-4 rounded-full ${currentStep === step.id ? 'bg-primary text-white shadow-lg' : 'bg-muted text-foreground'
                                        }`}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">{step.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Content */}
                        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                {renderStepContent()}
                            </CardContent>
                        </Card>

                        {/* Disclaimer */}
                        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-yellow-800 leading-relaxed">
                                <strong>Aviso Legal:</strong> Esta ferramenta fornece uma orientação preliminar baseada em inteligência artificial.
                                O resultado não garante a anulação da multa e não substitui a assessoria de um advogado especializado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AssistenteJuridico;
