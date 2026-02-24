import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Printer, Search, MapPin } from 'lucide-react';

interface Associado {
    id: number;
    nome: string;
    numero_associado: string;
    cidade: string;
    estado: string;
    telefone: string;
}

const RelatorioMunicipio = () => {
    const navigate = useNavigate();
    const [associates, setAssociates] = useState<Associado[]>([]);
    const [filteredAssociates, setFilteredAssociates] = useState<Associado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('todas');

    useEffect(() => {
        fetchAssociates();
    }, []);

    const fetchAssociates = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('associados')
                .select('id, nome, numero_associado, cidade, estado, telefone')
                .order('cidade', { ascending: true });

            if (error) throw error;
            setAssociates(data || []);
            setFilteredAssociates(data || []);
        } catch (error) {
            console.error('Erro ao buscar associados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filtered = associates.filter(acc => {
            const matchesSearch = acc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                acc.cidade.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = filterCity === 'todas' || acc.cidade === filterCity;
            return matchesSearch && matchesCity;
        });
        setFilteredAssociates(filtered);
    }, [searchTerm, filterCity, associates]);

    const cities = Array.from(new Set(associates.map(a => a.cidade))).sort();

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
                                    Relatório por Município
                                </h1>
                            </div>
                            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                Imprimir Lista
                            </Button>
                        </div>

                        <Card className="mb-8 print:hidden">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Buscar Associado ou Cidade</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pl-10"
                                                placeholder="Nome ou cidade..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Filtrar por Cidade</label>
                                        <select
                                            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            value={filterCity}
                                            onChange={(e) => setFilterCity(e.target.value)}
                                        >
                                            <option value="todas">Todas as Cidades</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="hidden print:block mb-8 text-center">
                            <h2 className="text-2xl font-bold">Relatório de Associados por Município</h2>
                            <p className="text-muted-foreground">
                                {filterCity !== 'todas' ? `Município: ${filterCity}` : 'Todos os Municípios'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">Gerado em {new Date().toLocaleDateString()}</p>
                        </div>

                        <Card className="print:border-none print:shadow-none">
                            <CardContent className="p-0">
                                {isLoading ? (
                                    <div className="p-12 text-center text-muted-foreground">Carregando dados...</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nome</TableHead>
                                                    <TableHead>Número</TableHead>
                                                    <TableHead>Município/UF</TableHead>
                                                    <TableHead>Contato</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredAssociates.map((associate) => (
                                                    <TableRow key={associate.id}>
                                                        <TableCell className="font-medium">{associate.nome}</TableCell>
                                                        <TableCell>{associate.numero_associado || '-'}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                                {associate.cidade} - <span className="font-bold">{associate.estado}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{associate.telefone || '-'}</TableCell>
                                                    </TableRow>
                                                ))}
                                                {filteredAssociates.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                            Nenhum associado encontrado.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                            <div className="p-4 border-t bg-muted/10 text-sm text-muted-foreground flex justify-between print:hidden">
                                <span>Total de registros: {filteredAssociates.length}</span>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default RelatorioMunicipio;
