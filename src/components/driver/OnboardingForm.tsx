'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Car, 
  User, 
  FileText 
} from 'lucide-react';
import { motion } from 'motion/react';
import { LegalDisclaimer } from '../LegalDisclaimer';

interface OnboardingFormProps {
  initialStatus: 'pending' | 'approved' | 'rejected' | null;
  userEmail: string;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ initialStatus, userEmail }) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(initialStatus);

  if (status === 'pending') {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-[32px] border border-neutral-100 shadow-sm">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Documentos em Análise</h2>
        <p className="text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
          Recebemos suas informações! Nossa equipe está revisando seus documentos para garantir a segurança da plataforma. 
          Você receberá um e-mail em <span className="font-bold text-neutral-900">{userEmail}</span> assim que for aprovado.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          Tempo estimado: 24-48 horas
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-[32px] border border-red-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Cadastro não Aprovado</h2>
        <p className="text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
          Infelizmente não pudemos aprovar seu cadastro neste momento. Verifique se os documentos enviados estão legíveis e dentro do prazo de validade.
        </p>
        <button 
          onClick={() => setStatus(null)}
          className="bg-neutral-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-neutral-800 transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-neutral-100 flex">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500" 
          style={{ width: `${(step / 3) * 100}%` }} 
        />
      </div>

      <div className="p-8 md:p-12">
        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 block">Passo {step} de 3</span>
          <h2 className="text-3xl font-bold tracking-tight">
            {step === 1 && "Dados do Motorista"}
            {step === 2 && "Informações do Veículo"}
            {step === 3 && "Upload de Documentos"}
          </h2>
        </header>

        <form className="space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Nome Completo
                </label>
                <input 
                  type="text" 
                  placeholder="Como no seu documento"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="(18) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <Car className="w-4 h-4" /> Modelo do Veículo
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Toyota Corolla 2022 Prata"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700">Placa</label>
                  <input 
                    type="text" 
                    placeholder="ABC1D23"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700">ID DriverDash (Opcional)</label>
                  <input 
                    type="text" 
                    placeholder="Seu ID externo"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="p-6 border-2 border-dashed border-neutral-200 rounded-2xl hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                    <Upload className="w-6 h-6 text-neutral-400 group-hover:text-indigo-600" />
                  </div>
                  <p className="font-bold mb-1">Upload da CNH</p>
                  <p className="text-xs text-neutral-500">Arraste ou clique para selecionar (JPG, PNG ou PDF)</p>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-neutral-200 rounded-2xl hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                    <FileText className="w-6 h-6 text-neutral-400 group-hover:text-indigo-600" />
                  </div>
                  <p className="font-bold mb-1">Upload do CRLV</p>
                  <p className="text-xs text-neutral-500">Documento do veículo atualizado</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="pt-8 flex items-center justify-between border-t border-neutral-100">
            {step > 1 ? (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Voltar
              </button>
            ) : <div />}

            <button 
              type="button"
              onClick={() => step < 3 ? setStep(step + 1) : setStatus('pending')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              {step === 3 ? "Finalizar Cadastro" : "Próximo Passo"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-12">
          <LegalDisclaimer variant="compact" />
        </div>
      </div>
    </div>
  );
};
