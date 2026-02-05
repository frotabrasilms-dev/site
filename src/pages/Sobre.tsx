import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Users,
  Target,
  Eye,
  Heart,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  Quote
} from 'lucide-react';

const Sobre = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  const timeline = [
    {
      year: '2022',
      title: 'Fundação da Associação',
      description: 'Donner de Souza funda a Associação Frota Brasil com o sonho de apoiar caminhoneiros brasileiros.',
      icon: Users
    },
    {
      year: '2023',
      title: 'Primeiros Benefícios',
      description: 'Conquista da parceria para orientação jurídica especializada e primeiros cursos EAD.',
      icon: Award
    },
    {
      year: '2024',
      title: 'Parceria BDM Bank',
      description: 'Conta bancária gratuita para todos os associados, eliminando tarifas abusivas.',
      icon: TrendingUp
    },
    {
      year: '2025',
      title: 'Empresários Frota Brasil',
      description: 'Projeto exclusivo que conecta empresários a uma rede qualificada de associados.',
      icon: Users
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Trabalhando por Pessoas',
      description: 'Nossa essência é cuidar de pessoas. Cada caminhoneiro é parte da nossa família e merece dignidade, respeito e oportunidades.'
    },
    {
      icon: Users,
      title: 'União e Solidariedade',
      description: 'Acreditamos na força da união. Juntos, os transportadores brasileiros podem conquistar muito mais do que sozinhos.'
    },
    {
      icon: Target,
      title: 'Resultados Concretos',
      description: 'Não prometemos, entregamos. Cada benefício conquistado é uma vitória real na vida dos nossos associados.'
    },
    {
      icon: Eye,
      title: 'Transparência Total',
      description: 'Prestamos contas de cada ação, cada conquista e cada investimento feito em prol dos transportadores.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow">
            Nossa História
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Conheça a trajetória de dedicação, luta e conquistas da Associação Frota Brasil
          </p>
        </div>
      </section>

      {/* Quem Somos - Novo Conteúdo Solicitado */}
      <section className="py-20 bg-muted/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-border/50 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-4 flex items-center">
                  <Users className="h-8 w-8 mr-3 text-accent" />
                  Quem Somos
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A Associação Frota Brasil representa uma inovação significativa no setor de transportes,
                  especificamente desenhado para atender às necessidades dos caminhoneiros e demais profissionais do setor.
                  Visando atender o maior numero de situações adversas encontradas aos profissionais, formamos parcerias
                  em vários setores, visando oferecer um pacote abrangente de serviços essenciais que promovem a saúde,
                  segurança, e bem-estar dos seus membros, além de proporcionar vantagens econômicas significativas.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-3xl font-bold text-primary mb-4 flex items-center">
                  <Calendar className="h-8 w-8 mr-3 text-accent" />
                  Nossa História
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  No inicio do ano de 2022, foi fundada a AFB um movimento idealizado a quase 10 anos, onde um projeto
                  se torna realidade, constituída por 12 pessoas no conselho diretor e com mais 50 nomeações realizadas
                  na capital, Campo Grande MS, formalizado em ATA, foi instituído o estatuto e a estrutura organizacional
                  juntamente com o plano piloto da fundação.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Agora no seu quarto ano, com parcerias estabelecidas com: banco, assistência Juridica, mobilidade urbana,
                  descontos em estabelecimentos e uma séria de benefícios aos associados, a AFB começa as deliberações para
                  nomeações dos demais municípios do estado, já com convite e tratativas para outros estados da federação.
                </p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-3xl font-bold text-primary mb-4 flex items-center">
                  <Target className="h-8 w-8 mr-3 text-accent" />
                  Atuação e Futuro
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium text-primary/80">
                  Convidamos a juntar-se a nós neste movimento inclusivo, onde todos são acolhidos de braços abertos!
                  Contamos hoje com um grande numero de associados com projeções geométrica para os anos de 2026 e 27.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio do Presidente */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-primary mb-6">
                Donner de Souza
              </h2>
              <p className="text-lg text-accent font-semibold mb-4">
                Presidente e Fundador
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Caminhoneiro há mais de 20 anos, Donner de Souza conhece de perto os desafios
                  enfrentados pelos transportadores brasileiros. Nascido em uma família humilde,
                  começou como ajudante de caminhão aos 16 anos e hoje é empresário do setor.
                </p>
                <p>
                  Em 2022, movido pela paixão de ajudar outros profissionais da estrada,
                  fundou a Associação Frota Brasil com uma missão clara:
                  <strong className="text-primary"> trabalhar por pessoas</strong>.
                </p>
                <p>
                  "Cada conquista nossa é uma vitória de todos os caminhoneiros do Brasil.
                  Não medimos esforços para oferecer dignidade, respeito e oportunidades
                  para quem move o nosso país", diz Donner.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/contato">
                  <Button className="btn-primary px-6 py-3">
                    Fale com o Presidente
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square">
                    <img
                      src="/lovable-uploads/170f9037-d12f-4487-aa2b-1ae5f2b2fd2a.png"
                      alt="Donner de Souza, Presidente da Frota Brasil, ao lado de caminhões Scania"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Palavras do Presidente */}
      <section className="py-20 bg-muted/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="bg-primary/10 p-4 rounded-full mr-6">
                    <Quote className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-primary">
                      Palavras do Presidente
                    </h3>
                    <p className="text-muted-foreground">Uma mensagem especial para você</p>
                  </div>
                </div>

                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground italic font-medium">
                  <p>Aos meus irmãos e irmãs de estrada,</p>

                  <p>
                    É com grande satisfação e um aperto de mão fraterno que me dirijo a vocês. Nossa missão na
                    Associação Frota Brasil vai muito além de ser apenas uma instituição; é sobre acolher. É sobre
                    garantir que, em cada quilômetro rodado, você sinta que tem uma família cuidando da sua retaguarda.
                  </p>

                  <p>
                    Sabemos que a vida no trecho exige muito do corpo e da mente. Por isso, a saúde e a proteção de
                    vocês são sagradas para nós. Trabalhamos incansavelmente para oferecer uma rede de apoio sólida.
                    Nosso aplicativo de descontos, especialmente em farmácias, não é apenas sobre economia; é sobre
                    garantir que você e sua família tenham acesso facilitado aos medicamentos e cuidados necessários para viver bem.
                  </p>

                  <p>
                    Sua segurança é a paz de quem te espera em casa. Nossos seguros em caso de acidentes existem para
                    que você possa focar no horizonte com a cabeça tranquila, sabendo que, nos momentos difíceis, nós
                    estaremos lá para te amparar.
                  </p>

                  <p>
                    Hoje, fortalecidos por 40 entidades parceiras que compartilham do nosso sonho, somos um exército
                    unido pelo seu bem-estar. Agradeço a confiança de cada um. Saibam que, enquanto houver estrada
                    pela frente, a Associação Frota Brasil será seu copiloto, lutando por mais benefícios e segurança para a nossa classe.
                  </p>
                  <p>Deus abençoe a viagem de todos.</p>
                </div>

                <div className="mt-8 pt-6 border-t font-bold text-primary text-right">
                  - Donner de Souza
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nossos Princípios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Apoiar caminhoneiros e motoristas profissionais com serviços essenciais,
                  capacitação e benefícios que transformem suas vidas e fortaleçam o setor
                  de transporte brasileiro.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Eye className="h-16 w-16 text-secondary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a principal associação de transportadores do Brasil, reconhecida pela
                  excelência dos serviços e pelo impacto positivo na vida dos profissionais
                  da estrada.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Valores</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transparência, solidariedade, excelência, inovação e, acima de tudo,
                  o compromisso inabalável de trabalhar por pessoas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galeria de Momentos */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nossa Caminhada
            </h2>
            <p className="text-xl text-muted-foreground">
              Momentos importantes que construíram nossa história
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <img
                  src="/foto-bdm.jpg"
                  alt="Parceria BDM Digital"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6 text-center">
                  <p className="font-bold text-primary text-lg">Parcerias Estratégicas</p>
                  <p className="text-muted-foreground text-sm">Fortalecendo o ecossistema BDM</p>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <img
                  src="/foto-evento.jpg"
                  alt="Evento Oficial AFB"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6 text-center">
                  <p className="font-bold text-primary text-lg">Eventos e Celebrações</p>
                  <p className="text-muted-foreground text-sm">União da família Frota Brasil</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline de Conquistas */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Timeline de Conquistas
            </h2>
            <p className="text-xl text-muted-foreground">
              Cada ano, novos benefícios e vitórias para nossos associados
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 mr-8">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-accent mr-4">{item.year}</span>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-shadow">
              Impacto em Números
            </h2>
            <p className="text-xl opacity-90">
              Em Movimento Nacional
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">25.000+</div>
              <div className="text-lg">Associados Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5.000+</div>
              <div className="text-lg">Cursos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5000+</div>
              <div className="text-lg">Empresários</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <div className="text-lg">Sempre Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section id="galeria" className="py-20 bg-muted/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-team-1.jpg" alt="Equipe AFB" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-truck-1.jpg" alt="Caminhões Parceiros" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-car-1.jpg" alt="Veículos da Associação" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-1">
              <img src="/sobre-racing-1.jpg" alt="Parcerias Esportivas" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-2">
              <img src="/sobre-team-2.jpg" alt="Time Completo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-truck-2.jpg" alt="Visita Técnica" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-truck-3.jpg" alt="Frota Moderna" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-truck-person.jpg" alt="O Homem e a Máquina" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-1">
              <img src="/sobre-meeting-1.jpg" alt="Reuniões Estratégicas" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-2">
              <img src="/sobre-team-3.jpg" alt="Conselho e Associados" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            {/* Batch 3 */}
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-2">
              <img src="/sobre-meeting-2.jpg" alt="Diretoria em Reunião" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-group-red-truck.jpg" alt="União na Estrada" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2 lg:col-span-2">
              <img src="/sobre-presentation-1.jpg" alt="Apresentação de Projetos" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 lg:col-span-1">
              <img src="/sobre-presentation-2.jpg" alt="Palestras e Capacitação" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            {/* Batch 4 */}
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-radio-interview.jpg" alt="Entrevista à Rádio" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-flags.jpg" alt="Credenciados" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-truck-group-white.jpg" alt="Parceria Renovada" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64">
              <img src="/sobre-meeting-thumbs.jpg" alt="Planejamento" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 sm:col-span-2">
              <img src="/sobre-meeting-selfie.jpg" alt="Equipe Unida" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de profissionais que já descobriram como a união faz a força
          </p>
          <Link to="/associacao">
            <Button className="btn-accent px-8 py-4 text-lg font-bold rounded-xl hover:scale-105 transition-transform">
              Associe-se Agora
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;