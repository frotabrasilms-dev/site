import { forwardRef } from 'react';
import { User, ShieldCheck } from 'lucide-react';
import logoFrota from '../assets/logo-frota-brasil.jpg';
import bandeiraBrasil from '../assets/bandeira-brasil.png';

interface SupervisorCardProps {
    name: string;
    cpf: string;
    role: string;
    city: string;
    state: string;
    date: string;
    photoUrl: string | null;
    memberNumber: string;
}

const SupervisorCard = forwardRef<HTMLDivElement, SupervisorCardProps>(({
    name,
    cpf,
    role,
    city,
    state,
    date,
    photoUrl,
    memberNumber
}, ref) => {
    return (
        <div
            ref={ref}
            className="w-[600px] h-[380px] bg-zinc-950 border-4 border-yellow-500 rounded-xl shadow-2xl relative overflow-hidden flex flex-col font-sans text-white"
            style={{ minWidth: '600px', minHeight: '380px' }}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-4 flex items-center justify-center h-24 shadow-md gap-4 relative z-10">
                <img
                    src={logoFrota}
                    alt="Símbolo Frota Brasil"
                    className="h-14 w-auto drop-shadow-md"
                />
                <div className="text-center">
                    <h1 className="text-2xl font-black uppercase tracking-wider text-black drop-shadow-sm">
                        Associação Frota Brasil
                    </h1>
                    <div className="text-white text-sm font-bold mt-2 uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {role?.startsWith('Diretor') ? 'Diretor(a)' : 'Membro Nomeado'}
                    </div>
                </div>
                <img
                    src={bandeiraBrasil}
                    alt="Bandeira do Brasil"
                    className="h-12 w-auto rounded shadow-sm drop-shadow-md"
                />
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black opacity-90 -z-10"></div>

            {/* Body Content */}
            <div className="flex flex-1 p-6 gap-6 items-center z-10 relative">

                {/* Photo Section (Left) */}
                <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-lg blur opacity-50"></div>
                    <div className="w-[120px] h-[160px] bg-zinc-900 border-2 border-yellow-500/50 rounded-lg overflow-hidden shadow-xl flex items-center justify-center relative">
                        {photoUrl ? (
                            <img
                                src={photoUrl}
                                alt="Foto do Supervisor"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 text-zinc-700" />
                        )}
                    </div>
                    <div className="mt-2 text-center">
                        <ShieldCheck className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Autoridade</p>
                    </div>
                </div>

                {/* Details Section (Right) */}
                <div className="flex-grow space-y-3">
                    <div className="border-b border-yellow-500/30 pb-2">
                        <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-0.5">
                            {role?.startsWith('Diretor') ? 'Nome do Diretor(a)' : 'Nome do Nomeado'}
                        </p>
                        <h2 className="text-xl font-bold text-white leading-tight pb-1 truncate max-w-[380px] tracking-wide">{name || 'NOME DO SUPERVISOR'}</h2>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col justify-center">
                            <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-2">Cargo / Função</p>
                            <p className="text-sm font-bold text-white tracking-wide uppercase bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 inline-block text-center w-full truncate">
                                {role || 'SUBDELEGADO'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-0.5">CPF</p>
                            <p className="text-lg font-semibold text-zinc-300 tracking-wide font-mono">
                                {cpf ? cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.******-$4') : '000.******-00'}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-0.5">Matrícula Nº</p>
                            <p className="text-lg font-semibold text-zinc-300 font-mono">{memberNumber || '000000'}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-0.5">Jurisdição</p>
                        <p className="text-base font-semibold text-zinc-300">
                            {city && state ? `${city} - ${state}` : 'Cidade - UF'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-yellow-500 px-6 py-2 flex justify-between items-center text-xs border-t border-yellow-600 relative z-10">
                <span className="font-bold text-black uppercase tracking-widest text-[10px]">Válido em todo território nacional</span>
                <span className="font-mono text-black font-bold opacity-80">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
        </div >
    );
});

SupervisorCard.displayName = 'SupervisorCard';

export default SupervisorCard;
