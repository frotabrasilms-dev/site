import { useState } from 'react';
import { Menu, X, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Benefícios', href: '/beneficios' },
    { name: 'Apoiadores', href: '/parceiros' },
    { name: 'Cursos EAD', href: '/cursos' },
    { name: 'Ferramentas', href: '/ferramentas' },

    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity group">
            <div className="relative bg-white p-2 rounded-lg shadow-sm border border-gray-100">
              <img
                src="/lovable-uploads/4a99fc5b-079b-4959-9043-f5f3c42c4848.png"
                alt="Logo Frota Brasil"
                className="h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary tracking-tight leading-none uppercase">Frota Brasil</span>
              <span className="text-sm font-medium text-muted-foreground tracking-wide">Associação Nacional</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-lg font-bold text-sm text-yellow-950 bg-yellow-400 hover:bg-yellow-500 hover:shadow-md transition-all duration-300"
            >
              Entrar
            </Link>
            <Link
              to="/associacao"
              className="px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center"
            >
              <Truck className="w-4 h-4 mr-2" />
              Associe-se Gratuito
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-24 bg-white border-t border-gray-100 shadow-xl animate-slideDown max-h-[80vh] overflow-y-auto">
            <div className="container-custom py-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive(item.href)
                    ? 'bg-primary/5 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col space-y-3 px-4">
                <Link
                  to="/login"
                  className="w-full text-center py-3 rounded-lg font-bold border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Área do Associado
                </Link>
                <Link
                  to="/associacao"
                  className="w-full text-center py-3 rounded-lg font-bold text-white bg-green-600 shadow-lg shadow-green-600/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Associe-se Gratuito
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;