import { forwardRef } from 'react';
import logoFrota from '../assets/logo-frota-brasil.jpg';

interface NominationCertificateProps {
    name: string;
    cpf: string;
    role: string;
    city: string;
    state: string;
    date: string;
    nominationDate: string;
    rg?: string;
    memberNumber?: string;
}

const NominationCertificate = forwardRef<HTMLDivElement, NominationCertificateProps>(({
    name,
    cpf,
    role,
    city,
    state,
    date,
    nominationDate,
    rg,
    memberNumber
}, ref) => {
    return (
        <div
            ref={ref}
            className="w-[1123px] h-[794px] bg-white text-slate-900 font-sans relative p-16 flex flex-col items-center justify-between shadow-2xl overflow-hidden"
            style={{ minWidth: '1123px', minHeight: '794px' }} // A4 Landscape @ 96 DPI (approx)
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
                <img src={logoFrota} alt="Watermark" className="w-[600px] grayscale" />
            </div>

            {/* Header */}
            <div className="z-10 text-center w-full relative">
                <div className="absolute top-0 left-0">
                    <img src={logoFrota} alt="Logo" className="h-32 object-contain drop-shadow-sm" />
                </div>
                <div className="absolute top-0 right-0">
                    <img src="/bandeira.jpg" alt="Bandeira do Brasil" className="h-24 object-contain drop-shadow-md" />
                </div>

                <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-slate-900 mb-1 font-serif pt-6">
                    Certificado
                </h1>
                <p className="text-xl text-green-700 font-medium tracking-[0.3em] uppercase mb-4">
                    de Nomeação Oficial
                </p>

                <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="z-10 text-center flex-grow flex flex-col justify-center w-full max-w-5xl mx-auto space-y-4">
                <p className="text-2xl text-slate-600 font-light leading-relaxed">
                    A Presidência da <strong className="font-bold text-slate-900">Associação Frota Brasil</strong>, no uso de suas atribuições estatutárias e legais, confere ao Sr(a).
                </p>

                <div className="relative py-2">
                    <h2 className="text-4xl font-bold text-blue-900 font-serif italic tracking-wide relative z-10 px-8 inline-block">
                        {name}
                    </h2>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-slate-200"></div>
                </div>

                <div className="flex justify-center gap-8 text-sm text-slate-500 uppercase tracking-widest font-medium">
                    <span>CPF: <span className="text-slate-900">{cpf}</span></span>
                    {rg && <span>RG: <span className="text-slate-900">{rg}</span></span>}
                    {memberNumber && <span>Matrícula: <span className="text-slate-900">{memberNumber}</span></span>}
                </div>

                <p className="text-2xl text-slate-600 font-light mt-2">
                    O cargo oficial e as prerrogativas de:
                </p>

                <div className="my-2">
                    <span className="inline-block px-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-3xl font-bold text-yellow-600 uppercase tracking-wider shadow-sm">
                        {role}
                    </span>
                </div>

                <p className="text-lg text-slate-500 mt-1">
                    Com jurisdição e atuação na cidade de <strong className="text-slate-800">{city} - {state}</strong>.
                </p>

                <p className="text-base text-slate-400 mt-4 mb-2">
                    Documento expedido em {new Date(nominationDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </p>
            </div>

            {/* Footer / Signatures */}
            <div className="z-10 w-full flex justify-between items-end pt-4 border-t border-slate-100">
                <div className="text-center w-1/4 opacity-100 relative">
                    {/* Flag moved to top right */}
                </div>

                <div className="text-center w-1/2 relative pb-2">
                    <p className="font-bold text-xl text-slate-900 uppercase tracking-wide">Donner de Souza</p>
                    <p className="text-sm text-yellow-600 font-bold uppercase tracking-[0.2em]">Presidente Nacional</p>
                </div>

                <div className="text-center w-1/4 opacity-60">
                    <div className="w-24 h-24 border-4 border-double border-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase text-center leading-tight">Selo<br />Oficial<br />AFB</span>
                    </div>
                </div>
            </div>

            {/* Corner Accents - decorative svgs */}
            <svg className="absolute bottom-0 left-0 w-32 h-32 text-yellow-500 opacity-80" viewBox="0 0 100 100">
                <path d="M0 100 L0 0 L100 100 Z" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-32 h-32 text-slate-900 opacity-80" viewBox="0 0 100 100">
                <path d="M100 100 L0 100 L100 0 Z" fill="currentColor" />
            </svg>

        </div>
    );
});

NominationCertificate.displayName = 'NominationCertificate';

export default NominationCertificate;
