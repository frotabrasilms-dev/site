import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const PoliticaPrivacidade = () => {
    return (
        <Layout>
            <section className="py-20 bg-muted/30">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">
                            Políticas de Privacidade
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Associação Frota Brasil
                        </p>
                    </div>

                    <Card className="max-w-4xl mx-auto">
                        <CardContent className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

                            <div>
                                <p className="mb-4">
                                    A <strong>Associação Frota Brasil</strong>, inscrita no CNPJ sob o nº 47.532.560/0001-50, com sede na Rodovia BR-163, 56, sala 02 - Campo Grande - MS, valoriza a privacidade dos seus associados, parceiros e visitantes. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos seus dados pessoais ao utilizar nosso site e nossos serviços.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Quais dados coletamos?</h2>
                                <p className="mb-4">Coletamos informações que você nos fornece diretamente ao se associar, solicitar benefícios ou entrar em contato:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Dados Cadastrais:</strong> Nome completo, CPF, RG, CNH, data de nascimento, endereço, e-mail e telefone.</li>
                                    <li><strong>Dados do Veículo:</strong> Placa, modelo e informações para fins de seguro ou cursos.</li>
                                    <li><strong>Dados de Pagamento:</strong> Informações para processamento de mensalidades e taxas.</li>
                                    <li><strong>Dados de Navegação:</strong> Cookies e endereço IP para melhorar a experiência no site.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Para que usamos seus dados?</h2>
                                <p className="mb-4">Os dados coletados são utilizados para finalidades específicas e legítimas, tais como:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Gestão da sua conta de associado e liberação de acesso à Área Restrita.</li>
                                    <li>Viabilização de benefícios como Telemedicina, Orientação Jurídica e Seguros.</li>
                                    <li>Inscrição e emissão de certificados para Cursos de Formação (MOPP, Cargas Indivisíveis, etc.).</li>
                                    <li>Envio de comunicados importantes, novidades e promoções de parceiros.</li>
                                    <li>Cumprimento de obrigações legais perante órgãos como Detran e Senatran.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. Compartilhamento de Dados</h2>
                                <p className="mb-4">A Associação Frota Brasil não comercializa seus dados pessoais. Para a prestação dos serviços contratados, podemos compartilhar informações com:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Empresas Parceiras:</strong> Operadoras de telemedicina, seguradoras e redes de benefícios.</li>
                                    <li><strong>Órgãos Oficiais:</strong> Detran e Senatran para validação de cursos e formação profissional.</li>
                                    <li><strong>Prestadores de Serviços:</strong> Empresas de tecnologia que hospedam nosso site e processadores de pagamento.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Cookies e Tecnologias de Rastreamento</h2>
                                <p>Utilizamos cookies para entender como você usa nosso site e personalizar sua navegação. Você pode gerenciar as preferências de cookies diretamente no seu navegador, ciente de que isso pode afetar o funcionamento de algumas áreas do portal.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Segurança da Informação</h2>
                                <p>Implementamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda, destruição ou alteração. O acesso aos dados é restrito apenas a colaboradores autorizados que necessitam das informações para o desempenho de suas funções.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. Seus Direitos (LGPD)</h2>
                                <p className="mb-4">De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Confirmar a existência de tratamento de seus dados.</li>
                                    <li>Acessar, corrigir ou atualizar seus dados pessoais.</li>
                                    <li>Solicitar a exclusão de dados desnecessários ou tratados em desconformidade.</li>
                                    <li>Revogar o consentimento a qualquer momento.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">7. Retenção de Dados</h2>
                                <p>Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas ou para atender requisitos legais e regulatórios.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">8. Contato e Encarregado de Dados (DPO)</h2>
                                <p className="mb-4">Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato com nossos responsáveis:</p>
                                <ul className="list-none space-y-2">
                                    <li><strong>Donner:</strong> (67) 9 8479-6030</li>
                                    <li><strong>Irani:</strong> (67) 9 8467-8018</li>
                                    <li><strong>E-mail:</strong> contato@associacaofrotabrasil.org.br</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">9. Atualizações</h2>
                                <p>Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na legislação. Recomendamos a leitura regular desta página.</p>
                                <p className="mt-4 text-sm text-muted-foreground">Última atualização: 05 de fevereiro de 2026.</p>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
};

export default PoliticaPrivacidade;
