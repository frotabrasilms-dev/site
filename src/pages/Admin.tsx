import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Users, Settings, UserCheck, FileText, Edit, ShieldCheck, Loader2, ArrowLeft, Lock, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type ViewMode = 'landing' | 'login_admin' | 'verify_supervisor' | 'dashboard';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // State to manage the current view
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  // Login State
  const [password, setPassword] = useState('');

  // Security Modal State (Now inline)
  const [verifyCpf, setVerifyCpf] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------

  const handleVerifyAccess = async () => {
    if (verifyCpf.length < 14) {
      toast({ title: "CPF inválido", variant: "destructive" });
      return;
    }

    setIsVerifying(true);
    try {
      const cleanCpf = verifyCpf.replace(/\D/g, '');
      const { data, error } = await supabase
        .from('associados')
        .select('nome, nomeado')
        .eq('cpf', cleanCpf)
        .single();

      if (error || !data) {
        throw new Error("Não encontrado");
      }

      if (data.nomeado === true) {
        toast({ title: "Acesso Permitido", description: `Bem-vindo, ${data.nome}` });
        navigate('/admin/nomear-supervisor');
      } else {
        toast({
          title: "Acesso Negado",
          description: "Acesso somente para nomeados.",
          variant: "destructive"
        });
      }

    } catch (error) {
      toast({
        title: "Acesso Negado",
        description: "CPF não encontrado ou erro de verificação.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '7513') {
      setViewMode('dashboard');
      setPassword('');
    } else {
      toast({
        title: "Senha Incorreta",
        description: "A senha fornecida está incorreta. Tente novamente.",
        variant: "destructive",
      });
      setPassword('');
    }
  };

  const handleLogout = () => {
    setViewMode('landing');
    toast({ title: "Você foi desconectado." });
  };

  // ------------------------------------------------------------------
  // Render: 1. Landing Page (Selection)
  // ------------------------------------------------------------------
  if (viewMode === 'landing') {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Acesso <span className="text-primary">Restrito</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Selecione a área que deseja acessar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            {/* Card 1: Admin Panel */}
            <Card
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary group"
              onClick={() => setViewMode('login_admin')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Settings className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Área Administrativa</CardTitle>
                <CardDescription>Gerenciamento geral da plataforma e relatórios</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <Button className="w-full">Entrar com Senha</Button>
              </CardContent>
            </Card>

            {/* Card 2: Nomination */}
            <Card
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-secondary/20 hover:border-secondary group"
              onClick={() => setViewMode('verify_supervisor')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-secondary/10 p-4 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                  <ShieldCheck className="h-12 w-12 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Nomeação de Supervisores</CardTitle>
                <CardDescription>Área exclusiva para membros nomeados</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <Button variant="secondary" className="w-full">Validar Acesso</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // ------------------------------------------------------------------
  // Render: 2. Login Admin (Password)
  // ------------------------------------------------------------------
  if (viewMode === 'login_admin') {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen bg-muted/20">
          <Card className="w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-300">
            <CardHeader>
              <Button variant="ghost" className="w-fit mb-2 pl-0 hover:bg-transparent hover:text-primary" onClick={() => setViewMode('landing')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
              <CardTitle className="text-center text-2xl font-bold text-primary flex flex-col items-center gap-2">
                <Lock className="h-8 w-8" />
                Login Administrativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="password">Senha de Acesso</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Digite a senha"
                    autoFocus
                    className="mt-2"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-6">Acessar Painel</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // ------------------------------------------------------------------
  // Render: 3. Verify Supervisor (CPF)
  // ------------------------------------------------------------------
  if (viewMode === 'verify_supervisor') {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen bg-muted/20">
          <Card className="w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-300 border-secondary/20">
            <CardHeader>
              <Button variant="ghost" className="w-fit mb-2 pl-0 hover:bg-transparent hover:text-secondary" onClick={() => setViewMode('landing')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
              <CardTitle className="text-center text-2xl font-bold text-secondary flex flex-col items-center gap-2">
                <Shield className="h-8 w-8" />
                Validação de Acesso
              </CardTitle>
              <CardDescription className="text-center">
                Esta área é restrita para membros que já possuem nomeação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="verify-cpf">Confirme seu CPF</Label>
                <Input
                  id="verify-cpf"
                  placeholder="000.000.000-00"
                  value={verifyCpf}
                  onChange={(e) => setVerifyCpf(e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').slice(0, 14))}
                  className="mt-2 text-lg"
                  autoFocus
                />
              </div>
              <Button onClick={handleVerifyAccess} disabled={isVerifying} className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                {isVerifying ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Verificar Acesso
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // ------------------------------------------------------------------
  // Render: 4. Dashboard (Authenticated)
  // ------------------------------------------------------------------
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="pt-32 pb-20">
          <div className="container-custom">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-3 mb-6">
                <Settings className="h-12 w-12 text-primary" />
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                  Área <span className="text-primary">Administrativa</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Painel de Controle Geral
              </p>
              <div className="mt-6 flex justify-center items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleLogout} className="btn-primary">
                  Sair
                </Button>
              </div>
            </div>

            {/* Admin Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Link to="/admin/parceiros" className="w-full">
                <Button className="w-full h-24 text-lg flex flex-col items-center justify-center space-y-2 bg-primary hover:bg-primary/90">
                  <Users className="h-8 w-8" />
                  <span>Parceiros</span>
                </Button>
              </Link>
              <Link to="/admin/nomeacoes" className="w-full">
                <Button className="w-full h-24 text-lg flex flex-col items-center justify-center space-y-2 bg-secondary hover:bg-secondary/90">
                  <UserCheck className="h-8 w-8" />
                  <span>Fazer Nomeações</span>
                </Button>
              </Link>
              <Link to="/admin/relatorios" className="w-full">
                <Button className="w-full h-24 text-lg flex flex-col items-center justify-center space-y-2 bg-accent hover:bg-accent/90 text-white">
                  <FileText className="h-8 w-8" />
                  <span>Relatórios</span>
                </Button>
              </Link>
              <Button className="h-24 text-lg flex flex-col items-center justify-center space-y-2 bg-muted-foreground hover:bg-muted-foreground/90 text-white">
                <Edit className="h-8 w-8" />
                <span>Editar Associados</span>
              </Button>
            </div>


          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Admin;