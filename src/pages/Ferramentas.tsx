import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Calculator,
    Scale,
    Gavel,
    Truck,
    Bot,
    Lock,
    AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const Ferramentas = () => {
    const tools = [
        {
            icon: Calculator,
            title: 'Calculadora de Frete',
            description: 'Calcule o valor ideal do frete considerando distância, combustível e pedágios.',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: Scale,
            title: 'Assistente Jurídico (Multas)',
            description: 'Análise preliminar e orientações para recursos de infrações de trânsito.',
            color: 'bg-red-100 text-red-600'
        },
        {
            icon: Gavel,
            title: 'Jurídico Pequenas Causas',
            description: 'Suporte para resolução de conflitos menores e indenizações.',
            color: 'bg-orange-100 text-orange-600'
        },
        {
            icon: Truck,
            title: 'Calculadora de Desgaste',
            description: 'Estime o custo por km rodado incluindo pneus, óleo e manutenção.',
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: Bot,
            title: 'Zequinha (Meu Chapa IA)',
            description: 'Seu companheiro virtual de estrada para tirar dúvidas e bater um papo.',
            color: 'bg-purple-100 text-purple-600'
        }
    ];

    const handleToolClick = (toolName: string, description: string) => {
        toast.info(toolName, {
            description: description,
            duration: 4000
        });
    };

    return (
        <Layout>
            {/* Aviso de Área Restrita */}
            <section className="py-20 hero-gradient text-white">
                <div className="container-custom text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-yellow-500/20 rounded-full mb-6 border border-yellow-400/50 backdrop-blur-sm">
                        <Lock className="h-8 w-8 text-yellow-400 mr-3" />
                        <span className="text-xl font-bold text-yellow-100 uppercase tracking-wider">
                            Área Exclusiva para Associados
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 text-shadow">
                        Ferramentas do Trecho
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
                        Recursos tecnológicos desenvolvidos para facilitar o dia a dia do caminhoneiro.
                    </p>
                </div>
            </section>

            {/* Lista de Ferramentas */}
            <section className="py-20 bg-muted/20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {tools.map((tool, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-t-4 border-t-primary"
                                onClick={() => handleToolClick(tool.title, tool.description)}
                            >
                                <CardContent className="p-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tool.color}`}>
                                        <tool.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">
                                        {tool.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Button variant="ghost" className="mt-6 w-full group">
                                        Acessar Ferramenta
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center text-muted-foreground bg-white p-4 rounded-lg shadow-sm border">
                            <AlertTriangle className="h-5 w-5 mr-3 text-yellow-500" />
                            <span>Para utilizar as ferramentas completas, é necessário estar logado como associado ativo.</span>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Ferramentas;
