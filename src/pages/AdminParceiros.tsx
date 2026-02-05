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

const AdminParceiros = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [parceirosList, setParceirosList] = useState<Parceiro[]>([]);
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        imagem: '',
        endereco: '',
        site: '',
        observacao: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // State for Editing
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchParceiros = async () => {
        setIsLoadingList(true);
        const data = await getParceiros();
        setParceirosList(data);
        setIsLoadingList(false);
    };

    useEffect(() => {
        fetchParceiros();
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
            imagem: parceiro.imagem,
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
        setFormData({ nome: '', imagem: '', endereco: '', site: '', observacao: '' });
        setSelectedFile(null);
        setImagePreview(null);
    };

    const handleDelete = async (id: string) => {
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
                description: "O campo 'Nome do Parceiro' é obrigatório.",
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

            if (editingId) {
                // Update existing
                const { error } = await supabase
                    .from('parceiros')
                    .update({
                        nome: formData.nome,
                        imagem: imageUrl,
                        endereco: formData.endereco || null,
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
                    imagem: imageUrl,
                    endereco: formData.endereco || null,
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
                                            <Label htmlFor="nome">Nome do Parceiro *</Label>
                                            <Input
                                                id="nome"
                                                type="text"
                                                value={formData.nome}
                                                onChange={(e) => handleInputChange('nome', e.target.value)}
                                                placeholder="Nome do parceiro"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="imagem">Imagem (Upload ou URL)</Label>
                                            <div className="space-y-4">
                                                <Label htmlFor="file-upload" className="cursor-pointer block">
                                                    <div className="flex items-center space-x-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary/50 transition-colors">
                                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {selectedFile ? selectedFile.name : 'Clique para selecionar nova imagem'}
                                                        </span>
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

                                                <div className="text-sm text-muted-foreground">Ou URL:</div>
                                                <Input
                                                    id="imagem"
                                                    type="url"
                                                    value={formData.imagem || ''}
                                                    onChange={(e) => handleInputChange('imagem', e.target.value)}
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="endereco">Endereço</Label>
                                            <Textarea
                                                id="endereco"
                                                value={formData.endereco}
                                                onChange={(e) => handleInputChange('endereco', e.target.value)}
                                                placeholder="Endereço completo"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="site">Site</Label>
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

                                            {editingId && (
                                                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                                    Cancelar
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Lista */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Users className="h-5 w-5" />
                                        <span>Parceiros Cadastrados ({parceirosList.length})</span>
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
