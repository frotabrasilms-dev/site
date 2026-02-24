import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Printer, MapPin, Users, Globe } from 'lucide-react';

interface ReportData {
    cityStats: { city: string; count: number }[];
    stateStats: { state: string; count: number }[];
    supervisorRanking: { name: string; count: number }[];
    coordinatorRanking: { name: string; count: number }[];
}

const AdminRelatorios = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('geral');
    const [data, setData] = useState<ReportData>({
        cityStats: [],
        stateStats: [],
        supervisorRanking: [],
        coordinatorRanking: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch all associates to process in memory (for simpler grouping pending complex DB queries)
            // Note: For very large datasets, this should be moved to RPC functions in Supabase
            const { data: associates, error } = await supabase
                .from('associados')
                .select('id, nome, cidade, estado, indicador_id, nomeacao') as any;

            if (error) throw error;

            if (!associates) return;

            // Process City Stats
            const cityMap = new Map<string, number>();
            const stateMap = new Map<string, number>();

            // Referral Counts (indicador_id -> count)
            const referralMap = new Map<string, number>();

            associates.forEach(acc => {
                // City
                if (acc.cidade) {
                    const city = acc.cidade;
                    cityMap.set(city, (cityMap.get(city) || 0) + 1);
                }
                // State
                if (acc.estado) {
                    const state = acc.estado;
                    stateMap.set(state, (stateMap.get(state) || 0) + 1);
                }
                // Referral
                if (acc.indicador_id) {
                    referralMap.set(acc.indicador_id, (referralMap.get(acc.indicador_id) || 0) + 1);
                }
            });

            // Convert Maps to Arrays and Sort
            const cityStats = Array.from(cityMap.entries())
                .map(([city, count]) => ({ city, count }))
                .sort((a, b) => b.count - a.count);

            const stateStats = Array.from(stateMap.entries())
                .map(([state, count]) => ({ state, count }))
                .sort((a, b) => b.count - a.count);

            // Associate Referral Counts with Names
            const rankingData = [];
            for (const [id, count] of referralMap.entries()) {
                const leader = associates.find(a => a.id === id); // Find leader name in the fetched list
                if (leader) {
                    rankingData.push({
                        name: leader.nome,
                        role: leader.nomeacao,
                        count
                    });
                }
            }

            const supervisorRanking = rankingData
                .filter(r => r.role === 'Supervisor')
                .sort((a, b) => b.count - a.count);

            const coordinatorRanking = rankingData
                .filter(r => r.role?.includes('Coordenador'))
                .sort((a, b) => b.count - a.count);


            setData({
                cityStats,
                stateStats,
                supervisorRanking,
                coordinatorRanking
            });

        } catch (error) {
            console.error('Erro ao carregar relatórios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20 print:bg-white">
                <section className="pt-32 pb-20 print:pt-0 print:pb-0">
                    <div className="container-custom">

                        {/* Controls - Hidden on Print */}
                        <div className="mb-8 flex justify-between items-center print:hidden">
                            <Button variant="ghost" onClick={() => navigate('/admin')} className="flex items-center text-muted-foreground hover:text-primary">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar para o Painel
                            </Button>
                            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                Imprimir Relatório
                            </Button>
                        </div>

                        <div className="text-center mb-12 print:mb-6">
                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                Relatórios <span className="text-primary">Administrativos</span>
                            </h1>
                            <p className="text-xl text-muted-foreground print:hidden">
                                Estatísticas e Rankings da Associação
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-20">Carregando dados...</div>
                        ) : (
                            <div className="space-y-8">

                                {/* Location Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:block print:space-y-8">
                                    <Card className="print:border-none print:shadow-none">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-primary" />
                                                Associados por Município
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Município</TableHead>
                                                        <TableHead className="text-right">Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {data.cityStats.map((stat, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell>{stat.city}</TableCell>
                                                            <TableCell className="text-right font-medium">{stat.count}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {data.cityStats.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={2} className="text-center">Sem dados</TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    <Card className="print:border-none print:shadow-none">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Globe className="h-5 w-5 text-primary" />
                                                Associados por Estado
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Estado</TableHead>
                                                        <TableHead className="text-right">Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {data.stateStats.map((stat, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell>{stat.state}</TableCell>
                                                            <TableCell className="text-right font-medium">{stat.count}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {data.stateStats.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={2} className="text-center">Sem dados</TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:block print:space-y-8 print:break-before-page">
                                    {/* Supervisor Ranking */}
                                    <Card className="print:border-none print:shadow-none">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-primary" />
                                                Ranking de Supervisores (Indicações)
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-12">#</TableHead>
                                                        <TableHead>Nome</TableHead>
                                                        <TableHead className="text-right">Indicações</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {data.supervisorRanking.map((stat, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-bold">{i + 1}º</TableCell>
                                                            <TableCell>{stat.name}</TableCell>
                                                            <TableCell className="text-right font-bold text-primary">{stat.count}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {data.supervisorRanking.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                                Nenhum supervisor com indicações registradas.
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    {/* Coordinator Ranking */}
                                    <Card className="print:border-none print:shadow-none">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-secondary" />
                                                Ranking de Coordenadores
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-12">#</TableHead>
                                                        <TableHead>Nome</TableHead>
                                                        <TableHead className="text-right">Rede</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {data.coordinatorRanking.map((stat, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-bold">{i + 1}º</TableCell>
                                                            <TableCell>{stat.name}</TableCell>
                                                            <TableCell className="text-right font-bold text-secondary">{stat.count}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {data.coordinatorRanking.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                                Nenhum coordenador com rede registrada.
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>



                                {/* Placeholder Buttons for Future Reports */}
                                <div className="mt-12 mb-8 print:hidden">
                                    <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Relatórios Detalhados</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Coluna 1: Amarelo */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                                            <span className="font-semibold">Associados por Supervisor</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Coluna 2: Azul */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white border-none">
                                            <span className="font-semibold">Associados por Município</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Coluna 3: Verde */}
                                        <Button
                                            className="h-auto py-4 flex flex-col items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none"
                                            onClick={() => navigate('/admin/relatorios/estados')}
                                        >
                                            <span className="font-semibold">Associados por Estado</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Coluna 1: Amarelo */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                                            <span className="font-semibold">Ranking Nacional Supervisores</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Coluna 2: Azul */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white border-none">
                                            <span className="font-semibold">Ranking Coord. Municipais</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Coluna 3: Verde */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none">
                                            <span className="font-semibold">Ranking Coord. Estaduais</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>

                                        {/* Botão Largo (Rede Completa) - Vou usar Azul/Primary para diferenciar ou seguir o padrão? Vou usar Primary padrão do site para destaque */}
                                        <Button className="h-auto py-4 flex flex-col items-center gap-2 lg:col-span-3 bg-primary hover:bg-primary/90 text-white border-none">
                                            <span className="font-semibold">Rede Completa de Supervisor</span>
                                            <span className="text-xs opacity-90">Lista detalhada</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AdminRelatorios;
