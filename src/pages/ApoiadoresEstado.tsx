import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { brazilianStates } from "@/components/StateFlagsCarousel";
import { ArrowLeft, MapPin, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApoiadoresEstado = () => {
    const { uf } = useParams<{ uf: string }>();
    const state = brazilianStates.find(s => s.uf === uf) || { name: 'Estado', uf: '', capital: '', flag: '' };

    useEffect(() => {
        // Scroll to show part of the flag and the supporters list
        window.scrollTo({
            top: 200, // Adjust this value to show the desired amount of the header/flag
            behavior: 'smooth'
        });
    }, [uf]);

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20">
                <section className="pt-32 pb-12 bg-white shadow-sm">
                    <div className="container-custom text-center">
                        <div className="mb-8 flex justify-start">
                            <Link to="/">
                                <Button variant="ghost" className="flex items-center text-muted-foreground hover:text-primary">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para Início
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                            {state.flag && (
                                <img
                                    src={state.flag}
                                    alt={`Bandeira de ${state.name}`}
                                    className="h-24 md:h-32 w-auto object-contain drop-shadow-md mb-6"
                                />
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-primary">
                                Apoiadores em {state.name}
                            </h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-5 w-5" />
                                <span className="text-lg">Unidade Federativa: {uf}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                            {/* EADTRAN - Capital Supporter (Every State) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
                                    {state.capital} (Capital)
                                </span>
                                <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                    <div className="block w-full h-full relative cursor-pointer" onClick={() => window.open('https://www.instagram.com/grupoeadtran/', '_blank')}>
                                        <img
                                            src="/eadetran.jpeg"
                                            alt="EADTRAN Cursos de Trânsito"
                                            className="absolute inset-0 w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">EADTRAN Cursos de Trânsito</h3>
                                    <p className="text-muted-foreground font-medium">Capacitação EAD Nacional</p>
                                    <a href="https://www.instagram.com/grupoeadtran/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                        <Instagram className="mr-2 h-5 w-5" />
                                        Instagram
                                    </a>
                                </div>
                            </div>

                            {uf === 'MS' && (
                                <>
                                    {/* Petra */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                            Campo Grande
                                        </span>
                                        <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                            <a href="https://www.instagram.com/petrasolucoesemsaude/" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                                <img
                                                    src="/petrrr.jpeg"
                                                    alt="Petra Soluções"
                                                    className="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </a>
                                        </div>
                                        <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">Petra Soluções em Saúde</h3>
                                            <p className="text-muted-foreground font-medium">Laboratório de Análises Toxicológicas</p>
                                            <a href="https://wa.me/556799817105" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-bold transition-colors">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>

                                    {/* Engecom */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                        <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-4">
                                            Dourados
                                        </span>
                                        <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                            <a href="https://engecomms.com.br/" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                                <img
                                                    src="/engecom-ms.jpg"
                                                    alt="Engecom"
                                                    className="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </a>
                                        </div>
                                        <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">Engecom</h3>
                                            <p className="text-muted-foreground font-medium">Fábrica de Sites</p>
                                        </div>
                                    </div>

                                    {/* Seu Botelho Barbearia */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                            Campo Grande
                                        </span>
                                        <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                            <div className="block w-full h-full relative cursor-pointer" onClick={() => window.open('https://www.instagram.com/seubotelhobarbearia/', '_blank')}>
                                                <img
                                                    src="/botelho.jpeg"
                                                    alt="Seu Botelho Barbearia"
                                                    className="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">Seu Botelho Barbearia</h3>
                                            <p className="text-muted-foreground font-medium">Barbearia Premium</p>
                                            <a href="https://wa.me/556791455040" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-bold transition-colors">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}

                            {uf === 'MT' && (
                                <>
                                    {/* Casa Grande */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                            Sinop
                                        </span>
                                        <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                            <a href="https://wa.me/5566996423351" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                                <img
                                                    src="/CASA.png"
                                                    alt="Casa Grande Assistência e Locação de Máquinas"
                                                    className="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </a>
                                        </div>
                                        <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">Casa Grande</h3>
                                            <p className="text-muted-foreground font-medium">Assistência e Locação de Máquinas</p>
                                            <a href="https://wa.me/5566996423351" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-bold transition-colors">
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>

                                    {/* São Miguel Arcanjo */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow h-full">
                                        <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-4">
                                            Campo Novo do Parecis
                                        </span>
                                        <div className="h-64 w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden relative">
                                            <a href="https://www.instagram.com/lopes.andersonluiz?igsh=MXg5cTYxcThiMzAxNQ%3D%3D" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                                <img
                                                    src="/SAO MIGUEL.jpeg"
                                                    alt="Transportadora São Miguel Arcanjo"
                                                    className="absolute inset-0 w-full h-full object-contain"
                                                />
                                            </a>
                                        </div>
                                        <div className="text-center mt-auto w-full z-10 relative bg-white pt-2">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">São Miguel Arcanjo</h3>
                                            <p className="text-muted-foreground font-medium">Transportadora</p>
                                            <a href="https://www.instagram.com/lopes.andersonluiz?igsh=MXg5cTYxcThiMzAxNQ%3D%3D" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                                Acessar Perfil
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 
                           placeholder for dynamic list of supporters.
                           Ideally, we would fetch data from Supabase here:
                           const { data } = supabase.from('apoiadores').select('*').eq('uf', uf);
                        */}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ApoiadoresEstado;
