import Layout from '@/components/Layout';

const EFB = () => {
    return (
        <Layout>
            <div className="bg-background min-h-screen pb-20">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <img src="/efb-hero.jpg" alt="EFB Nossa Jornada" className="w-full h-auto shadow-md mb-6 rounded-lg" />
                    <img src="/efb-welcome.jpg" alt="Bem-vindo ao Time EFB" className="w-full h-auto shadow-md mb-6 rounded-lg" />
                    <img src="/efb-about.jpg" alt="Sobre a EFB" className="w-full h-auto shadow-md mb-6 rounded-lg" />
                    <img src="/efb-thankyou.jpg" alt="Muito obrigado" className="w-full h-auto shadow-md rounded-lg" />
                </div>
            </div>
        </Layout>
    );
};

export default EFB;
