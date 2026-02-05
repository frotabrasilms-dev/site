import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import html2canvas from 'html2canvas';
import MembershipCard from '@/components/MembershipCard';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Shield,
  Clock,
  HelpCircle,
  Camera,
  Printer,
  Trash2,
  RefreshCw,
  Download
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Associacao = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('formulario-associacao');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    senha: '',
    confirmacaoSenha: '',
    dataNascimento: '',
    supervisor: '000',
  });
  const [isSupervisorFocused, setIsSupervisorFocused] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // Camera State
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true
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

    // Check for Secure Context
    if (!window.isSecureContext) {
      toast({
        title: "Ambiente Inseguro",
        description: "A câmera requer conexão segura (HTTPS) ou Localhost. O navegador bloqueou o acesso.",
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

      let errorMessage = "Não foi possível acessar a câmera. Verifique as permissões.";

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = "Permissão da câmera negada. Por favor, habilite o acesso nas configurações do navegador.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "Nenhuma câmera encontrada no dispositivo.";
      } else if (err.name === 'NotReadableError') {
        errorMessage = "A câmera pode estar em uso por outro aplicativo.";
      }

      toast({
        title: "Erro na câmera",
        description: errorMessage,
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

  const clearPhoto = () => {
    setPhoto(null);
    stopCamera();
  };

  const steps = [
    {
      number: 1,
      title: 'Preencha o Formulário',
      description: 'Informe seus dados pessoais e profissionais',
      icon: FileText
    },
    {
      number: 2,
      title: 'Acesso aos Benefícios',
      description: 'Comece a usar todos os serviços imediatamente',
      icon: CheckCircle
    },
    {
      number: 3,
      title: 'Viaje Tranquilo',
      description: 'Siga viagem com a segurança de quem tem apoio total na estrada',
      icon: Shield
    }
  ];

  const faqs = [
    {
      question: 'A associação é realmente gratuita para sempre?',
      answer: 'Sim, não será cobrada mensalidade. Porém a partir de 50.000 associados, será cobrado aos novos associados uma taxa de adesão.'
    },
    {
      question: 'Quais documentos preciso para me associar?',
      answer: 'Você precisa apenas do CPF e CNH válidos. Para alguns benefícios específicos, como cursos EAD, podem ser solicitados documentos adicionais.'
    },
    {
      question: 'Os benefícios estão disponíveis em todo o Brasil?',
      answer: 'Sim! Todos os nossos benefícios têm cobertura nacional. Seguros, conta bancária e cursos EAD funcionam em qualquer lugar do país.'
    },
    {
      question: 'Os cursos EAD são reconhecidos pelo Detran?',
      answer: 'Todos os nossos cursos são certificados pelo Detran/Senatran e têm validade nacional. Os certificados são aceitos em todo território brasileiro.'
    },
    {
      question: 'Posso cancelar minha associação a qualquer momento?',
      answer: 'Sim, não há fidelidade. Você pode cancelar sua associação a qualquer momento através do nosso WhatsApp ou email de suporte.'
    }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.senha || formData.senha.length !== 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter exatamente 6 números.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.senha !== formData.confirmacaoSenha) {
      toast({
        title: "Erro",
        description: "A confirmação da senha não corresponde.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    let insertData: any = {
      nome: formData.nome,
      cpf: formData.cpf.replace(/\D/g, ''),
      email: formData.email,
      telefone: formData.telefone.replace(/\D/g, ''),
      cep: formData.cep.replace(/\D/g, ''),
      logradouro: formData.logradouro,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      numero_imovel: formData.numeroImovel,
      apelido: formData.apelido || null,
      senha: formData.senha,
      data_nascimento: formData.dataNascimento || null,
      supervisor: formData.supervisor || '000',
    };

    // Upload photo if exists
    if (photo) {
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

          insertData.foto_url = publicUrlData.publicUrl;
        } else {
          console.error('Error uploading photo:', uploadError);
        }

      } catch (photoError) {
        console.error('Error processing photo:', photoError);
      }
    }

    const { error } = await supabase.from('associados').insert(insertData);

    setIsLoading(false);

    if (error) {
      console.error('Erro ao inserir associado:', error);
      toast({
        title: "Erro ao associar-se",
        description: "Não foi possível concluir sua associação. Verifique se seu CPF ou e-mail já estão cadastrados e tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cadastro OK!",
        description: "Associação realizada com sucesso. Você será redirecionado para a página inicial em 3 segundos.",
      });
      setSubmittedData(formData);
      setFormData({
        nome: '', cpf: '', email: '', telefone: '', cep: '',
        logradouro: '', bairro: '', cidade: '', numeroImovel: '', estado: '', apelido: '',
        senha: '', confirmacaoSenha: '', dataNascimento: '',
        supervisor: '000',
      });
      setTimeout(() => {
        setShowPrintModal(true);
      }, 1500);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let maskedValue = value;

    if (field === 'cpf') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (field === 'telefone') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    } else if (field === 'cep') {
      maskedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
    } else if (field === 'senha' || field === 'confirmacaoSenha') {
      maskedValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (field === 'supervisor') {
      maskedValue = value.replace(/\D/g, '').slice(0, 3);
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

  return (
    <>
      <Layout>
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-6 text-shadow">
              Associe-se Gratuitamente
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              Faça parte da Frota
            </p>

          </div>
        </section>

        {/* Processo de Associação */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Como Funciona
              </h2>
              <p className="text-xl text-muted-foreground">
                Associar-se é simples e rápido
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {steps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      {step.number}
                    </div>
                    <step.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário de Associação */}
        <section className="py-20 bg-muted/30" id="formulario-associacao">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">
                  Unir-se à Frota
                </h2>
                <p className="text-xl text-muted-foreground">
                  Preencha seus dados para começar a aproveitar os benefícios
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nome" className="text-primary font-semibold">
                          Nome Completo *
                        </Label>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.nome}
                          onChange={(e) => handleInputChange('nome', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="apelido" className="text-primary font-semibold">
                          Apelido
                        </Label>
                        <Input
                          id="apelido"
                          type="text"
                          placeholder="Seu apelido"
                          value={formData.apelido}
                          onChange={(e) => handleInputChange('apelido', e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cpf" className="text-primary font-semibold">
                          CPF *
                        </Label>
                        <Input
                          id="cpf"
                          type="text"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          required
                          className="mt-2"
                          maxLength={14}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-primary font-semibold">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com (opcional)"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="senha" className="text-primary font-semibold">
                          Senha (6 números) *
                        </Label>
                        <Input
                          id="senha"
                          type="password"
                          placeholder="123456"
                          value={formData.senha}
                          onChange={(e) => handleInputChange('senha', e.target.value)}
                          required
                          className="mt-2"
                          maxLength={6}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmacaoSenha" className="text-primary font-semibold">
                          Confirmação da Senha *
                        </Label>
                        <Input
                          id="confirmacaoSenha"
                          type="password"
                          placeholder="123456"
                          value={formData.confirmacaoSenha}
                          onChange={(e) => handleInputChange('confirmacaoSenha', e.target.value)}
                          required
                          className="mt-2"
                          maxLength={6}
                        />
                      </div>

                      <div>
                        <Label htmlFor="dataNascimento" className="text-primary font-semibold">
                          Data de Nascimento
                        </Label>
                        <Input
                          id="dataNascimento"
                          type="date"
                          value={formData.dataNascimento}
                          onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="telefone" className="text-primary font-semibold">
                          Telefone/WhatsApp *
                        </Label>
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          required
                          className="mt-2"
                          maxLength={15}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cep" className="text-primary font-semibold">
                          CEP *
                        </Label>
                        <Input
                          id="cep"
                          type="text"
                          placeholder="00000-000"
                          value={formData.cep}
                          onChange={(e) => handleInputChange('cep', e.target.value)}
                          onBlur={(e) => handleCepBlur(e.target.value.replace(/\D/g, ''))}
                          required
                          className="mt-2"
                          maxLength={9}
                        />
                      </div>

                      <div>
                        <Label htmlFor="logradouro" className="text-primary font-semibold">
                          Endereço
                        </Label>
                        <Input
                          id="logradouro"
                          type="text"
                          placeholder="Endereço"
                          value={formData.logradouro}
                          disabled
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bairro" className="text-primary font-semibold">
                          Bairro
                        </Label>
                        <Input
                          id="bairro"
                          type="text"
                          placeholder="Bairro"
                          value={formData.bairro}
                          disabled
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cidade" className="text-primary font-semibold">
                          Cidade
                        </Label>
                        <Input
                          id="cidade"
                          type="text"
                          placeholder="Cidade"
                          value={formData.cidade}
                          disabled
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="numeroImovel" className="text-primary font-semibold">
                          Número do Imóvel *
                        </Label>
                        <Input
                          id="numeroImovel"
                          type="text"
                          placeholder="123"
                          value={formData.numeroImovel}
                          onChange={(e) => handleInputChange('numeroImovel', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="estado" className="text-primary font-semibold">
                          Estado *
                        </Label>
                        <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione seu estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="relative">
                        <Label htmlFor="supervisor" className="text-primary font-semibold">
                          Supervisor
                        </Label>
                        <Input
                          id="supervisor"
                          type="text"
                          placeholder="000"
                          value={formData.supervisor}
                          onChange={(e) => handleInputChange('supervisor', e.target.value)}
                          onFocus={() => setIsSupervisorFocused(true)}
                          onBlur={() => setIsSupervisorFocused(false)}
                          className="mt-2"
                          maxLength={3}
                        />
                        {isSupervisorFocused && (
                          <div className="absolute z-10 bottom-full left-0 mb-2 bg-primary text-primary-foreground text-sm p-3 rounded-md shadow-lg animate-in fade-in zoom-in duration-200 w-full">
                            Se você foi convidado por um supervisor, por favor coloque o número dele.
                            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-primary transform rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Photo Capture Section */}
                    <div className="space-y-4 border-t pt-4 mt-2">
                      <Label className="text-primary font-semibold text-lg flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Foto para Identificação
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Essa foto será usada na sua carteirinha de associado. Procure um local iluminado.
                      </p>

                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[300px]">
                        {isCameraOpen ? (
                          <div className="relative w-full max-w-md">
                            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md mb-4 bg-black" />
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="flex justify-center gap-4">
                              <Button type="button" onClick={takePhoto} className="bg-green-600 hover:bg-green-700">
                                <Camera className="mr-2 h-4 w-4" /> Tirar Foto
                              </Button>
                              <Button type="button" variant="destructive" onClick={stopCamera}>
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : photo ? (
                          <div className="flex flex-col items-center">
                            <img src={photo} alt="Captured" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4 border border-gray-200" />
                            <div className="flex gap-4">
                              <Button type="button" variant="outline" onClick={retakePhoto}>
                                <RefreshCw className="mr-2 h-4 w-4" /> Tirar Outra
                              </Button>
                              <Button type="button" variant="destructive" onClick={clearPhoto}>
                                <Trash2 className="mr-2 h-4 w-4" /> Remover
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <User className="h-12 w-12 text-gray-400" />
                            </div>
                            <Button type="button" onClick={startCamera} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                              <Camera className="mr-2 h-4 w-4" /> Abrir Câmera
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4 w-full lg:w-auto justify-center lg:justify-start">
                          <Shield className="h-8 w-8 text-secondary" />
                          <div className="text-left">
                            <p className="font-semibold text-primary">Seus dados estão seguros</p>
                            <p className="text-sm text-muted-foreground">Política LGPD compliant</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            defaultChecked
                            className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-600 accent-green-600 cursor-pointer shadow-sm"
                          />
                          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer font-medium">
                            Li e concordo com os termos e condições do site
                          </label>
                        </div>

                        <Button type="submit" className="btn-accent px-8 py-3 font-bold w-full lg:w-auto" disabled={isLoading}>
                          {isLoading ? 'Enviando...' : 'Associar-se Agora'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" id="faq">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xl text-muted-foreground">
                Tire suas dúvidas sobre a associação
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                      <div className="flex items-center space-x-4">
                        <HelpCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-semibold text-primary">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed ml-9">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Suporte WhatsApp */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto bg-secondary text-secondary-foreground">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">
                  Precisa de Ajuda?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Nossa equipe está disponível no WhatsApp para tirar suas dúvidas
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-secondary hover:bg-white/90 px-6 py-3">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chamar no WhatsApp
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3">
                    <Clock className="mr-2 h-4 w-4" />
                    Horário: 8h às 18h
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-green-700">
              <CheckCircle className="w-8 h-8" />
              Cadastro Realizado Comp Sucesso!
            </DialogTitle>
            <DialogDescription className="text-lg pt-2">
              Bem-vindo à família Frota Brasil! Aqui está sua carteirinha oficial.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
            <div className="transform scale-75 sm:scale-90 md:scale-100 transition-transform origin-center">
              <MembershipCard
                ref={cardRef}
                name={submittedData?.nome || formData.nome}
                cpf={submittedData?.cpf || formData.cpf}
                city={submittedData?.cidade || formData.cidade}
                state={submittedData?.estado || formData.estado}
                date={new Date().toLocaleDateString('pt-BR')}
                photoUrl={photo}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-center">
            <Button variant="outline" onClick={() => { setShowPrintModal(false); navigate('/'); }} className="w-full sm:w-auto">
              Fechar
            </Button>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={handleDownloadCard}>
              <Download className="mr-2 h-4 w-4" />
              Baixar Carteirinha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Associacao;
