import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacao: [
      { name: 'Início', href: '/' },
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Benefícios', href: '/beneficios' },
      { name: 'Associação', href: '/associacao' },
    ],

    recursos: [

      { name: 'Contato', href: '/contato' },
      { name: 'FAQ', href: '/associacao#faq' },
      { name: 'Suporte', href: '/contato#suporte' },
    ],
  };

  return (
    <footer id="footer-contato" className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <img
                  src="/lovable-uploads/4a99fc5b-079b-4959-9043-f5f3c42c4848.png"
                  alt="Logo Frota Brasil Associação"
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Frota Brasil</span>
                <span className="text-sm opacity-80">Associação</span>
              </div>
            </Link>
            <p className="text-sm opacity-90 mb-6 leading-relaxed">
              Junte-se à Associação Frota Brasil e faça parte de uma rede que valoriza, protege e fortalece quem move o país. Associe-se agora e caminhe conosco.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCndPgKESvMHLjdr9_v_HU9Q" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links de Navegação */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm opacity-90">(67) 3424-4211</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm opacity-90">contato@frotabrasil.org.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-90">
                  Rua Paraná, 56, sala 4 - Centro de Miranda - MS<br />
                  Rodovia BR-163, 56, sala 02 - Campo Grande - MS
                </span>
              </div>
              <div className="pt-4 mt-2 border-t border-primary-foreground/10">
                <Link to="/politica-privacidade" className="flex items-center space-x-2 text-sm opacity-90 hover:opacity-100 hover:text-accent group">
                  <span className="group-hover:underline">Políticas de Privacidade</span>
                </Link>
                <Link to="/termos-uso" className="flex items-center space-x-2 text-sm opacity-90 hover:opacity-100 hover:text-accent group mt-2">
                  <span className="group-hover:underline">Termos de Uso</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-80">
              © {currentYear} Associação Frota Brasil. CNPJ 47.532.560/0001-50
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="https://engecomms.com.br/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                https://engecomms.com.br/
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;