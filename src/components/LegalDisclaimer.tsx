import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'compact' | 'full';
}

export const LegalDisclaimer: React.FC<DisclaimerProps> = ({ variant = 'full' }) => {
  return (
    <div className={`bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 ${variant === 'compact' ? 'text-[9px]' : 'text-[11px]'} text-amber-500/70`}>
      <div className="flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-amber-500/60 shrink-0" />
        <div>
          <p className="font-black mb-2 uppercase tracking-[0.2em] text-amber-500">Aviso Legal — Roxou</p>
          <p className="leading-relaxed font-bold uppercase tracking-widest opacity-80">
            O Roxou Transporte é uma plataforma de conexão e comunicação. 
            <span className="text-amber-500"> Não operamos corridas, não definimos preços e não garantimos disponibilidade.</span> 
            Toda negociação e acordo é realizado diretamente entre passageiro e motorista. 
            A plataforma atua exclusivamente como camada de facilitação de contato.
          </p>
        </div>
      </div>
    </div>
  );
};
