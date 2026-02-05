import { useState, FormEvent } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User } from 'lucide-react';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: '',
    senha: ''
  });

  const handleInputChange = (field: string, value: string) => {
    let maskedValue = value;

    if (field === 'cpf') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    setFormData(prev => ({
      ...prev,
      [field]: maskedValue
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.cpf || !formData.senha) {
      toast({
        title: "Erro",
        description: "CPF e senha são obrigatórios.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.senha.length !== 6 || !/^\d{6}$/.test(formData.senha)) {
      toast({
        title: "Erro",
        description: "A senha deve ter exatamente 6 números.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const cpfClean = formData.cpf.replace(/\D/g, '');

    const { data, error } = await supabase
      .from('associados')
      .select('*')
      .eq('cpf', cpfClean)
      .eq('senha', formData.senha)
      .single();

    setIsLoading(false);

    if (error || !data) {
      toast({
        title: "Erro",
        description: "CPF ou senha incorretos.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
      // Aqui você pode redirecionar para uma página de dashboard ou área do associado
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-muted/20">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold flex items-center justify-center space-x-2">
              <User className="h-6 w-6" />
              <span>Login do Associado</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cpf" className="text-primary font-semibold">
                  CPF
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
                <Label htmlFor="senha" className="text-primary font-semibold">
                  Senha (6 números)
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
                  pattern="\d{6}"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LogIn className="h-4 w-4 mr-2 animate-spin" />}
                {!isLoading && <LogIn className="h-4 w-4 mr-2" />}
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;