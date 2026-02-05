import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  CreditCard,
  Scale,
  GraduationCap,
  Shield,
  Truck,
  Check,
  X,
  ArrowRight,
  Phone,
  Globe,
  FileText,
  Users
} from 'lucide-react';

const Beneficios = () => {
  const benefits = [
    {
      id: 'banco',
      icon: CreditCard,
      title: 'BDM Bank - Conta Gratuita',
      summary: 'Conta bancária sem custos mensais com cartão personalizado da Frota Brasil',
      features: [
        'Zero taxa de manutenção',
        'Cartão de débito personalizado',
        'PIX ilimitado gratuito',
        'TED/DOC sem custos',
        'App bancário completo',
        'Atendimento especializado'
      ],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'juridico',
      icon: Scale,
      title: 'Orientação Jurídica',
      summary: 'Suporte jurídico especializado em direito do transportador',
      features: [
        'Consultoria jurídica especializada',
        'Orientações sobre CNH e documentos',
        'Suporte em questões trabalhistas',
        'Análise de contratos',
        'Defesa em infrações de trânsito',
        'Atendimento presencial e online'
      ],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'cursos',
      icon: GraduationCap,
      title: 'Cursos EAD Certificados',
      summary: 'Capacitação profissional com certificados válidos nacionalmente',
      features: [
        'MOPP - Movimentação de Produtos Perigosos',
        'Curso de Emergência',
        'Transporte de Cargas Indivisíveis',
        'Transporte de Passageiros',
        'Transporte Escolar',
        'Certificados Detran/Senatran'
      ],
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'seguros',
      icon: Shield,
      title: 'Seguros Especiais',
      summary: 'Seguros para cargas e veículos com condições exclusivas',
      features: [
        'Seguro de carga com desconto',
        'Seguro de veículo especial',
        'Responsabilidade civil',
        'Acidentes pessoais',
        'Assistência 24h na estrada',
        'Cobertura nacional'
      ],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'suporte',
      icon: Truck,
      title: 'Suporte Completo',
      summary: 'Assessoria completa para motoristas profissionais e empresários',
      features: [
        'Consultoria para MEI',
        'Orientação fiscal e contábil',
        'Suporte para licenças',
        'Networking profissional',
        'Central de oportunidades',
        'WhatsApp de suporte'
      ],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const comparison = {
    before: [
      'Altas taxas bancárias mensais',
      'Dificuldade para atendimento médico',
      'Custos elevados com advogados',
      'Cursos presenciais caros e distantes',
      'Seguros com preços abusivos',
      'Falta de orientação profissional'
    ],
    after: [
      'Conta bancária 100% gratuita',
      'Telemedicina 24h disponível',
      'Orientação jurídica inclusa',
      'Cursos EAD certificados gratuitos',
      'Seguros com desconto especial',
      'Suporte completo e especializado'
    ]
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow">
            Benefícios Exclusivos
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Conquistas reais que transformam a vida dos transportadores brasileiros
          </p>
        </div>
      </section>

      {/* Benefícios Detalhados */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Cada Benefício em Detalhes
            </h2>
            <p className="text-xl text-muted-foreground">
              Conheça tudo o que você ganha sendo associado
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {benefits.map((benefit) => (
                <AccordionItem key={benefit.id} value={benefit.id} className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-4 text-left">
                      <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.summary}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {benefit.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <Link to="/associacao">
                        <Button className="btn-primary">
                          Quero Este Benefício
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Antes e Depois */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Antes e Depois da Frota Brasil
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja como nossa associação transforma a vida dos transportadores
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Antes */}
            <Card className="border-destructive/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <X className="h-16 w-16 text-destructive mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-destructive">Antes da Frota Brasil</h3>
                </div>
                <div className="space-y-4">
                  {comparison.before.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Depois */}
            <Card className="border-secondary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Check className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-secondary">Com a Frota Brasil</h3>
                </div>
                <div className="space-y-4">
                  {comparison.after.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demonstrações e Links */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Experimente Nossos Serviços
            </h2>
            <p className="text-xl text-muted-foreground">
              Acesse portais demonstrativos e conheça nossos parceiros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-primary mb-2">Portal EAD</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore nossa plataforma de cursos
                </p>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Cursos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-primary mb-2">BDM Bank</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Conheça os serviços bancários
                </p>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Site do Banco
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-primary mb-2">Suporte 24h</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fale conosco pelo WhatsApp
                </p>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Chamar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 text-shadow">
            Todos Esses Benefícios
          </h2>
          <div className="mb-8">
            <div className="text-6xl font-bold text-accent mb-2">GRÁTIS</div>
          </div>
          <Link to="/associacao">
            <Button className="btn-accent px-8 py-4 text-lg font-bold rounded-xl hover:scale-105 transition-transform">
              Quero Me Associar Agora
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Beneficios;