import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  Loader2
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const Index = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <a href="https://www.youtube.com/watch?v=WwRHeVqGizM" target="_blank" rel="noopener noreferrer" className="block w-full max-w-2xl transform hover:scale-105 transition-transform duration-300">
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
            <a href="https://bdmdigital.com.br/home" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full md:w-auto flex justify-center">
              <img
                src="/BD4.png"
                alt="BDM Digital"
                className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
              />
            </a>

            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <a href="https://wa.me/5521993151536" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full flex justify-center">
                <img
                  src="/ademicon-logo.jpg"
                  alt="Ademicon"
                  className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
                />
              </a>
              <a
                href="https://www.instagram.com/eusoululu.consorcio?igsh=aWRtOXh5cG12b2Yw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-md hover:scale-110 transition-all flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <a href="https://wa.me/5581995285134" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform w-full flex justify-center">
                <img
                  src="/nortia-logo.jpg"
                  alt="Nortia Seguro e Proteção Ltda"
                  className="w-full max-w-xs md:w-48 h-auto rounded-md shadow-md"
                />
              </a>
              <a
                href="https://www.instagram.com/heitor_caldas?igsh=MXVuZm1xOTV1OXRnZg=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-md hover:scale-110 transition-all flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
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

            <div className="mt-12 flex flex-col items-center">
              <img
                src="/bandeira-ms.jpg"
                alt="Bandeira do Mato Grosso do Sul"
                className="w-full max-w-md rounded-lg shadow-md mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-700 font-primary uppercase">
                Apoiadores Estaduais
              </h3>
              <div className="flex flex-col items-center gap-8 mt-6 text-lg font-medium text-gray-600 w-full">
                <div className="flex flex-col items-center w-full">
                  <span className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4 text-xl font-bold">Campo Grande</span>
                  <a href="https://www.instagram.com/petrasolucoesemsaude/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                    <img src="/petra-logo.jpg" alt="Petra Soluções" className="h-64 w-auto rounded-lg shadow-sm" />
                  </a>
                </div>
                <div className="flex flex-col items-center w-full">
                  <span className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4 text-xl font-bold">Dourados</span>
                  <a href="https://engecomms.com.br/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                    <img src="/engecom-ms.jpg" alt="Engecom" className="h-64 w-auto rounded-lg shadow-sm" />
                  </a>
                </div>
                <span className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-xl font-bold w-fit">Três Lagoas</span>
                <span className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-xl font-bold w-fit">Corumbá</span>
                <span className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-xl font-bold w-fit">Ponta Porã</span>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Projeto EFB */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom text-center">
          <img
            src="/projeto-efb-updated.png"
            alt="O que é o Projeto EFB"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl mb-8"
          />
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-10 bg-white">
        <div className="container-custom">
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
    </Layout >
  );
};

export default Index;