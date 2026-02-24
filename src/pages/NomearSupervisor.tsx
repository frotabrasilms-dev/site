import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Save, ArrowLeft, Loader2, User, ShieldCheck, PartyPopper, Download, FileCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import html2canvas from 'html2canvas';
import SupervisorCard from '@/components/SupervisorCard';
import NominationCertificate from '@/components/NominationCertificate';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const NomearSupervisor = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [cpfSearch, setCpfSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [associate, setAssociate] = useState<any>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Refs for artifact generation
    const cardRef = useRef<HTMLDivElement>(null);
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleCpfMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cpfSearch || cpfSearch.length < 14) {
            toast({
                title: "CPF Inválido",
                description: "Por favor, digite um CPF válido.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        setAssociate(null);

        try {
            const cleanCpf = cpfSearch.replace(/\D/g, '');
            const { data, error } = await supabase
                .from('associados')
                .select('*')
                .eq('cpf', cleanCpf)
                .single();

            if (error) throw error;

            if (data) {
                setAssociate(data);
            } else {
                toast({
                    title: "Não encontrado",
                    description: "Nenhum associado encontrado com este CPF.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Erro ao buscar associado:", error);
            toast({
                title: "Erro",
                description: "Erro ao buscar associado. Verifique o CPF.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromote = async () => {
        if (!associate) return;

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('associados')
                .update({
                    nomeado: true,
                    nomeacao: 'Subdelegado',
                    indicador_id: localStorage.getItem('user_cpf')
                })
                .eq('id', associate.id);

            if (error) throw error;

            // Inserir na tabela posicoes_rede
            const cepPrefix = associate.cep ? associate.cep.replace(/\D/g, '').substring(0, 5) : '';
            const { error: errorRede } = await supabase
                .from('posicoes_rede')
                .insert({
                    associado_id: associate.cpf, // Usando CPF conforme padrão solicitado
                    cargo_id: 'Subdelegado',
                    superior_id: localStorage.getItem('user_cpf'),
                    territorio_id: cepPrefix,
                    ativo: true,
                    data_inicio: new Date().toISOString()
                });

            if (errorRede) {
                console.error("Erro ao criar posição na rede:", errorRede);
                // Não bloqueia o sucesso visual, mas loga o erro
            }

            toast({
                title: "Nomeação Concluída! 🏆",
                description: `${associate.nome} agora é um Subdelegado.`,
            });

            // Update local state to reflect change immediately
            setAssociate(prev => ({ ...prev, nomeado: true, nomeacao: 'Subdelegado' }));
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Erro ao nomear Subdelegado:", error);
            toast({
                title: "Erro",
                description: "Não foi possível concluir a nomeação.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const downloadArtifact = async (elementRef: React.RefObject<HTMLElement>, fileName: string) => {
        if (!elementRef.current) return;

        try {
            const canvas = await html2canvas(elementRef.current, {
                scale: 2,
                backgroundColor: null,
                useCORS: true
            } as any);
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = fileName;
            link.click();

            toast({
                title: "Download Iniciado",
                description: `O arquivo ${fileName} foi salvo com sucesso.`
            });
        } catch (error) {
            console.error("Erro ao gerar imagem:", error);
            toast({
                title: "Erro no Download",
                description: "Não foi possível gerar a imagem.",
                variant: "destructive"
            });
        }
    };

    const getWhatsAppLink = () => {
        if (!associate?.telefone) return '';
        const phone = associate.telefone.replace(/\D/g, '');
        const text = `Olá ${associate.nome}, aqui fala da Associação Frota Brasil. Estou entrando em contato referente à sua nomeação como Subdelegado. Parabéns!`;
        return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
                <section className="pt-32 pb-20">
                    <div className="container-custom">
                        <div className="mb-8">
                            <Button variant="ghost" onClick={() => navigate('/admin')} className="flex items-center text-muted-foreground hover:text-primary">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar para o Painel
                            </Button>
                        </div>

                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                Nomear <span className="text-primary">Subdelegado</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Busque um associado e promova-o a Subdelegado
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-8">
                            {/* Busca */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Buscar Associado</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSearch} className="flex gap-4">
                                        <div className="flex-1">
                                            <Label htmlFor="cpf-search" className="sr-only">CPF do Associado</Label>
                                            <Input
                                                id="cpf-search"
                                                placeholder="Digite o CPF (000.000.000-00)"
                                                value={cpfSearch}
                                                onChange={(e) => setCpfSearch(handleCpfMask(e.target.value))}
                                                className="text-lg"
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="w-32">
                                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                                            Buscar
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {associate && (
                                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-primary/50 shadow-lg">
                                    <CardHeader className="bg-muted/30">
                                        <CardTitle className="flex items-center text-primary">
                                            <ShieldCheck className="h-6 w-6 mr-3" />
                                            Dados do Candidato
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Nome Completo</Label>
                                                <p className="font-bold text-xl">{associate.nome}</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Localização</Label>
                                                <p className="text-lg">{associate.cidade} - {associate.estado}</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Status Atual</Label>
                                                <div className="mt-1">
                                                    {associate.nomeado ? (
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-200">
                                                            Já é {associate.nomeacao}
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium border border-gray-200">
                                                            Associado Comum
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t flex justify-end">
                                            <Button size="lg" onClick={handlePromote} disabled={isSaving || (associate.nomeado)} className="w-full sm:w-auto text-lg px-8">
                                                {isSaving ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <ShieldCheck className="h-5 w-5 mr-2" />}
                                                {associate.nomeado ? 'Já possui nomeação' : 'Nomear Subdelegado'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>

                <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                    <DialogContent className="max-w-3xl w-full">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-2xl text-green-700">
                                <PartyPopper className="w-8 h-8" />
                                Nomeação Realizada com Sucesso!
                            </DialogTitle>
                            <DialogDescription className="text-lg pt-2">
                                O associado foi nomeado como <strong>Subdelegado</strong>.
                                Baixe abaixo os documentos oficiais.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                            <Card className="hover:shadow-lg transition-shadow border-yellow-500/50 bg-yellow-50/50">
                                <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Carteirinha de Subdelegado</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Cartão oficial preto e amarelo</p>
                                    <Button onClick={() => downloadArtifact(cardRef, `Carteira-Subdelegado-${associate?.nome}.png`)} className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
                                        <Download className="mr-2 h-4 w-4" /> Baixar Carteirinha
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow border-blue-500/50 bg-blue-50/50">
                                <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                        <FileCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Certificado Oficial</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Assinado pela presidência</p>
                                    <Button onClick={() => downloadArtifact(certificateRef, `Certificado-Subdelegado-${associate?.nome}.png`)} className="bg-blue-800 hover:bg-blue-900 text-white w-full">
                                        <Download className="mr-2 h-4 w-4" /> Baixar Certificado
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* WhatsApp Section */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 text-white p-2 rounded-full">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800">Enviar via WhatsApp</h4>
                                    <p className="text-sm text-green-700">Abra a conversa para enviar os arquivos manualmente.</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => window.open(getWhatsAppLink(), '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                            >
                                Iniciar Conversa
                            </Button>
                        </div>

                        {/* Hidden Components for Capture */}
                        <div className="fixed left-[-9999px] top-[-9999px]">
                            {associate && (
                                <>
                                    <SupervisorCard
                                        ref={cardRef}
                                        name={associate.nome}
                                        cpf={associate.cpf}
                                        role="Subdelegado"
                                        city={associate.cidade}
                                        state={associate.estado}
                                        date={new Date().toLocaleDateString('pt-BR')}
                                        photoUrl={associate.foto_url}
                                        memberNumber={associate.numero_associado || '000000'}
                                    />
                                    <NominationCertificate
                                        ref={certificateRef}
                                        name={associate.nome}
                                        cpf={associate.cpf}
                                        role="Subdelegado"
                                        city={associate.cidade}
                                        state={associate.estado}
                                        date={new Date().toLocaleDateString('pt-BR')}
                                        nominationDate={new Date().toISOString()}
                                        rg={associate.rg}
                                        memberNumber={associate.numero_associado}
                                    />
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                                Fechar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
};

export default NomearSupervisor;
