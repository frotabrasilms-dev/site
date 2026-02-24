
import { forwardRef } from 'react';
import { User } from 'lucide-react';

import logoFrota from '../assets/logo-frota-brasil.jpg';
import bandeiraBrasil from '../assets/bandeira-brasil.png';

interface MembershipCardProps {
    name: string;
    cpf: string;
    city: string;
    state: string;
    date: string;
    photoUrl: string | null;
    memberNumber: string;
    apelido?: string; // Optional apelido
}

const MembershipCard = forwardRef<HTMLDivElement, MembershipCardProps>(({
    name,
    cpf,
    city,
    state,
    date,
    photoUrl,
    memberNumber,
    apelido
}, ref) => {
    return (
        <div
            ref={ref}
            className="w-[600px] h-[380px] bg-white border-2 border-green-600 shadow-lg relative overflow-hidden flex flex-col font-sans" // Green border
            style={{ minWidth: '600px', minHeight: '380px' }} // Force size for html2canvas
        >
            {/* Header Section (Green Gradient: Dark -> Light) */}
            <div className="bg-gradient-to-r from-green-900 to-green-500 p-4 flex items-center justify-center text-white h-24 shadow-md gap-4 border-b-4 border-white/10">
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shrink-0 p-1 border border-gray-600">
                    <img
                        src={logoFrota}
                        alt="Logo Frota Brasil"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold uppercase tracking-tight flex-grow text-center text-white text-shadow-sm">
                    Associação Frota Brasil
                </h1>
                <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1">
                    <img
                        src={bandeiraBrasil}
                        alt="Bandeira do Brasil"
                        className="w-full h-full object-contain rounded scale-125"
                    />
                </div>
            </div>

            {/* Body Content */}
            <div className="flex flex-1 p-6 gap-6 relative">
                {/* Photo Section (Left) */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-[140px] h-[175px] bg-gray-100 border-2 border-green-200 rounded-lg overflow-hidden shadow-sm flex items-center justify-center relative">
                        {photoUrl ? (
                            <img
                                src={photoUrl}
                                alt="Foto do Associado"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 text-gray-300" />
                        )}
                    </div>
                    {/* Centered Badge - Green text */}
                    <p className="text-xs text-green-700 font-bold uppercase tracking-widest text-center">
                        ASSOCIADO
                    </p>
                </div>

                {/* Details Section (Right) */}
                <div className="flex-grow space-y-4 pt-2">
                    <div className="pb-1">
                        <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Nome do Associado</p>
                        <h2 className="text-xl font-bold text-gray-900 leading-normal uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[340px] pb-1">{name || 'Nome do Associado'}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-0.5">CPF</p>
                            <p className="text-lg font-semibold text-gray-800 tracking-wide font-mono">
                                {cpf ? cpf.replace(/\D/g, '').replace(/(\d{3})\d{6}(\d{2})/, '$1.******-$2') : '000.******-00'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-0.5">Associado Nº</p>
                            <p className="text-lg font-semibold text-gray-800 tracking-wide">{memberNumber || '000000'}</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-0.5">Cidade / UF</p>
                        <p className="text-lg font-semibold text-gray-800 tracking-wide uppercase leading-tight flex items-center">
                            {city && state ? `${city} - ${state}` : 'Cidade - UF'}
                            {apelido && <span className="text-green-700 ml-6 font-bold">({apelido})</span>}
                        </p>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <img
                        src={logoFrota}
                        alt="Watermark"
                        className="w-48 h-48 object-contain gray-scale"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-6 pb-10 pt-2 flex justify-between items-center text-xs relative z-10">
                <a href="https://www.associacaofrotabrasil.org.br" className="font-bold text-black tracking-wider text-sm font-mono lowercase hover:underline -mb-4">
                    www.associacaofrotabrasil.org.br
                </a>
                <span className="text-black font-mono font-bold -mb-4">ID: Z516K86PR</span>
            </div>
        </div>
    );
});

MembershipCard.displayName = 'MembershipCard';

export default MembershipCard;
