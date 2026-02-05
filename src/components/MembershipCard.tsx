import { forwardRef } from 'react';
import { User } from 'lucide-react';

interface MembershipCardProps {
    name: string;
    cpf: string;
    city: string;
    state: string;
    date: string;
    photoUrl: string | null;
}

const MembershipCard = forwardRef<HTMLDivElement, MembershipCardProps>(({
    name,
    cpf,
    city,
    state,
    date,
    photoUrl
}, ref) => {
    return (
        <div
            ref={ref}
            className="w-[600px] h-[380px] bg-white border-4 border-green-600 rounded-xl shadow-lg relative overflow-hidden flex flex-col font-sans"
            style={{ minWidth: '600px', minHeight: '380px' }} // Force size for html2canvas
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 flex items-center justify-between text-white h-24 shadow-md">
                <h1 className="text-2xl font-black uppercase tracking-wider pl-2 text-shadow-sm">
                    Associação Frota Brasil
                </h1>
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <img
                        src="/lovable-uploads/4a99fc5b-079b-4959-9043-f5f3c42c4848.png"
                        alt="Logo Frota Brasil"
                        className="h-12 w-auto"
                    />
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 -translate-x-1/2 translate-y-1/2"></div>

            {/* Body Content */}
            <div className="flex flex-1 p-6 gap-6 items-center z-10">

                {/* Photo Section (Left) */}
                <div className="flex-shrink-0">
                    <div className="w-[120px] h-[160px] bg-gray-100 border-2 border-green-200 rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
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
                    <p className="text-xs text-center text-gray-400 mt-1 font-medium uppercase tracking-widest">Associado</p>
                </div>

                {/* Details Section (Right) */}
                <div className="flex-grow space-y-4">
                    <div className="border-b border-green-100 pb-2">
                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">Nome do Associado</p>
                        <h2 className="text-xl font-bold text-gray-800 leading-tight truncate max-w-[380px]">{name || 'NOME DO ASSOCIADO'}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">CPF</p>
                            <p className="text-lg font-semibold text-gray-700 tracking-wide">{cpf || '000.000.000-00'}</p>
                        </div>

                        <div>
                            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">Data de Filiação</p>
                            <p className="text-lg font-semibold text-gray-700">{date || '00/00/0000'}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">Cidade / UF</p>
                        <p className="text-lg font-semibold text-gray-700">
                            {city && state ? `${city} - ${state}` : 'Cidade - UF'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / ID Info */}
            <div className="bg-green-50 px-6 py-2 flex justify-between items-center text-xs text-green-800 border-t border-green-100">
                <span className="font-semibold">www.associacaofrotabrasil.org.br</span>
                <span className="font-mono opacity-75">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
        </div>
    );
});

MembershipCard.displayName = 'MembershipCard';

export default MembershipCard;
