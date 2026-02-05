import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { getParceiros } from '@/data/parceiros';
import { Parceiro } from '@/types/parceiro';

const Parceiros = () => {
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParceiros = async () => {
      setIsLoading(true);
      const data = await getParceiros();
      setParceiros(data);
      setIsLoading(false);
    };
    fetchParceiros();
  }, []);

  const handleImageClick = (site: string | null) => {
    if (site) {
      window.open(site, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Nossos <span className="text-primary">Apoiadores</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça as empresas que confiam na Frota Brasil e fazem parte da nossa rede de parceiros
              </p>
            </div>

            {/* Grid de Parceiros */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : parceiros.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {parceiros.map((parceiro) => (
                  <Card key={parceiro.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Imagem clicável */}
                      <div
                        className={`aspect-video bg-muted flex items-center justify-center ${parceiro.site ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                          }`}
                        onClick={() => handleImageClick(parceiro.site)}
                      >
                        <img
                          src={parceiro.imagem}
                          alt={parceiro.nome}
                          className="w-full h-full object-cover"
                        />
                        {parceiro.site && (
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                            <ExternalLink className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Informações do parceiro */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {parceiro.nome}
                        </h3>

                        {parceiro.endereco && (
                          <div className="flex items-start space-x-2 text-muted-foreground">
                            <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{parceiro.endereco}</p>
                          </div>
                        )}

                        {parceiro.site && (
                          <div className="mt-4">
                            <button
                              onClick={() => handleImageClick(parceiro.site)}
                              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Visitar site</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Nenhum parceiro encontrado.</p>
              </div>
            )}

            {/* Seção CTA */}
            <div className="mt-20 text-center">
              <div className="bg-card p-8 rounded-2xl border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Quer ser nosso parceiro?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Junte-se à nossa rede de parceiros e ajude a fortalecer o setor de transporte no Brasil
                </p>
                <button
                  onClick={() => document.getElementById('footer-contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-accent px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Entre em Contato
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Parceiros;