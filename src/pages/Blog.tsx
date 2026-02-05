import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  User,
  Search,
  Clock,
  ArrowRight,
  Tag,
  TrendingUp,
  BookOpen,
  MessageCircle,
  Heart,
  Share2,
  Eye
} from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: 'Nova Parceria BDM Bank: Conta Gratuita para Todos os Associados',
    summary: 'Conquistamos mais um benefício exclusivo! Agora todos os associados da Frota Brasil têm direito a uma conta bancária completamente gratuita no BDM Bank, incluindo cartão personalizado.',
    content: 'A Associação Frota Brasil tem o prazer de anunciar uma nova conquista para nossos associados...',
    author: 'Donner de Souza',
    date: '15 Dez 2024',
    readTime: '5 min',
    category: 'Benefícios',
    image: '/api/placeholder/800/400',
    views: 2400,
    likes: 156,
    comments: 23,
    featured: true
  };

  const blogPosts = [
    {
      id: 3,
      title: 'Curso de MOPP: Tudo Que Você Precisa Saber',
      summary: 'Guia completo sobre o curso de Movimentação de Produtos Perigosos, requisitos, conteúdo programático e como se inscrever.',
      author: 'Prof. Maria Santos',
      date: '10 Dez 2024',
      readTime: '10 min',
      category: 'Educação',
      views: 3200,
      likes: 187,
      comments: 34
    },
    {
      id: 4,
      title: 'Direitos do Caminhoneiro: O Que Mudou em 2024',
      summary: 'Principais mudanças na legislação trabalhista e de trânsito que afetam os profissionais do transporte rodoviário.',
      author: 'Adv. João Pereira',
      date: '08 Dez 2024',
      readTime: '12 min',
      category: 'Legislação',
      views: 2100,
      likes: 142,
      comments: 28
    },
    {
      id: 5,
      title: 'Dicas de Segurança na Estrada: Viagens Noturnas',
      summary: 'Orientações importantes para motoristas que fazem viagens noturnas, incluindo descanso, alimentação e equipamentos de segurança.',
      author: 'Instrutor Pedro Lima',
      date: '05 Dez 2024',
      readTime: '8 min',
      category: 'Segurança',
      views: 1650,
      likes: 89,
      comments: 19
    },
    {
      id: 6,
      title: 'Como Economizar Combustível: 10 Técnicas Comprovadas',
      summary: 'Técnicas práticas para reduzir o consumo de combustível e aumentar a rentabilidade do seu trabalho como motorista profissional.',
      author: 'Especialista Ana Costa',
      date: '03 Dez 2024',
      readTime: '6 min',
      category: 'Economia',
      views: 4100,
      likes: 245,
      comments: 67
    },
    {
      id: 7,
      title: 'Manutenção Preventiva: Checklist Essencial',
      summary: 'Lista completa de verificações que todo motorista deve fazer no seu veículo para evitar problemas na estrada.',
      author: 'Mecânico Roberto Silva',
      date: '01 Dez 2024',
      readTime: '9 min',
      category: 'Manutenção',
      views: 2800,
      likes: 156,
      comments: 42
    }
  ];

  const categories = [
    { name: 'Todos', count: 45, color: 'bg-primary' },
    { name: 'Benefícios', count: 12, color: 'bg-accent' },
    { name: 'Educação', count: 8, color: 'bg-secondary' },
    { name: 'Legislação', count: 6, color: 'bg-primary' },
    { name: 'Segurança', count: 9, color: 'bg-accent' },
    { name: 'Economia', count: 5, color: 'bg-secondary' },
    { name: 'Manutenção', count: 5, color: 'bg-primary' }
  ];

  const popularTags = [
    'MOPP', 'Telemedicina', 'BDM Bank', 'CNH', 'Direção Defensiva',
    'Combustível', 'Segurança', 'Documentos', 'Benefícios', 'Cursos EAD'
  ];

  const recentPosts = [
    { title: 'Novos Cursos EAD Disponíveis', date: '18 Dez 2024' },
    { title: 'Atualização no App de Telemedicina', date: '16 Dez 2024' },
    { title: 'Parceria com Posto de Combustível', date: '14 Dez 2024' },
    { title: 'Evento para Associados em SP', date: '13 Dez 2024' },
    { title: 'Dicas de Alimentação na Estrada', date: '11 Dez 2024' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow">
            Blog Frota Brasil
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Notícias, dicas e informações importantes para motoristas profissionais
          </p>
        </div>
      </section>

      {/* Barra de Pesquisa */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Pesquisar artigos, dicas, notícias..."
                className="pl-12 pr-4 py-4 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Post em Destaque */}
            <div className="mb-16">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">Em Destaque</span>
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <BookOpen className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Nova Parceria BDM Bank</h2>
                      <p className="opacity-90">Conta bancária gratuita para associados</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-accent text-accent-foreground">Benefícios</Badge>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">15 Dez 2024</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">5 min de leitura</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {featuredPost.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{featuredPost.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{featuredPost.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{featuredPost.comments}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="btn-primary">
                        Ler Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Posts */}
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors cursor-pointer">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Ler Mais
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Anterior</Button>
                <Button size="sm" className="btn-primary">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categorias */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Categorias
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts Recentes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Posts Recentes
                </h3>
                <div className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="pb-3 border-b border-border last:border-b-0">
                      <h4 className="text-sm font-medium text-primary hover:text-accent cursor-pointer transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags Populares */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">
                  Newsletter Frota Brasil
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Receba as principais notícias e dicas por email
                </p>
                <Input
                  placeholder="Seu email"
                  className="mb-3 bg-white text-foreground"
                />
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Assinar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;