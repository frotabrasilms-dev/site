import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  Award,
  Users,
  Play,
  Calendar,
  CheckCircle,
  Star,
  BookOpen,
  Download,
  Video,
  FileText
} from 'lucide-react';

const Cursos = () => {
  const courses = [
    {
      id: 'mopp',
      title: 'MOPP - Movimentação de Produtos Perigosos',
      description: 'Curso obrigatório para transporte de cargas perigosas, com certificação válida em todo território nacional.',
      duration: '50 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Obrigatório',
      level: 'Básico',
      rating: 4.9,
      studentsCount: 2500,
      topics: [
        'Legislação sobre produtos perigosos',
        'Classificação de cargas perigosas',
        'Procedimentos de emergência',
        'Equipamentos de segurança',
        'Documentação obrigatória'
      ],
      benefits: [
        'Certificado nacional válido',
        'Material didático incluído',
        'Suporte online 24h',
        'Aulas em vídeo HD',
        'Simulados práticos'
      ]
    },
    {
      id: 'emergencia',
      title: 'Curso de Emergência',
      description: 'Treinamento em procedimentos de emergência para motoristas profissionais.',
      duration: '16 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Segurança',
      level: 'Básico',
      rating: 4.8,
      studentsCount: 1800,
      topics: [
        'Primeiros socorros',
        'Combate a incêndios',
        'Evacuação de emergência',
        'Comunicação de emergência',
        'Prevenção de acidentes'
      ],
      benefits: [
        'Certificado reconhecido nacionalmente',
        'Aulas práticas em vídeo',
        'Kit de emergência gratuito',
        'Atualização gratuita',
        'Suporte especializado'
      ]
    },
    {
      id: 'cargas-indivisiveis',
      title: 'Transporte de Cargas Indivisíveis',
      description: 'Especialização para transporte de cargas especiais que excedem dimensões padrão.',
      duration: '30 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Especialização',
      level: 'Intermediário',
      rating: 4.7,
      studentsCount: 950,
      topics: [
        'Regulamentação de cargas especiais',
        'Planejamento de rotas',
        'Documentação necessária',
        'Equipamentos auxiliares',
        'Procedimentos de segurança'
      ],
      benefits: [
        'Certificado especializado',
        'Simulações de rota',
        'Manual técnico digital',
        'Consultoria pós-curso',
        'Networking profissional'
      ]
    },
    {
      id: 'transporte-passageiros',
      title: 'Transporte de Passageiros',
      description: 'Curso para habilitação no transporte de passageiros urbano e interurbano.',
      duration: '40 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Habilitação',
      level: 'Básico',
      rating: 4.8,
      studentsCount: 1200,
      topics: [
        'Legislação de transporte de passageiros',
        'Relacionamento com passageiros',
        'Acessibilidade e inclusão',
        'Segurança no transporte',
        'Direção defensiva'
      ],
      benefits: [
        'Certificado oficial',
        'Material interativo',
        'Casos práticos reais',
        'Mentoria individual',
        'Certificado impresso'
      ]
    },
    {
      id: 'transporte-escolar',
      title: 'Transporte Escolar',
      description: 'Capacitação específica para condutores de transporte escolar.',
      duration: '50 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Especialização',
      level: 'Básico',
      rating: 4.9,
      studentsCount: 1600,
      topics: [
        'Legislação do transporte escolar',
        'Psicologia infantil aplicada',
        'Primeiros socorros pediátricos',
        'Segurança de crianças',
        'Responsabilidades legais'
      ],
      benefits: [
        'Certificado específico',
        'Treinamento em primeiros socorros',
        'Kit de segurança',
        'Acompanhamento mensal',
        'Comunidade exclusiva'
      ]
    },
    {
      id: 'direcao-defensiva',
      title: 'Direção Defensiva Avançada',
      description: 'Técnicas avançadas de direção defensiva para profissionais do transporte.',
      duration: '20 horas',
      certification: 'Detran/Senatran',
      price: 'Incluso',
      category: 'Segurança',
      level: 'Avançado',
      rating: 4.8,
      studentsCount: 2200,
      topics: [
        'Técnicas defensivas avançadas',
        'Condições adversas',
        'Manutenção preventiva',
        'Economia de combustível',
        'Tecnologia veicular'
      ],
      benefits: [
        'Simulador de direção',
        'Aulas em pista virtual',
        'Desconto em seguros',
        'Certificado premium',
        'App móvel exclusivo'
      ]
    }
  ];

  const stats = [
    { label: 'Cursos Oferecidos', value: '12+', icon: BookOpen },
    { label: 'Alunos Formados', value: '10.000+', icon: Users },
    { label: 'Taxa de Aprovação', value: '95%', icon: Award },
    { label: 'Satisfação', value: '4.8/5', icon: Star }
  ];

  const upcomingSchedule = [
    { course: 'MOPP', date: '15 Jan 2025', slots: 50 },
    { course: 'Transporte Escolar', date: '22 Jan 2025', slots: 30 },
    { course: 'Emergência', date: '29 Jan 2025', slots: 40 },
    { course: 'Cargas Indivisíveis', date: '05 Fev 2025', slots: 25 }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow">
            Cursos EAD Certificados
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed mb-8">
            Capacitação profissional com certificados válidos nacionalmente pelo Detran/Senatran
          </p>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <Award className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-lg font-semibold">Todos os cursos inclusos na associação</p>
            <p className="opacity-90">Certificados reconhecidos em todo o Brasil</p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Cursos */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nossos Cursos
            </h2>
            <p className="text-xl text-muted-foreground">
              Todos inclusos na sua associação
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {course.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span className="text-sm font-semibold">{course.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {course.studentsCount} alunos
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-secondary" />
                      <span className="text-sm">{course.certification}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Conteúdo Programático:</h4>
                      <ul className="space-y-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{topic}</span>
                          </li>
                        ))}
                        {course.topics.length > 3 && (
                          <li className="text-sm text-accent font-medium">
                            +{course.topics.length - 3} tópicos adicionais
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button className="btn-primary flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Assistir Demo
                      </Button>
                      <Link to="/associacao" className="flex-1">
                        <Button className="btn-accent w-full">
                          Fazer Curso
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cronograma de Inscrições */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Próximas Turmas
            </h2>
            <p className="text-xl text-muted-foreground">
              Calendário de inscrições abertas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {upcomingSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-6 w-6 text-accent" />
                        <div>
                          <p className="font-semibold text-primary">{schedule.course}</p>
                          <p className="text-sm text-muted-foreground">Início: {schedule.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-secondary">
                          {schedule.slots} vagas disponíveis
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          Reservar Vaga
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vídeo Demonstrativo */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Veja Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Demonstração da nossa plataforma EAD
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <Video className="h-24 w-24 mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-4">Plataforma EAD Frota Brasil</h3>
                    <p className="text-lg opacity-90 mb-6">
                      Veja como é fácil estudar conosco
                    </p>
                    <Button className="bg-white text-primary hover:bg-white/90">
                      <Play className="mr-2 h-5 w-5" />
                      Assistir Demonstração
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <GraduationCap className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-shadow">
            Invista na Sua Carreira
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Todos esses cursos estão inclusos na sua associação.
            Capacite-se e amplie suas oportunidades profissionais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/associacao">
              <Button className="btn-accent px-8 py-4 text-lg font-bold rounded-xl hover:scale-105 transition-transform">
                Começar Meus Cursos
              </Button>
            </Link>
            <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg">
              <Download className="mr-2 h-4 w-4" />
              Baixar Catálogo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cursos;