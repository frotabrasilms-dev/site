import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Users, Settings, Upload, Loader2, Save, Trash2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { adicionarParceiro, getParceiros } from '@/data/parceiros';
import { Parceiro } from '@/types/parceiro';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const AdminParceiros = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [parceirosList, setParceirosList] = useState<Parceiro[]>([]);
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        contato_nome: '',
        whatsapp: '',
        exibir_whatsapp: false,
        imagem: '',
        cep: '',
        numero: '',
        endereco: '', // Stores the full formatted address
        site: '',
        observacao: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // State for Editing
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchParceiros = async () => {
        setIsLoadingList(true);
        const data = await getParceiros();
        setParceirosList(data);
        setIsLoadingList(false);
    };

    useEffect(() => {
        fetchParceiros();
    }, []);

    const handleInputChange = (field: string, value: string | boolean) => {
        let formattedValue = value;

        if (field === 'cnpj' && typeof value === 'string') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .slice(0, 18);
        } else if (field === 'whatsapp' && typeof value === 'string') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .slice(0, 15);
        } else if (field === 'cep' && typeof value === 'string') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .slice(0, 9);
        }

        setFormData(prev => ({ ...prev, [field]: formattedValue }));
    };

    const handleCepBlur = async () => {
        if (formData.cep.length < 9) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${formData.cep.replace(/\D/g, '')}/json/`);
            const data = await response.json();

            if (!data.erro) {
                // Update address string but keep it hidden/controlled by these fields
                // We'll construct the full address string on submit or when fields change if we want to show it,
                // but user asked for ONLY CEP and Number. 
                // However, we need to store the full address for the frontend to show.
                // Let's store components in state if we needed them, but for now we just need to build the string.
                // Actually, I'll store the components to build the string on submit.
                // Wait, if I only ask CEP and Number, the user can't edit street/city if ViaCEP is wrong. 
                // But the instruction was specific: "Ask only CEP and Number". 
                // I will trust the user wants simplicity. I'll fetch and store the full string.

                const fullAddress = `${data.logradouro}, Nº ${formData.numero}, ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`;
                setFormData(prev => ({
                    ...prev,
                    endereco: fullAddress
                }));
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    // Effect to update address when number changes
    useEffect(() => {
        if (formData.cep && formData.numero) {
            // We need the other address parts to reconstruction if we don't save them.
            // Since I didn't add columns for street/city, I have to rely on fetching or parsing.
            // To avoid re-fetching, I should probably just fetch once. 
            // Let's change strategy: Fetch on blur, and update the 'endereco' state. 
            // If 'numero' changes, we need to inject it into the address string? 
            // That's messy with a single string.
            // Better strategy: Fetch address, save it in a temp variable or separate state if needed, 
            // but `endereco` is the source of truth for DB.
            // Given the constraint "Ask only CEP and Number", I will assume we generate the address string ON SUBMIT 
            // based on the fetched data + number.
            // BUT wait, `viacep` call is async. I can't do it comfortably in submit without waiting.
            // I'll add `logradouro`, `bairro`, `cidade`, `uf` to state to hold values from ViaCEP.
        }
    }, [formData.numero]);

    const [addressParts, setAddressParts] = useState({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: ''
    });

    const searchCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setAddressParts({
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf
                });
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Don't clear image URL immediately when editing, only if new file is selected
            if (!editingId) {
                setFormData(prev => ({ ...prev, imagem: '' }));
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `parceiros/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Erro no upload:', uploadError);
            throw uploadError;
        }

        const { data: { publicUrl } } = await supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleEdit = (parceiro: Parceiro) => {
        setEditingId(parceiro.id);
        setFormData({
            nome: parceiro.nome,
            cnpj: parceiro.cnpj || '',
            contato_nome: parceiro.contato_nome || '',
            whatsapp: parceiro.whatsapp || '',
            exibir_whatsapp: parceiro.exibir_whatsapp || false,
            imagem: parceiro.imagem || '',
            cep: '',
            numero: '',
            endereco: parceiro.endereco || '',
            site: parceiro.site || '',
            observacao: parceiro.observacao || ''
        });
        setImagePreview(parceiro.imagem);
        setSelectedFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            nome: '',
            cnpj: '',
            contato_nome: '',
            whatsapp: '',
            exibir_whatsapp: false,
            imagem: '',
            cep: '',
            numero: '',
            endereco: '',
            site: '',
            observacao: ''
        });
        setAddressParts({ logradouro: '', bairro: '', localidade: '', uf: '' });
        setSelectedFile(null);
        setImagePreview(null);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza que deseja excluir este parceiro?')) {
            try {
                const { error } = await supabase
                    .from('parceiros')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                toast({
                    title: "Sucesso",
                    description: "Parceiro excluído com sucesso."
                });
                fetchParceiros();
                if (editingId === id) handleCancelEdit();

            } catch (error) {
                console.error('Erro ao excluir:', error);
                toast({
                    title: "Erro",
                    description: "Não foi possível excluir o parceiro.",
                    variant: "destructive"
                });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.nome) {
            toast({
                title: "Erro",
                description: "O campo 'Nome da Empresa' é obrigatório.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        if (!editingId && !selectedFile && !formData.imagem.trim()) {
            toast({
                title: "Erro",
                description: "Por favor, selecione uma imagem ou forneça uma URL.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        try {
            let imageUrl = formData.imagem;
            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            let constructedAddress = formData.endereco;
            if (addressParts.logradouro) {
                constructedAddress = `${addressParts.logradouro}, ${formData.numero || 'S/N'}, ${addressParts.bairro}, ${addressParts.localidade} - ${addressParts.uf}, ${formData.cep}`;
            }

            if (editingId) {
                // Update existing
                const { error } = await supabase
                    .from('parceiros')
                    .update({
                        nome: formData.nome,
                        cnpj: formData.cnpj || null,
                        contato_nome: formData.contato_nome || null,
                        whatsapp: formData.whatsapp || null,
                        exibir_whatsapp: formData.exibir_whatsapp,
                        imagem: imageUrl,
                        endereco: constructedAddress || null,
                        site: formData.site || null,
                        observacao: formData.observacao || null
                    })
                    .eq('id', editingId);

                if (error) throw error;

                toast({
                    title: "Sucesso!",
                    description: "Parceiro atualizado com sucesso."
                });

            } else {
                // Create new
                await adicionarParceiro({
                    nome: formData.nome,
                    cnpj: formData.cnpj || null,
                    contato_nome: formData.contato_nome || null,
                    whatsapp: formData.whatsapp || null,
                    exibir_whatsapp: formData.exibir_whatsapp,
                    imagem: imageUrl,
                    endereco: constructedAddress || null,
                    site: formData.site || null,
                    observacao: formData.observacao || null
                });

                toast({
                    title: "Sucesso!",
                    description: "Parceiro adicionado com sucesso."
                });
            }

            // Limpar formulário
            handleCancelEdit();
            await fetchParceiros();
        } catch (error) {
            console.error("Erro ao salvar parceiro:", error);
            toast({
                title: "Erro",
                description: "Erro ao salvar parceiro. Verifique o console.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadContract = () => {
        if (!formData.nome || !formData.cnpj || !formData.contato_nome) {
            toast({
                title: "Dados incompletos",
                description: "Preencha Nome da Empresa, CNPJ e Nome do Contato para gerar o contrato.",
                variant: "destructive"
            });
            return;
        }

        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("CONTRATO DE PARCERIA PUBLICITÁRIA", 105, 20, { align: 'center' });

        // Body text
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        const text = `
CONTRATANTE: FROTA BRASIL, inscrita no CNPJ sob o nº [CNPJ FROTA BRASIL], neste ato representada por DONNER DE SOUZA, doravante denominada CONTRATANTE.

CONTRATADA: ${formData.nome}, inscrita no CNPJ sob o nº ${formData.cnpj}, neste ato representada por ${formData.contato_nome}, doravante denominada CONTRATADA.

As partes acima identificadas têm, entre si, justo e contratado o presente Contrato de Parceria Publicitária, que se regerá pelas cláusulas seguintes:

CLÁUSULA PRIMEIRA - DO OBJETO
O presente contrato tem por objeto a divulgação da marca/empresa da CONTRATADA no website do FROTA BRASIL (www.frotabrasil.com.br).

CLÁUSULA SEGUNDA - DA VIGÊNCIA
O presente contrato terá validade de 06 (seis) meses, a contar da data de sua assinatura. Após este período, a renovação poderá ocorrer automaticamente mediante acordo entre as partes.

CLÁUSULA TERCEIRA - DO VALOR E PAGAMENTO
Pela prestação dos serviços de publicidade, a CONTRATADA pagará à CONTRATANTE o valor total de:
( ) R$ 50,00 (cinquenta reais) mensais.
( ) R$ 300,00 (trezentos reais) em parcela única.

Parágrafo Único: O pagamento será realizado através de doação via PIX para a chave: 09.735.493/0001-38 (CNPJ Frota Brasil).

CLÁUSULA QUARTA - DAS OBRIGAÇÕES DA CONTRATANTE
A CONTRATANTE compromete-se a manter o banner/logo da CONTRATADA visível em seu website durante todo o período de vigência deste contrato.

CLÁUSULA QUINTA - DO FORO
Fica eleito o foro da comarca de Miranda/MS para dirimir quaisquer dúvidas oriundas deste contrato.

E, por estarem justas e contratadas, as partes assinam o presente instrumento em 02 (duas) vias de igual teor.

Miranda/MS, ${new Date().toLocaleDateString('pt-BR')}.
        `;

        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 15, 40);

        // Signatures
        doc.text("________________________________________________", 105, 220, { align: 'center' });
        doc.text("FROTA BRASIL", 105, 225, { align: 'center' });
        doc.text("DONNER DE SOUZA", 105, 230, { align: 'center' });

        doc.text("________________________________________________", 105, 250, { align: 'center' });
        doc.text(formData.nome.toUpperCase(), 105, 255, { align: 'center' });
        doc.text(formData.contato_nome.toUpperCase(), 105, 260, { align: 'center' });

        doc.save(`Contrato_FrotaBrasil_${formData.nome.replace(/\s+/g, '_')}.pdf`);
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
                                Gerenciar <span className="text-primary">Parceiros</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Adicione, edite ou remova parceiros da associação
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Formulário */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        {editingId ? <Settings className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                                        <span>{editingId ? 'Editar Parceiro' : 'Adicionar Novo Parceiro'}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="nome">Nome da Empresa *</Label>
                                            <Input
                                                id="nome"
                                                type="text"
                                                value={formData.nome}
                                                onChange={(e) => handleInputChange('nome', e.target.value)}
                                                placeholder="Nome da empresa"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="cnpj">CNPJ</Label>
                                            <Input
                                                id="cnpj"
                                                value={formData.cnpj}
                                                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                                                placeholder="00.000.000/0000-00"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="contato_nome">Contato (Nome)</Label>
                                                <Input
                                                    id="contato_nome"
                                                    value={formData.contato_nome}
                                                    onChange={(e) => handleInputChange('contato_nome', e.target.value)}
                                                    placeholder="Nome do contato"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                                <Input
                                                    id="whatsapp"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                                                    placeholder="(00) 00000-0000"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="exibir_whatsapp"
                                                checked={formData.exibir_whatsapp}
                                                onChange={(e) => handleInputChange('exibir_whatsapp', e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <Label htmlFor="exibir_whatsapp" className="cursor-pointer font-normal">
                                                Quer o ícone do WhatsApp com acesso direto a este número?
                                            </Label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="cep">CEP</Label>
                                                <Input
                                                    id="cep"
                                                    value={formData.cep}
                                                    onChange={(e) => {
                                                        handleInputChange('cep', e.target.value);
                                                        if (e.target.value.replace(/\D/g, '').length === 8) {
                                                            searchCep(e.target.value);
                                                        }
                                                    }}
                                                    placeholder="00000-000"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="numero">Número do Imóvel</Label>
                                                <Input
                                                    id="numero"
                                                    value={formData.numero}
                                                    onChange={(e) => handleInputChange('numero', e.target.value)}
                                                    placeholder="Número"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            {addressParts.logradouro && (
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {addressParts.logradouro}, {formData.numero || 'S/N'}, {addressParts.bairro}, {addressParts.localidade} - {addressParts.uf}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="imagem">Imagem</Label>
                                            <div className="space-y-4">
                                                <Label htmlFor="file-upload" className="cursor-pointer block">
                                                    <div className="flex flex-col items-center space-y-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary/50 transition-colors">
                                                        <div className="flex items-center space-x-2">
                                                            <Upload className="h-5 w-5 text-muted-foreground" />
                                                            <span className="text-sm font-medium text-foreground">
                                                                {selectedFile ? selectedFile.name : 'Carregar uma logo ou uma imagem'}
                                                            </span>
                                                        </div>
                                                        {!selectedFile && (
                                                            <p className="text-xs text-muted-foreground text-center">
                                                                Como sugestão, caso não tenha logo, tire uma foto da frente do comércio e carregue esta imagem
                                                            </p>
                                                        )}
                                                    </div>
                                                </Label>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />

                                                {imagePreview && (
                                                    <div className="flex justify-center flex-col items-center">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-32 h-32 object-cover rounded-lg border mb-2"
                                                        />
                                                        <p className="text-xs text-muted-foreground">Pré-visualização</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="site">Site/Social</Label>
                                            <Input
                                                id="site"
                                                type="url"
                                                value={formData.site}
                                                onChange={(e) => handleInputChange('site', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="observacao">Observação</Label>
                                            <Textarea
                                                id="observacao"
                                                value={formData.observacao}
                                                onChange={(e) => handleInputChange('observacao', e.target.value)}
                                                placeholder="Notas internas..."
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                                {!isSubmitting && (editingId ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />)}
                                                {editingId ? 'Salvar Alterações' : 'Adicionar Parceiro'}
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                onClick={handleDownloadContract}
                                            >
                                                Baixar Contrato
                                            </Button>

                                            {editingId && (
                                                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                                    Cancelar
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Lista de Parceiros */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Users className="h-5 w-5" />
                                        <span>Parceiros Cadastrados</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                                        {isLoadingList ? (
                                            <div className="flex justify-center items-center h-32">
                                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            </div>
                                        ) : parceirosList.length > 0 ? (
                                            parceirosList.map((parceiro) => (
                                                <div key={parceiro.id} className={`p-4 rounded-lg border transition-colors ${editingId === parceiro.id ? 'bg-primary/5 border-primary' : 'bg-muted/20 border-transparent'}`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start space-x-3">
                                                            <img
                                                                src={parceiro.imagem}
                                                                alt={parceiro.nome}
                                                                className="w-16 h-16 object-cover rounded-lg bg-white"
                                                            />
                                                            <div>
                                                                <h4 className="font-bold text-foreground">{parceiro.nome}</h4>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">{parceiro.endereco}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col space-y-2 ml-2">
                                                            <Button size="sm" variant="outline" onClick={() => handleEdit(parceiro)} className="h-8 w-8 p-0">
                                                                <span className="sr-only">Editar</span>
                                                                <Settings className="h-4 w-4 text-primary" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleDelete(parceiro.id)} className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50">
                                                                <span className="sr-only">Excluir</span>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-muted-foreground py-8">
                                                Nenhum parceiro cadastrado ainda
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AdminParceiros;
