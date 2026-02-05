import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const TermosUso = () => {
    return (
        <Layout>
            <section className="py-20 bg-muted/30">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">
                            Termos e Condições de Uso
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Associação Frota Brasil
                        </p>
                    </div>

                    <Card className="max-w-4xl mx-auto">
                        <CardContent className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

                            <div>
                                <p className="mb-4">
                                    Seja bem-vindo ao portal da <strong>Associação Frota Brasil</strong>. Ao acessar este site, você concorda em cumprir estes termos de uso. Caso não concorde com qualquer parte destes termos, recomendamos que não utilize nossos serviços digitais.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Aceitação dos Termos</h2>
                                <p>O acesso ao site <strong>associacaofrotabrasil.org.br</strong> e o uso de seus serviços (como cursos, telemedicina e seguros) estão condicionados à aceitação e ao cumprimento destes Termos. Estes termos aplicam-se a todos os visitantes, associados e demais pessoas que acessam o site.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Cadastro e Área do Associado</h2>
                                <p className="mb-4">Para acessar determinadas funcionalidades, como a Área Restrita, o usuário deverá estar devidamente associado e possuir login/senha.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Responsabilidade:</strong> Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta.</li>
                                    <li><strong>Veracidade:</strong> Todas as informações fornecidas (CNH, CPF, dados do veículo) devem ser verdadeiras e atualizadas.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. Serviços e Benefícios</h2>
                                <p className="mb-4">A Associação Frota Brasil atua como facilitadora de benefícios para o setor de transporte.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Cursos Profissionais:</strong> A inscrição em cursos (MOPP, Cargas Indivisíveis, etc.) segue normas específicas do Senatran/Detran.</li>
                                    <li><strong>Parcerias:</strong> Serviços de Telemedicina e Seguros são prestados por empresas parceiras. A Associação atua na gestão do convênio, mas a execução técnica é de responsabilidade do prestador específico.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Propriedade Intelectual</h2>
                                <p>Todo o conteúdo deste site (textos, logotipos, vídeos, materiais de cursos e design) é de propriedade exclusiva da Associação Frota Brasil ou de seus licenciadores e está protegido por leis de direitos autorais. É proibida a reprodução ou distribuição sem autorização prévia.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Conduta do Usuário</h2>
                                <p className="mb-4">Ao utilizar nosso site, você se compromete a:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Não utilizar o portal para fins ilícitos ou para transmitir vírus e códigos maliciosos.</li>
                                    <li>Não tentar burlar sistemas de segurança ou acessar dados de outros associados.</li>
                                    <li>Utilizar os materiais educativos apenas para sua formação pessoal e profissional.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. Limitação de Responsabilidade</h2>
                                <p className="mb-4">A Associação Frota Brasil se esforça para manter o site atualizado e seguro, mas não se responsabiliza por:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Interrupções temporárias no serviço por problemas técnicos de terceiros (provedores de internet).</li>
                                    <li>Uso indevido das informações por parte do usuário.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">7. Modificações nos Termos</h2>
                                <p>Reservamos o direito de modificar ou substituir estes Termos a qualquer momento. Mudanças significativas serão comunicadas em nossa página principal ou via e-mail aos associados.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">8. Lei Regente e Foro</h2>
                                <p>Estes termos são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer dúvidas ou litígios, fica eleito o Foro da Comarca de Campo Grande - MS.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">9. Contato</h2>
                                <p className="mb-4">Para dúvidas sobre estes Termos de Uso, entre em contato com:</p>
                                <ul className="list-none space-y-2">
                                    <li><strong>Donner:</strong> (67) 9 8479-6030</li>
                                    <li><strong>Irani:</strong> (67) 9 8467-8018</li>
                                    <li><strong>E-mail:</strong> contato@associacaofrotabrasil.org.br</li>
                                </ul>
                            </div>

                            <div>
                                <p className="mt-8 text-sm text-muted-foreground">Última atualização: 05 de fevereiro de 2026.</p>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
};

export default TermosUso;
