import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom";

export const brazilianStates = [
    { name: 'Acre', uf: 'AC', capital: 'Rio Branco', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bandeira_do_Acre.svg' },
    { name: 'Alagoas', uf: 'AL', capital: 'Maceió', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bandeira_de_Alagoas.svg' },
    { name: 'Amapá', uf: 'AP', capital: 'Macapá', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amap%C3%A1.svg' },
    { name: 'Amazonas', uf: 'AM', capital: 'Manaus', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Amazonas.svg' },
    { name: 'Bahia', uf: 'BA', capital: 'Salvador', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg' },
    { name: 'Ceará', uf: 'CE', capital: 'Fortaleza', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Cear%C3%A1.svg' },
    { name: 'Distrito Federal', uf: 'DF', capital: 'Brasília', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg' },
    { name: 'Espírito Santo', uf: 'ES', capital: 'Vitória', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg' },
    { name: 'Goiás', uf: 'GO', capital: 'Goiânia', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_Goi%C3%A1s.svg' },
    { name: 'Maranhão', uf: 'MA', capital: 'São Luís', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Bandeira_do_Maranh%C3%A3o.svg' },
    { name: 'Mato Grosso', uf: 'MT', capital: 'Cuiabá', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Bandeira_de_Mato_Grosso.svg' },
    { name: 'Mato Grosso do Sul', uf: 'MS', capital: 'Campo Grande', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg' },
    { name: 'Minas Gerais', uf: 'MG', capital: 'Belo Horizonte', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg' },
    { name: 'Pará', uf: 'PA', capital: 'Belém', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg' },
    { name: 'Paraíba', uf: 'PB', capital: 'João Pessoa', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bandeira_da_Para%C3%ADba.svg' },
    { name: 'Paraná', uf: 'PR', capital: 'Curitiba', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paran%C3%A1.svg' },
    { name: 'Pernambuco', uf: 'PE', capital: 'Recife', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg' },
    { name: 'Piauí', uf: 'PI', capital: 'Teresina', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Bandeira_do_Piau%C3%AD.svg' },
    { name: 'Rio de Janeiro', uf: 'RJ', capital: 'Rio de Janeiro', flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg' },
    { name: 'Rio Grande do Norte', uf: 'RN', capital: 'Natal', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Bandeira_do_Rio_Grande_do_Norte.svg' },
    { name: 'Rio Grande do Sul', uf: 'RS', capital: 'Porto Alegre', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg' },
    { name: 'Rondônia', uf: 'RO', capital: 'Porto Velho', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bandeira_de_Rond%C3%B4nia.svg' },
    { name: 'Roraima', uf: 'RR', capital: 'Boa Vista', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bandeira_de_Roraima.svg' },
    { name: 'Santa Catarina', uf: 'SC', capital: 'Florianópolis', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandeira_de_Santa_Catarina.svg' },
    { name: 'São Paulo', uf: 'SP', capital: 'São Paulo', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg' },
    { name: 'Sergipe', uf: 'SE', capital: 'Aracaju', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Sergipe.svg' },
    { name: 'Tocantins', uf: 'TO', capital: 'Palmas', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandeira_do_Tocantins.svg' }
];

const StateFlagsCarousel = () => {
    return (
        <div className="w-full max-w-2xl mx-auto px-10">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    startIndex: 11, // MS Index
                }}
                className="w-full"
            >
                <CarouselContent>
                    {brazilianStates.map((state, index) => (
                        <CarouselItem key={index} className="basis-full pl-4">
                            <Link to={`/apoiadores/${state.uf}`} className="block h-full group">
                                <div className="p-1 h-full">
                                    <div className="flex flex-col items-center justify-center p-6 h-96 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                                        <div className="h-64 w-full flex items-center justify-center mb-6 transform group-hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={state.flag}
                                                alt={`Bandeira de ${state.name}`}
                                                className="max-h-full max-w-full object-contain drop-shadow-md"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="text-2xl font-bold text-center text-gray-700 group-hover:text-primary transition-colors">
                                            {state.name}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="block">
                    <CarouselPrevious className="-left-12 h-16 w-16 border-2 border-primary/20 hover:border-primary hover:bg-primary/10" />
                    <CarouselNext className="-right-12 h-16 w-16 border-2 border-primary/20 hover:border-primary hover:bg-primary/10" />
                </div>
            </Carousel>
        </div>
    );
};

export default StateFlagsCarousel;
