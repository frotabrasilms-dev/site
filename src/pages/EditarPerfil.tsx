import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import html2canvas from 'html2canvas';
import MembershipCard from '@/components/MembershipCard';
import { useToast } from '@/hooks/use-toast';
import {
    User,
    Camera,
    Download,
    Save,
    RefreshCw,
    ArrowLeft
} from 'lucide-react';

const EditarPerfil = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        numeroImovel: '',
        estado: '',
        apelido: '',
        dataNascimento: '',
        numeroAssociado: '',
        fotoUrl: '' as string | null
    });

    // Camera State
    const [photo, setPhoto] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userCpf = localStorage.getItem('user_cpf');
            if (!userCpf) {
                toast({
                    title: "Erro de Autenticação",
                    description: "CPF não encontrado. Faça login novamente.",
                    variant: "destructive"
                });
                navigate('/login');
                return;
            }

            setIsLoading(true);
            const cleanCpf = userCpf.replace(/\D/g, '');

            const { data, error } = await supabase
                .from('associados')
                .select('*')
                .eq('cpf', cleanCpf)
                .single();

            if (error || !data) {
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados do associado.",
                    variant: "destructive"
                });
                navigate('/login');
            } else {
                const userData = data as any;
                setFormData({
                    nome: userData.nome,
                    cpf: userData.cpf,
                    email: userData.email,
                    telefone: userData.telefone || '',
                    cep: userData.cep || '',
                    logradouro: userData.logradouro || '',
                    bairro: userData.bairro || '',
                    cidade: userData.cidade || '',
                    numeroImovel: userData.numero_imovel || '',
                    estado: userData.estado || '',
                    apelido: userData.apelido || '',
                    dataNascimento: userData.data_nascimento || '',
                    numeroAssociado: userData.numero_associado || '',
                    fotoUrl: userData.foto_url
                });
                if (userData.foto_url) {
                    setPhoto(userData.foto_url);
                }
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [navigate, toast]);

    const handleDownloadCard = async () => {
        if (cardRef.current) {
            try {
                // Ensure the card is captured at full size
                const canvas = await html2canvas(cardRef.current, {
                    scale: 2, // High quality
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    // Fix for clipping: Reset transform on the cloned element
                    onclone: (documentClone) => {
                        const element = documentClone.querySelector('.membership-card-container');
                        if (element) {
                            (element as HTMLElement).style.transform = 'none';
                            (element as HTMLElement).style.margin = '0';
                        }
                    }
                } as any);
                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `Carteirinha-FrotaBrasil-${formData.nome || 'Associado'}.png`;
                link.click();

                toast({
                    title: "Sucesso!",
                    description: "Carteirinha salva nos downloads.",
                });
            } catch (error) {
                console.error("Erro ao gerar carteirinha:", error);
                toast({
                    title: "Erro",
                    description: "Não foi possível gerar a imagem da carteirinha.",
                    variant: "destructive"
                });
            }
        }
    };

    const startCamera = async () => {
        setIsCameraOpen(true);
        if (!window.isSecureContext) {
            toast({
                title: "Ambiente Inseguro",
                description: "A câmera requer conexão segura (HTTPS) ou Localhost.",
                variant: "destructive"
            });
            setIsCameraOpen(false);
            return;
        }

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("API de câmera não suportada ou bloqueada.");
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err: any) {
            console.error("Error accessing camera:", err);
            toast({
                title: "Erro na câmera",
                description: "Não foi possível acessar a câmera.",
                variant: "destructive"
            });
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        setIsCameraOpen(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvasRef.current.toDataURL('image/jpeg');
                setPhoto(dataUrl);
                stopCamera();
            }
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
        startCamera();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                setPhoto(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        let maskedValue = value;

        if (field === 'telefone') {
            maskedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        } else if (field === 'cep') {
            maskedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
        }

        setFormData(prev => ({
            ...prev,
            [field]: maskedValue
        }));
    };

    const handleCepBlur = async (cep: string) => {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        let updateData: any = {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone.replace(/\D/g, ''),
            cep: formData.cep.replace(/\D/g, ''),
            logradouro: formData.logradouro,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            numero_imovel: formData.numeroImovel,
            apelido: formData.apelido || null,
            data_nascimento: formData.dataNascimento || null,
        };

        // Upload photo if changed/new
        if (photo && photo !== formData.fotoUrl) {
            try {
                const response = await fetch(photo);
                const blob = await response.blob();
                const cleanCpf = formData.cpf.replace(/\D/g, '');
                const fileName = `${cleanCpf}.jpg`;

                const { error: uploadError } = await supabase.storage
                    .from('member-photos')
                    .upload(fileName, blob, {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (!uploadError) {
                    const { data: publicUrlData } = supabase.storage
                        .from('member-photos')
                        .getPublicUrl(fileName);

                    updateData.foto_url = publicUrlData.publicUrl;
                } else {
                    console.error('Error uploading photo:', uploadError);
                }

            } catch (photoError) {
                console.error('Error processing photo:', photoError);
            }
        } else if (!photo) {
            updateData.foto_url = null;
        }

        const cleanCpf = formData.cpf.replace(/\D/g, '');

        const { error } = await supabase
            .from('associados')
            .update(updateData)
            .eq('cpf', cleanCpf);

        setIsLoading(false);

        if (error) {
            console.error('Erro ao atualizar associado:', error);
            toast({
                title: "Erro ao atualizar",
                description: "Não foi possível salvar as alterações.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Sucesso!",
                description: "Dados atualizados com sucesso.",
            });
            if (updateData.foto_url) {
                setFormData(prev => ({ ...prev, fotoUrl: updateData.foto_url }));
            }
        }
    };

    return (
        <Layout>
            <section className="py-10 hero-gradient text-white">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold mb-4 text-shadow">
                        Editar Perfil
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Mantenha seus dados atualizados e acesse sua carteirinha
                    </p>
                </div>
            </section>

            <section className="py-10 bg-muted/30">
                <div className="container-custom">
                    <div className="mb-6">
                        <Button variant="outline" onClick={() => navigate('/ferramentas')}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Ferramentas
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Section */}
                        <Card>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-4 border-b pb-4">
                                        <Label className="text-primary font-semibold text-lg flex items-center gap-2">
                                            <Camera className="w-5 h-5" />
                                            Foto de Perfil
                                        </Label>
                                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                            {isCameraOpen ? (
                                                <div className="relative w-full max-w-xs">
                                                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md mb-4 bg-black" />
                                                    <canvas ref={canvasRef} className="hidden" />
                                                    <div className="flex justify-center gap-2">
                                                        <Button type="button" size="sm" onClick={takePhoto} className="bg-green-600 hover:bg-green-700">
                                                            <Camera className="mr-2 h-4 w-4" /> Capturar
                                                        </Button>
                                                        <Button type="button" size="sm" variant="destructive" onClick={stopCamera}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : photo ? (
                                                <div className="flex flex-col items-center">
                                                    <img src={photo} alt="Profile" className="w-32 h-32 object-cover rounded-full shadow-md mb-4 border border-gray-200" />
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />
                                                        <Button type="button" size="sm" variant="outline" onClick={retakePhoto}>
                                                            <RefreshCw className="mr-2 h-4 w-4" /> Camera
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Download className="mr-2 h-4 w-4" /> Galeria
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <User className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />
                                                        <Button type="button" onClick={startCamera} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                                            <Camera className="mr-2 h-4 w-4" /> Tirar Foto
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Download className="mr-2 h-4 w-4" /> Carregar Imagem
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="nome">Nome Completo</Label>
                                        <Input id="nome" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="apelido">Apelido</Label>
                                        <Input id="apelido" value={formData.apelido} onChange={(e) => handleInputChange('apelido', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="cpf">CPF (Não editável)</Label>
                                        <Input id="cpf" value={formData.cpf} disabled className="bg-gray-100" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input id="telefone" value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} required maxLength={15} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="cep">CEP</Label>
                                            <Input id="cep" value={formData.cep} onChange={(e) => handleInputChange('cep', e.target.value)} onBlur={(e) => handleCepBlur(e.target.value)} required maxLength={9} />
                                        </div>
                                        <div>
                                            <Label htmlFor="numeroImovel">Número</Label>
                                            <Input id="numeroImovel" value={formData.numeroImovel} onChange={(e) => handleInputChange('numeroImovel', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input id="logradouro" value={formData.logradouro} onChange={(e) => handleInputChange('logradouro', e.target.value)} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="bairro">Bairro</Label>
                                            <Input id="bairro" value={formData.bairro} onChange={(e) => handleInputChange('bairro', e.target.value)} required />
                                        </div>
                                        <div>
                                            <Label htmlFor="cidade">Cidade</Label>
                                            <Input id="cidade" value={formData.cidade} onChange={(e) => handleInputChange('cidade', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="estado">Estado</Label>
                                        <Input id="estado" value={formData.estado} onChange={(e) => handleInputChange('estado', e.target.value)} required />
                                    </div>


                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                                        {isLoading ? 'Salvando...' : 'Salvar Alterações'} <Save className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Card Preview Section */}
                        <div className="flex flex-col gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Sua Carteirinha Digital
                                    </h3>
                                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                        <div className="transform scale-[0.6] sm:scale-75 xl:scale-90 transition-transform origin-center membership-card-container">
                                            <MembershipCard
                                                ref={cardRef}
                                                name={formData.nome}
                                                cpf={formData.cpf}
                                                city={formData.cidade}
                                                state={formData.estado}
                                                date={new Date().toLocaleDateString('pt-BR')}
                                                photoUrl={photo}
                                                memberNumber={formData.numeroAssociado || '000000'}
                                                apelido={formData.apelido}
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={handleDownloadCard}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Baixar Carteirinha Atualizada
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EditarPerfil;
