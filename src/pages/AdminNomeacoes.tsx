import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Search, Save, UserCheck, ArrowLeft, Loader2, User, Download, FileCheck, PartyPopper } from 'lucide-react';
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

const AdminNomeacoes = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState<'cpf' | 'id'>('cpf');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [associate, setAssociate] = useState<any>(null);
    const [nominationData, setNominationData] = useState({
        nomeacao: '',
        observacao: ''
    });

    // Refs for artifact generation
    const cardRef = useRef<HTMLDivElement>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

        if (searchType === 'cpf') {
            if (!searchValue || searchValue.length < 14) {
                toast({
                    title: "CPF Inválido",
                    description: "Por favor, digite um CPF válido.",
                    variant: "destructive"
                });
                return;
            }
        } else {
            if (!searchValue) {
                toast({
                    title: "Número Inválido",
                    description: "Por favor, digite o número do associado.",
                    variant: "destructive"
                });
                return;
            }
        }

        setIsLoading(true);
        setAssociate(null);

        try {
            let query = supabase.from('associados').select('*');

            if (searchType === 'cpf') {
                const cleanCpf = searchValue.replace(/\D/g, '');
                query = query.eq('cpf', cleanCpf);
            } else {
                query = query.eq('numero_associado', searchValue);
            }

            const { data, error } = await query.single();

            if (error) throw error;

            if (data) {
                setAssociate(data);
                setNominationData({
                    nomeacao: data.nomeacao || '',
                    observacao: data.observacao || ''
                });
            } else {
                toast({
                    title: "Não encontrado",
                    description: searchType === 'cpf'
                        ? "Nenhum associado encontrado com este CPF."
                        : "Nenhum associado encontrado com este número.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Erro ao buscar associado:", error);
            toast({
                title: "Erro",
                description: "Erro ao buscar associado. Verifique os dados.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getFormattedRole = () => {
        const role = nominationData.nomeacao;
        if ((role === 'Delegado Regional' || role === 'Delegado Internacional' || role === 'Diretor(a)') && nominationData.observacao) {
            return `${role} - ${nominationData.observacao}`;
        }
        if (role === 'Delegado Estadual' && associate?.estado) {
            return `${role} - ${associate.estado}`;
        }
        return role;
    };

    const handleSave = async () => {
        if (!associate) return;
        if (!nominationData.nomeacao) {
            toast({
                title: "Atenção",
                description: "Selecione um tipo de nomeação antes de salvar.",
                variant: "destructive"
            });
            return;
        }

        setIsSaving(true);
        try {
            // 1. Update Database
            const { error } = await supabase
                .from('associados')
                .update({
                    nomeado: true,
                    nomeacao: nominationData.nomeacao,
                    observacao: nominationData.observacao
                })
                .eq('id', associate.id);

            if (error) throw error;

            toast({
                title: "Nomeação Salva!",
                description: "Gerando documentos e enviando e-mail...",
            });

            // Refresh local state
            setAssociate(prev => ({ ...prev, ...nominationData, nomeado: true }));
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Erro ao salvar:", error);
            toast({
                title: "Erro",
                description: "Não foi possível salvar a nomeação.",
                variant: "destructive"
            });
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

    // Helper for WhatsApp Link
    const getWhatsAppLink = () => {
        if (!associate?.telefone) return '';
        const phone = associate.telefone.replace(/\D/g, '');
        const role = getFormattedRole();
        const text = `Olá ${associate.nome}, aqui fala da Associação Frota Brasil. Estou entrando em contato referente à sua nomeação como ${role}. Parabéns!`;
        return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
    };

    const nominationTypes = [
        "Diretor(a)",
        "Delegado Internacional",
        "Delegado Regional",
        "Delegado Estadual",
        "Delegado da Capital",
        "Delegado Municipal",
        "Subdelegado"
    ];

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
                                Fazer <span className="text-primary">Nomeações</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Busque um associado pelo CPF e atribua um cargo
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Busca */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Buscar Associado</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <RadioGroup
                                            defaultValue="cpf"
                                            value={searchType}
                                            onValueChange={(value) => {
                                                setSearchType(value as 'cpf' | 'id');
                                                setSearchValue('');
                                            }}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="cpf" id="search-cpf" />
                                                <Label htmlFor="search-cpf">Por CPF</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="id" id="search-id" />
                                                <Label htmlFor="search-id">Por Número de Associado</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <form onSubmit={handleSearch} className="flex gap-4">
                                        <div className="flex-1">
                                            <Label htmlFor="search-input" className="sr-only">
                                                {searchType === 'cpf' ? 'CPF do Associado' : 'Número do Associado'}
                                            </Label>
                                            <Input
                                                id="search-input"
                                                placeholder={searchType === 'cpf' ? "Digite o CPF (000.000.000-00)" : "Digite o Nº do Associado"}
                                                value={searchValue}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (searchType === 'cpf') {
                                                        setSearchValue(handleCpfMask(val));
                                                    } else {
                                                        // Allow only numbers for ID
                                                        setSearchValue(val.replace(/\D/g, ''));
                                                    }
                                                }}
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Dados do Associado - Esquerda */}
                                    <Card className="md:col-span-1 h-fit">
                                        <CardHeader>
                                            <CardTitle className="flex items-center text-primary">
                                                <User className="h-5 w-5 mr-2" />
                                                Dados do Associado
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Nome</Label>
                                                <p className="font-medium text-lg">{associate.nome}</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Endereço</Label>
                                                <p className="text-sm">
                                                    {associate.logradouro}, {associate.numero_imovel}<br />
                                                    {associate.bairro} - {associate.cidade}/{associate.estado}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground text-xs uppercase font-bold">Situação Atual</Label>
                                                {associate.nomeado ? (
                                                    <div className="mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-block border border-green-200">
                                                        NOMEADO: {associate.nomeacao}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">Sem nomeação</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Formulário de Nomeação - Direita */}
                                    <Card className="md:col-span-2">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <UserCheck className="h-5 w-5 mr-2" />
                                                Atribuir Nomeação
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div>
                                                <Label className="text-base mb-3 block font-semibold">Tipo de Nomeação</Label>
                                                <RadioGroup
                                                    value={nominationData.nomeacao}
                                                    onValueChange={(val) => setNominationData(prev => ({ ...prev, nomeacao: val }))}
                                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                                >
                                                    {nominationTypes.map((type) => (
                                                        <div key={type} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                                            <RadioGroupItem value={type} id={type} />
                                                            <Label htmlFor={type} className="cursor-pointer flex-1">{type}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>

                                            <div>
                                                <Label htmlFor="observacao" className="text-base mb-2 block font-semibold">Observações</Label>
                                                <Textarea
                                                    id="observacao"
                                                    placeholder={
                                                        nominationData.nomeacao === 'Delegado Internacional'
                                                            ? "Digite aqui o país do delegado..."
                                                            : nominationData.nomeacao === 'Diretor(a)'
                                                                ? "Digite aqui a diretoria (ex: Administrativo, Financeiro)..."
                                                                : "Digite aqui as observações sobre esta nomeação..."
                                                    }
                                                    className="min-h-[120px]"
                                                    value={nominationData.observacao}
                                                    onChange={(e) => setNominationData(prev => ({ ...prev, observacao: e.target.value }))}
                                                />
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <Button size="lg" onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                                                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                                    Salvar Nomeação
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
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
                                O associado foi nomeado como <strong>{getFormattedRole()}</strong>.
                                Baixe abaixo os documentos oficiais.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                            <Card className="hover:shadow-lg transition-shadow border-yellow-500/50 bg-yellow-50/50">
                                <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                        <UserCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Carteirinha de Nomeado</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Cartão oficial preto e amarelo</p>
                                    <Button onClick={() => downloadArtifact(cardRef, `Carteira-Nomeado-${associate?.nome}.png`)} className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
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
                                    <Button onClick={() => downloadArtifact(certificateRef, `Certificado-Nomeacao-${associate?.nome}.png`)} className="bg-blue-800 hover:bg-blue-900 text-white w-full">
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
                                        role={getFormattedRole()}
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
                                        role={getFormattedRole()}
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

export default AdminNomeacoes;
