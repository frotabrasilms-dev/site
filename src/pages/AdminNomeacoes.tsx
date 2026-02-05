import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Search, Save, UserCheck, ArrowLeft, Loader2, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminNomeacoes = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [cpfSearch, setCpfSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [associate, setAssociate] = useState<any>(null);
    const [nominationData, setNominationData] = useState({
        nomeacao: '',
        observacao: ''
    });

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
                setNominationData({
                    nomeacao: data.nomeacao || '',
                    observacao: data.observacao || ''
                });
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
                title: "Sucesso!",
                description: "Nomeação salva com sucesso."
            });

            // Refresh local data showing success state essentially
            setAssociate(prev => ({ ...prev, ...nominationData, nomeado: true }));

        } catch (error) {
            console.error("Erro ao salvar nomeação:", error);
            toast({
                title: "Erro",
                description: "Não foi possível salvar a nomeação.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const nominationTypes = [
        "Delegado Regional",
        "Coordenador Estadual",
        "Coordenador da Capital",
        "Coordenador Municipal",
        "Supervisor"
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
                                                    placeholder="Digite aqui as observações sobre esta nomeação..."
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
            </div>
        </Layout>
    );
};

export default AdminNomeacoes;
