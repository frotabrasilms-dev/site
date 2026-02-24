import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Stethoscope,
  CreditCard,
  Scale,
  GraduationCap,
  Shield,
  Truck,
  Star,
  Quote,
  Calendar,
  TrendingUp,
  Building,
  X,
  Instagram,
  Loader2,
  Calculator,
  BookOpen,
  School,
  Pill,
  ShoppingCart,
  Package,
  MessageCircle
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import StateFlagsCarousel, { brazilianStates } from '@/components/StateFlagsCarousel';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isCamposModalOpen, setIsCamposModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBenefitClick = (whatsappNumber: string) => {
    const userCpf = localStorage.getItem('user_cpf');
    if (!userCpf) {
      toast({
        title: "Acesso Restrito",
        description: "Faça login para acessar este benefício.",
        variant: "destructive",
      });
      navigate('/login');
    } else {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScaIqhwZX8mhS197TQ8iPQ8eAphtE0WVYJSabnVg4PrEcRMuA/formResponse";
    const data = new FormData();
    data.append("entry.1648460388", formData.name);
    data.append("entry.27630816", formData.company);
    data.append("entry.531479692", formData.phone);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: data
      });
      alert("Dados enviados com sucesso!");
      setIsModalOpen(false);
      setFormData({ name: '', company: '', phone: '' });
    } catch (error) {
      alert("Erro ao enviar dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };





  const recentNews = [
    {
      title: 'Moeda Digital BDM cresce mais de 100%',
      date: '13 / 01 / 2026',
      summary: 'em negociações no ano de 2025'
    },
    {
      title: 'Curso de MOPP com 90% de aprovação',
      date: '07 / 01 / 2026',
      summary: 'Nosso programa de capacitação continua formando profissionais...'
    },
    {
      title: 'Ademicon recebe homenagem da Associação Frota Brasil',
      date: '15 / 01 / 2026',
      summary: 'por ótimo serviços prestados, serviços de segurados supera expectativa.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Movimento Nacional */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <img
            src="/peter-new.jpg"
            alt="Movimento Nacional"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl mb-6"
          />
          <h2 className="text-3xl font-bold text-primary uppercase tracking-wide mb-6">
            Em Movimento Nacional
          </h2>
          <div className="flex justify-center mb-8">
            <a href="https://www.youtube.com/shorts/1CgQbxnVyDM" target="_blank" rel="noopener noreferrer" className="block w-full max-w-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/vovo-caminhoneiro-new.png"
                alt="Vovô Caminhoneiro - Delegado Nacional"
                className="w-full rounded-lg shadow-xl border-4 border-white"
              />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 items-start sm:items-start">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <Link to="/associacao" className="w-full sm:w-auto">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition-all w-full sm:w-auto min-w-[200px]">
                  Associar-se
                </button>
              </Link>
              <div className="mt-2 bg-blue-100 text-primary border border-blue-200 px-3 py-1 rounded-md text-sm font-bold shadow-sm animate-pulse">
                ISENTO DE MENSALIDADE
              </div>
            </div>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition-all w-full sm:w-auto min-w-[200px]"
            >
              Contribuições de apoio
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="/bandeira.jpg"
              alt="Bandeira do Brasil"
              className="w-full max-w-2xl rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>



      {/* Super Parceiros */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Apoiadores Nacionais
            </h2>

          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
            <a href="https://www.dakila.com.br/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/dkl.jpg"
                alt="Dakila"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
            <a href="https://bdmbank.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/BD111.png"
                alt="BDM Bank"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
            <a href="https://www.instagram.com/grupoeadtran/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/eadetran.jpeg"
                alt="EADTRAN Cursos de Trânsito"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
            <a href="https://bdmdigital.com.br/home" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/BD4.png"
                alt="BDM Digital"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
            <a href="https://wa.me/5565996380209" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/CASA.png"
                alt="Casa Grande Assistência e Locação de Máquinas"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>

            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <a href="https://www.instagram.com/eusoululu.consorcio?igsh=aWRtOXh5cG12b2Yw" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full flex justify-center">
                <img
                  src="/ademicon-logo.jpg"
                  alt="Ademicon"
                  className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
                />
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <a href="https://www.instagram.com/heitor_caldas?igsh=MXVuZm1xOTV1OXRnZg==" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full flex justify-center">
                <img
                  src="/nortia-logo.jpg"
                  alt="Nortia Seguro e Proteção Ltda"
                  className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 mt-8 md:mt-8">
            <a href="https://www.instagram.com/lopes.andersonluiz?igsh=MXg5cTYxcThiMzAxNQ%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/SAO MIGUEL.jpeg"
                alt="São Miguel Arcanjo Transportes"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
            <a href="https://camposecaldas.adv.br/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/campos.png"
                alt="Campos e Caldas Advocacia"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 font-primary text-center">
              Trabalhando por pessoas
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-xl flex items-center transition-colors shadow-lg cursor-pointer"
            >
              <Truck className="mr-3 h-8 w-8" />
              Seja um apoiador
            </button>

            <div className="mt-12 flex flex-col items-center w-full">
              <h3 className="text-2xl font-bold text-gray-700 font-primary uppercase mb-8">
                Apoiadores Estaduais
              </h3>

              <div className="w-full">
                <StateFlagsCarousel />
              </div>


            </div>

            <div className="w-full mt-16 max-w-6xl animate-in slide-in-from-bottom duration-700 delay-300">
              <h3 className="text-2xl font-bold text-gray-700 font-primary uppercase text-center mb-8">
                Presente em Todo o Brasil
              </h3>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    { name: 'Acre', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bandeira_do_Acre.svg' },
                    { name: 'Alagoas', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bandeira_de_Alagoas.svg' },
                    { name: 'Amapá', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amap%C3%A1.svg' },
                    { name: 'Amazonas', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Amazonas.svg' },
                    { name: 'Bahia', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg' },
                    { name: 'Ceará', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Cear%C3%A1.svg' },
                    { name: 'Distrito Federal', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg' },
                    { name: 'Espírito Santo', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg' },
                    { name: 'Goiás', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_Goi%C3%A1s.svg' },
                    { name: 'Maranhão', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Bandeira_do_Maranh%C3%A3o.svg' },
                    { name: 'Mato Grosso', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Bandeira_de_Mato_Grosso.svg' },
                    { name: 'Mato Grosso do Sul', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg' },
                    { name: 'Minas Gerais', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg' },
                    { name: 'Pará', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg' },
                    { name: 'Paraíba', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bandeira_da_Para%C3%ADba.svg' },
                    { name: 'Paraná', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paran%C3%A1.svg' },
                    { name: 'Pernambuco', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg' },
                    { name: 'Piauí', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Bandeira_do_Piau%C3%AD.svg' },
                    { name: 'Rio de Janeiro', flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg' },
                    { name: 'Rio Grande do Norte', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Bandeira_do_Rio_Grande_do_Norte.svg' },
                    { name: 'Rio Grande do Sul', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg' },
                    { name: 'Rondônia', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bandeira_de_Rond%C3%B4nia.svg' },
                    { name: 'Roraima', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bandeira_de_Roraima.svg' },
                    { name: 'Santa Catarina', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandeira_de_Santa_Catarina.svg' },
                    { name: 'São Paulo', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg' },
                    { name: 'Sergipe', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Sergipe.svg' },
                    { name: 'Tocantins', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandeira_do_Tocantins.svg' }
                  ].map((state, index) => (
                    <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-4">
                      <div className="p-1 h-full">
                        <div className="flex flex-col items-center justify-center p-4 h-32 bg-white rounded-lg hover:shadow-md transition-shadow">
                          <div className="h-16 w-full flex items-center justify-center mb-2">
                            <img
                              src={state.flag}
                              alt={`Bandeira de ${state.name}`}
                              className="max-h-full max-w-full object-contain shadow-sm"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[10px] sm:text-xs font-medium text-center text-muted-foreground leading-tight">{state.name}</span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>





      {/* Benefícios Especiais */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-primary uppercase leading-tight">
              Contratações diretas com benefícios exclusivos do associado EFB<span className="text-lg font-normal ml-2">empresários frota Brasil</span>
            </h2>
            <img
              src="/bandeira.jpg"
              alt="Bandeira do Brasil"
              className="w-12 h-auto rounded shadow-sm"
            />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* EADTRAN - Cursos de Trânsito */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('5541999838006')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="mb-6 h-32 flex items-center justify-center">
                      <img
                        src="/eadetran.jpeg"
                        alt="EADTRAN Cursos de Trânsito"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 uppercase">
                      Cursos de Trânsito
                    </h3>
                    <p className="text-gray-600">
                      Capacitação especializada EAD com condições exclusivas para associados.
                    </p>
                  </div>
                </CarouselItem>





                {/* Seguros de Vida - Nortia */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('558195285134')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="mb-6 h-32 flex items-center justify-center">
                      <img
                        src="/nortia-logo.jpg"
                        alt="Nortia Seguros"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-blue-700 mb-3 uppercase">
                      Seguros de Vida
                    </h3>
                    <p className="text-gray-600">
                      Proteção completa para você e sua família com condições exclusivas.
                    </p>
                  </div>
                </CarouselItem>

                {/* Consórcios e Carta de Crédito - Ademicon */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('5521993151536')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="mb-6 h-32 flex items-center justify-center">
                      <img
                        src="/ademicon-logo.jpg"
                        alt="Ademicon"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-red-700 mb-3 uppercase">
                      Consórcios e Carta de Crédito
                    </h3>
                    <p className="text-gray-600">
                      Planeje suas conquistas com as melhores taxas do mercado.
                    </p>
                  </div>
                </CarouselItem>

                {/* Campos e Caldas - Orientação Advocatícia */}
                <CarouselItem className="basis-full">
                  <div onClick={() => setIsCamposModalOpen(true)} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="mb-6 h-32 flex items-center justify-center">
                      <img
                        src="/campos.png"
                        alt="Campos e Caldas Advocacia"
                        className="h-full w-auto object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 uppercase">
                      Orientação Jurídica
                    </h3>
                    <p className="text-gray-600">
                      Contratação anual com condições especiais para associados.
                    </p>
                  </div>
                </CarouselItem>

                {/* Cursos */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-orange-100 p-4 rounded-full mb-6">
                      <GraduationCap className="h-12 w-12 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-700 mb-3 uppercase">
                      Cursos
                    </h3>
                    <p className="text-gray-600">
                      Capacitação profissional e treinamentos para impulsionar sua carreira.
                    </p>
                  </div>
                </CarouselItem>

                {/* Plano de Saúde */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-green-100 p-4 rounded-full mb-6">
                      <Stethoscope className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700 mb-3 uppercase">
                      Plano de Saúde
                    </h3>
                    <p className="text-gray-600">
                      Cuidado integral com a sua saúde e bem-estar.
                    </p>
                  </div>
                </CarouselItem>

                {/* Orientação Contábil */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-amber-100 p-4 rounded-full mb-6">
                      <Calculator className="h-12 w-12 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-700 mb-3 uppercase">
                      Orientação Contábil
                    </h3>
                    <p className="text-gray-600">
                      Suporte especializado para questões fiscais e contábeis.
                    </p>
                  </div>
                </CarouselItem>

                {/* Cursos Profissionalizantes */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-orange-100 p-4 rounded-full mb-6">
                      <BookOpen className="h-12 w-12 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-700 mb-3 uppercase">
                      Cursos Profissionalizantes
                    </h3>
                    <p className="text-gray-600">
                      Capacitação profissional para impulsionar sua carreira.
                    </p>
                  </div>
                </CarouselItem>

                {/* Faculdade */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-indigo-100 p-4 rounded-full mb-6">
                      <School className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-700 mb-3 uppercase">
                      Faculdade
                    </h3>
                    <p className="text-gray-600">
                      Parcerias educacionais para graduação e pós-graduação.
                    </p>
                  </div>
                </CarouselItem>

                {/* Farmácia */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-red-100 p-4 rounded-full mb-6">
                      <Pill className="h-12 w-12 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-700 mb-3 uppercase">
                      Farmácia
                    </h3>
                    <p className="text-gray-600">
                      Descontos em medicamentos e produtos de saúde.
                    </p>
                  </div>
                </CarouselItem>

                {/* Supermercado */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-green-100 p-4 rounded-full mb-6">
                      <ShoppingCart className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700 mb-3 uppercase">
                      Supermercado
                    </h3>
                    <p className="text-gray-600">
                      Benefícios exclusivos para compras no dia a dia.
                    </p>
                  </div>
                </CarouselItem>

                {/* Atacado */}
                <CarouselItem className="basis-full">
                  <div onClick={() => handleBenefitClick('556733333333')} className="cursor-pointer h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300 mx-auto max-w-md">
                    <div className="bg-cyan-100 p-4 rounded-full mb-6">
                      <Package className="h-12 w-12 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-700 mb-3 uppercase">
                      Atacado
                    </h3>
                    <p className="text-gray-600">
                      Condições especiais para compras em grande quantidade.
                    </p>
                  </div>
                </CarouselItem>

              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-12" />
              <CarouselNext className="-right-4 md:-right-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Carousel Section - Organização e Projetos */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-primary uppercase mb-8">
            Organização e Projetos
          </h2>
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {[
                "/projeto-efb-updated.png",
                "/carousel-mapa-brasil.png",
                "/carousel-mapa-brasil-centro.jpg",
                "/carousel-mapa-ms.jpg",
                "/carousel-organograma-new.png",
                "/carousel-logo.jpg"
              ].map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 flex justify-center w-full h-[500px] bg-white rounded-lg items-center">
                    <img src={img} className="w-full h-full object-contain rounded-lg shadow-md" alt={`Slide ${index + 1}`} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center text-primary">Seja um Apoiador</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone WhatsApp</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors flex justify-center items-center mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Doações */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsDonationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">Contribuição de apoio</h3>
              <p className="text-gray-600 mb-6 font-medium">Ajude-nos a ajudar, contribua com qualquer valor.</p>

              <div className="bg-gray-100 p-4 rounded-lg mb-6 break-all border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Chave PIX (E-mail)</p>
                <p className="text-lg font-bold text-primary select-all">afbcora@gmail.com</p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText("afbcora@gmail.com")
                    .then(() => {
                      toast({
                        title: "Chave PIX copiada!",
                        description: "O e-mail foi copiado para sua área de transferência.",
                        duration: 3000,
                      });
                    })
                    .catch(() => {
                      toast({
                        title: "Erro ao copiar",
                        description: "Não foi possível copiar automaticamente. Por favor, tente selecionar e copiar manualmente.",
                        variant: "destructive",
                      });
                    });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors shadow-md active:scale-95 transform duration-150"
              >
                Copiar Chave PIX
              </button>
            </div>
          </div>
        </div>
      )
      }

      {/* Modal Campos e Caldas */}
      {isCamposModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsCamposModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">Contratação de Orientação Jurídica</h3>
              <p className="text-xl font-bold text-primary mb-2">Anual R$ 260,00</p>

              <div className="bg-gray-100 p-4 rounded-lg mb-6 mt-6 break-all border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Chave PIX</p>
                <p className="text-lg font-bold text-primary select-all">09735493438</p>
              </div>

              <Button
                onClick={() => {
                  navigator.clipboard.writeText("09735493438");
                  toast({
                    title: "Chave PIX copiada!",
                    description: "A chave PIX foi copiada para sua área de transferência.",
                  });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors shadow-md transform duration-150 mb-3"
              >
                Copiar Chave PIX
              </Button>

              <a
                href="https://wa.me/5567984678018"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition-colors shadow-md transform duration-150 flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar Comprovante
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout >
  );
};

export default Index;