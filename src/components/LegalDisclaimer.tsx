import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'compact' | 'full';
}

export const LegalDisclaimer: React.FC<DisclaimerProps> = ({ variant = 'full' }) => {
  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${variant === 'compact' ? 'text-xs' : 'text-sm'} text-amber-800`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1 uppercase tracking-wider">Aviso Legal - Roxou Transporte</p>
          <p className="leading-relaxed">
            O Roxou Transporte é uma plataforma de conexão e comunicação. 
            <strong> Não operamos corridas, não definimos preços e não garantimos disponibilidade.</strong> 
            Toda negociação e acordo é realizado diretamente entre passageiro e motorista. 
            A plataforma atua exclusivamente como camada de facilitação de contato.
          </p>
        </div>
      </div>
    </div>
  );
};
