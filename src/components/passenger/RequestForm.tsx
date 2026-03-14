'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { LegalDisclaimer } from '../LegalDisclaimer';

interface RequestFormProps {
  prefilledEvent?: {
    id: string;
    name: string;
    location: string;
    date: string;
  };
}

export const RequestForm: React.FC<RequestFormProps> = ({ prefilledEvent }) => {
  const [hasReturn, setHasReturn] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          <header className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Solicitar Transporte</h2>
            <p className="text-neutral-500">Preencha os detalhes para que motoristas possam te encontrar.</p>
          </header>

          {/* Event Summary (Prefilled) */}
          {prefilledEvent && (
            <div className="mb-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">
                <Calendar className="w-3 h-3" /> Evento Selecionado
              </div>
              <h3 className="text-xl font-bold mb-1">{prefilledEvent.name}</h3>
              <p className="text-sm text-neutral-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {prefilledEvent.location}
              </p>
              <p className="text-sm text-neutral-600 flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4" /> {new Date(prefilledEvent.date).toLocaleString('pt-BR')}
              </p>
            </div>
          )}

          <form className="space-y-8">
            {/* Hidden Fields for Prefilled Data */}
            <input type="hidden" name="eventId" value={prefilledEvent?.id} />
            <input type="hidden" name="eventName" value={prefilledEvent?.name} />
            <input type="hidden" name="eventLocation" value={prefilledEvent?.location} />
            <input type="hidden" name="eventDate" value={prefilledEvent?.date} />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Ponto de Partida</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
                  <input 
                    name="origin"
                    type="text" 
                    placeholder="Ex: Jd. Bongiovani"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Horário de Saída</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
                  <input 
                    name="departureTime"
                    type="time" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Notas Adicionais (Opcional)</label>
              <textarea 
                name="notes"
                placeholder="Ex: Somos 3 pessoas, dividimos o valor."
                rows={3}
                className="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
              <input 
                type="checkbox" 
                id="hasReturn" 
                name="hasReturn"
                checked={hasReturn}
                onChange={(e) => setHasReturn(e.target.checked)}
                className="w-5 h-5 rounded-lg border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="hasReturn" className="text-sm font-medium text-neutral-700 cursor-pointer">
                Preciso de transporte para a volta também
              </label>
            </div>

            <div className="space-y-4 pt-6 border-t border-neutral-100">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="legalAccepted" 
                  name="legalAccepted"
                  checked={legalAccepted}
                  onChange={(e) => setLegalAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded-lg border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="legalAccepted" className="text-xs text-neutral-500 leading-relaxed cursor-pointer">
                  Eu entendo que o Roxou Transporte é apenas uma ferramenta de conexão. 
                  Toda a negociação de valores, segurança e execução do transporte é de responsabilidade direta entre mim e o motorista.
                </label>
              </div>

              <button 
                type="submit"
                disabled={!legalAccepted}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  legalAccepted 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none'
                }`}
              >
                Publicar Solicitação <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-10">
            <LegalDisclaimer variant="compact" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 justify-center text-neutral-400 text-xs">
        <Info className="w-4 h-4" /> Sua solicitação ficará visível para motoristas aprovados na plataforma.
      </div>
    </div>
  );
};
