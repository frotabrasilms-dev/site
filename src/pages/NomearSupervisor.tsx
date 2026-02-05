import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Save, ArrowLeft, Loader2, User, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const NomearSupervisor = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [cpfSearch, setCpfSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [associate, setAssociate] = useState<any>(null);

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
                    nomeacao: 'Supervisor'
                })
                .eq('id', associate.id);

            if (error) throw error;

            toast({
                title: "Nomeação Concluída! 🏆",
                description: `${associate.nome} agora é um Supervisor.`,
            });

            // Update local state to reflect change immediately
            setAssociate(prev => ({ ...prev, nomeado: true, nomeacao: 'Supervisor' }));

        } catch (error) {
            console.error("Erro ao nomear supervisor:", error);
            toast({
                title: "Erro",
                description: "Não foi possível concluir a nomeação.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
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
                                Nomear <span className="text-primary">Supervisor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Busque um associado e promova-o a Supervisor
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
                                            <Button size="lg" onClick={handlePromote} disabled={isSaving || (associate.nomeado && associate.nomeacao === 'Supervisor')} className="w-full sm:w-auto text-lg px-8">
                                                {isSaving ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <ShieldCheck className="h-5 w-5 mr-2" />}
                                                {associate.nomeado && associate.nomeacao === 'Supervisor' ? 'Já é Supervisor' : 'Nomear Supervisor'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default NomearSupervisor;
