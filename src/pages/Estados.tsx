import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Printer, Search, MapPin, User } from 'lucide-react';

interface Associado {
    id: string;
    nome: string;
    foto_url: string | null;
    numero_associado: string;
    estado: string;
    cidade: string;
    cpf?: string;
}

const Estados = () => {
    const navigate = useNavigate();
    const [filteredAssociates, setFilteredAssociates] = useState<Associado[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedState, setSelectedState] = useState<string>('todos');
    const [viewMode, setViewMode] = useState<'default' | 'no-image'>('default');
    const [error, setError] = useState<string | null>(null);

    const brazilianStates = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const filterData = async (mode: 'default' | 'no-image' = 'default') => {
        setIsLoading(true);
        setViewMode(mode);
        try {
            console.log('Fetching report via RPC...');
            const { data, error } = await supabase
                .rpc('get_associados_report', {
                    filter_estado: selectedState,
                    include_photo: mode === 'default'
                });

            if (error) {
                console.error('Supabase RPC error:', error);
                throw error;
            }

            if (data) {
                console.log('Dados recebidos:', data.length);
                // RPC retorna has_photo, mapeamos para interface se precisar
                setFilteredAssociates(data as any);
            }
        } catch (error) {
            console.error('Erro ao buscar associados:', error);
            setError('Falha ao carregar dados. Tente novamente.');
            setFilteredAssociates([]);
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

                        {/* Header & Controls */}
                        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" onClick={() => navigate('/admin/relatorios')} className="flex items-center text-muted-foreground hover:text-primary">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar
                                </Button>
                                <h1 className="text-3xl font-bold text-foreground">
                                    Relatório de Estados
                                </h1>
                            </div>
                            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                Imprimir Lista
                            </Button>
                        </div>

                        {/* Filters */}
                        <Card className="mb-8 print:hidden">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Filtrar por Estado</label>
                                        <Select value={selectedState} onValueChange={setSelectedState}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">Todos os Estados</SelectItem>
                                                {brazilianStates.map(state => (
                                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-end gap-2 md:col-span-2">
                                        <Button onClick={() => filterData('default')} className="w-full md:w-auto bg-primary text-white">
                                            <Search className="mr-2 h-4 w-4" />
                                            Buscar
                                        </Button>
                                        <Button onClick={() => filterData('no-image')} className="w-full md:w-auto bg-secondary text-white hover:bg-secondary/90">
                                            <Search className="mr-2 h-4 w-4" />
                                            Busca sem imagem
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Print Header (Visible only when printing) */}
                        <div className="hidden print:block mb-8 text-center">
                            <h2 className="text-2xl font-bold">Relatório de Associados por Estado</h2>
                            <p className="text-muted-foreground">
                                {selectedState !== 'todos' ? `Estado: ${selectedState}` : 'Todos os Estados'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">Gerado em {new Date().toLocaleDateString()}</p>
                        </div>

                        {/* Data Table */}
                        <Card className="print:border-none print:shadow-none">
                            <CardContent className="p-0">
                                {isLoading ? (
                                    <div className="p-12 text-center text-muted-foreground">Carregando dados...</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    {viewMode === 'default' && <TableHead className="w-[100px]">Foto</TableHead>}
                                                    <TableHead>Nome</TableHead>
                                                    <TableHead>Número</TableHead>
                                                    <TableHead>Cidade/UF</TableHead>
                                                    {viewMode === 'no-image' && <TableHead>CPF</TableHead>}
                                                    {viewMode === 'no-image' && <TableHead>Tem Foto?</TableHead>}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {error && (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="h-24 text-center text-red-500 font-medium">
                                                            Erro ao carregar dados: {error}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                {!error && filteredAssociates.map((associate) => (
                                                    <TableRow key={associate.id}>
                                                        {viewMode === 'default' && (
                                                            <TableCell>
                                                                {associate.foto_url ? (
                                                                    <img
                                                                        src={associate.foto_url}
                                                                        alt={associate.nome}
                                                                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                                                    />
                                                                ) : (
                                                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                                                        <User className="h-6 w-6 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                        )}
                                                        <TableCell className="font-medium">{associate.nome}</TableCell>
                                                        <TableCell>{associate.numero_associado || '-'}</TableCell>
                                                        <TableCell>
                                                            {associate.cidade} - <span className="font-bold">{associate.estado}</span>
                                                        </TableCell>
                                                        {viewMode === 'no-image' && (
                                                            <TableCell>{associate.cpf || '-'}</TableCell>
                                                        )}
                                                        {viewMode === 'no-image' && (
                                                            <TableCell>
                                                                {(associate as any).has_photo ? (
                                                                    <span className="text-green-600 font-bold">Sim</span>
                                                                ) : (
                                                                    <span className="text-gray-400">Não</span>
                                                                )}
                                                            </TableCell>
                                                        )}
                                                    </TableRow>
                                                ))}
                                                {!error && filteredAssociates.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={viewMode === 'default' ? 4 : 6} className="h-24 text-center text-muted-foreground">
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

export default Estados;
