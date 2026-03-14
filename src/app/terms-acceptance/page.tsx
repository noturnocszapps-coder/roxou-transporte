'use client';

import React, { useState } from 'react';
import { LegalDisclaimer } from '@/components/LegalDisclaimer';
import { acceptTerms } from '@/actions/profile';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function TermsAcceptancePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptTerms();
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error accepting terms:', error);
      alert('Erro ao aceitar termos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[40px] p-12 shadow-xl shadow-neutral-200/50 border border-neutral-100"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Termos e Condições</h1>
            <p className="text-sm text-neutral-500">Para continuar, precisamos que você aceite nossos termos.</p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="prose prose-sm text-neutral-600 max-h-60 overflow-y-auto p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
            <h3 className="text-neutral-900 font-bold mb-2">1. Natureza do Serviço</h3>
            <p>O Roxou Transporte é uma plataforma de intermediação. Não somos uma empresa de transporte e não possuímos frota própria.</p>
            
            <h3 className="text-neutral-900 font-bold mb-2 mt-4">2. Responsabilidade</h3>
            <p>Toda e qualquer negociação de valores, horários e locais é de responsabilidade exclusiva entre o passageiro e o motorista.</p>
            
            <h3 className="text-neutral-900 font-bold mb-2 mt-4">3. Segurança</h3>
            <p>Recomendamos que passageiros verifiquem a identidade do motorista e as condições do veículo antes de iniciar qualquer viagem.</p>
          </div>

          <LegalDisclaimer />
        </div>

        <button
          onClick={handleAccept}
          disabled={loading}
          className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Aceitar e Continuar <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </motion.div>
    </div>
  );
}
