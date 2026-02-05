import DonnerImage from '../assets/donner-de-souza.jpeg';

import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-12 bg-white flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">

          {/* Donner de Souza Image and Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">CAMINHONEIRO</h1>
            <div className="flex justify-center mb-6">
              <Link to="/sobre#galeria" className="block w-full max-w-xl transition-transform hover:scale-[1.02]">
                <img src={DonnerImage} alt="Donner de Souza" className="rounded-lg shadow-xl w-full" />
              </Link>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              Donner de Souza<br />Presidente
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;