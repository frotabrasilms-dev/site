import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Printer, Search, Users, ChevronRight } from 'lucide-react';

interface Associado {
    id: number;
    nome: string;
    numero_associado: string;
    cidade: string;
    estado: string;
    telefone: string;
    indicador_id: string;
    nomeacao: string | null;
}

interface SupervisorStats {
    id: number;
    name: string;
    role: string;
    count: number;
    associates: Associado[];
}

const RelatorioSupervisor = () => {
    const navigate = useNavigate();
    const [associates, setAssociates] = useState<Associado[]>([]);
    const [supervisorStats, setSupervisorStats] = useState<SupervisorStats[]>([]);
    const [filteredStats, setFilteredStats] = useState<SupervisorStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState<SupervisorStats | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('associados')
                .select('id, nome, numero_associado, cidade, estado, indicador_id, nomeacao')
                .order('nome', { ascending: true }) as any;

            if (error) throw error;

            const rawAssociates = data || [];
            setAssociates(rawAssociates);

            // Group by indicador_id
            const referralMap = new Map<string, Associado[]>();
            rawAssociates.forEach(acc => {
                if (acc.indicador_id) {
                    const list = referralMap.get(acc.indicador_id) || [];
                    list.push(acc);
                    referralMap.set(acc.indicador_id, list);
                }
            });

            // Associate rankings with names
            const stats: SupervisorStats[] = [];
            for (const [id, referredList] of referralMap.entries()) {
                const leader = rawAssociates.find(a => a.id.toString() === id.toString());
                if (leader) {
                    stats.push({
                        id: leader.id,
                        name: leader.nome,
                        role: leader.nomeacao || 'Associado',
                        count: referredList.length,
                        associates: referredList
                    });
                }
            }

            const sortedStats = stats.sort((a, b) => b.count - a.count);
            setSupervisorStats(sortedStats);
            setFilteredStats(sortedStats);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filtered = supervisorStats.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStats(filtered);
    }, [searchTerm, supervisorStats]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20 print:bg-white">
                <section className="pt-32 pb-20 print:pt-0 print:pb-0">
                    <div className="container-custom">

                        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" onClick={() => navigate('/admin/relatorios')} className="flex items-center text-muted-foreground hover:text-primary">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar
                                </Button>
                                <h1 className="text-3xl font-bold text-foreground">
                                    Relatório por Supervisor
                                </h1>
                            </div>
                            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                Imprimir Relatório
                            </Button>
                        </div>

                        {!selectedSupervisor ? (
                            <>
                                <Card className="mb-8 print:hidden">
                                    <CardContent className="p-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Buscar Supervisor</label>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="Nome do supervisor..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="print:border-none print:shadow-none">
                                    <CardHeader className="border-b">
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-primary" />
                                            Ranking de Indicações
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        {isLoading ? (
                                            <div className="p-12 text-center text-muted-foreground">Carregando rankings...</div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-16 text-center">Posição</TableHead>
                                                            <TableHead>Supervisor</TableHead>
                                                            <TableHead>Cargo</TableHead>
                                                            <TableHead className="text-right">Total Indicados</TableHead>
                                                            <TableHead className="w-20 print:hidden"></TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {filteredStats.map((stat, i) => (
                                                            <TableRow key={stat.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedSupervisor(stat)}>
                                                                <TableCell className="text-center font-bold">{i + 1}º</TableCell>
                                                                <TableCell className="font-medium">{stat.name}</TableCell>
                                                                <TableCell>{stat.role}</TableCell>
                                                                <TableCell className="text-right font-bold text-primary">{stat.count}</TableCell>
                                                                <TableCell className="text-right print:hidden">
                                                                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {filteredStats.length === 0 && (
                                                            <TableRow>
                                                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                                    Nenhum supervisor encontrado.
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between print:hidden">
                                    <Button variant="outline" onClick={() => setSelectedSupervisor(null)} className="flex items-center">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Voltar ao Ranking
                                    </Button>
                                </div>

                                <Card className="border-primary/20">
                                    <CardHeader className="bg-primary/5 border-b">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <CardTitle className="text-2xl font-bold text-primary">{selectedSupervisor.name}</CardTitle>
                                                <p className="text-muted-foreground">{selectedSupervisor.role}</p>
                                            </div>
                                            <div className="bg-white px-4 py-2 rounded-lg border shadow-sm text-center">
                                                <span className="text-sm text-muted-foreground block">Total de Indicados</span>
                                                <span className="text-2xl font-bold text-primary">{selectedSupervisor.count}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nome do Associado</TableHead>
                                                        <TableHead>Número</TableHead>
                                                        <TableHead>Cidade/UF</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedSupervisor.associates.map((acc) => (
                                                        <TableRow key={acc.id}>
                                                            <TableCell className="font-medium">{acc.nome}</TableCell>
                                                            <TableCell>{acc.numero_associado || '-'}</TableCell>
                                                            <TableCell>{acc.cidade} - {acc.estado}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default RelatorioSupervisor;
