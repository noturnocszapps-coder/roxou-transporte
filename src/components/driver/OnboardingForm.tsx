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
  FileText,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { LegalDisclaimer } from '../LegalDisclaimer';
import { submitDriverOnboarding } from '@/actions/profile';

interface OnboardingFormProps {
  initialStatus: 'pending' | 'approved' | 'rejected' | null;
  userEmail: string;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ initialStatus, userEmail }) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    vehicle_model: '',
    vehicle_plate: '',
    driverdash_id: ''
  });

  const handleFinish = async () => {
    setLoading(true);
    try {
      await submitDriverOnboarding({
        ...formData,
        documents: {
          cnh_url: 'https://picsum.photos/seed/cnh/800/600', // Mock for now
          crlv_url: 'https://picsum.photos/seed/crlv/800/600' // Mock for now
        }
      });
      setStatus('pending');
    } catch (error: any) {
      alert(error.message || 'Erro ao enviar cadastro');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'pending') {
    return (
      <div className="text-center py-16 px-8 glass rounded-[40px] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-roxou/20 blur-[120px] rounded-full" />
        </div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-roxou/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-roxou/20">
            <Clock className="w-12 h-12 text-roxou-light" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">Documentos em Análise</h2>
          <p className="text-neutral-500 max-w-md mx-auto leading-relaxed mb-10 font-medium">
            Recebemos suas informações! Nossa equipe está revisando seus documentos para garantir a segurança da plataforma. 
            Você receberá um e-mail em <span className="font-black text-roxou-light">{userEmail}</span> assim que for aprovado.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-roxou/10 text-roxou-light rounded-full text-xs font-black uppercase tracking-widest border border-roxou/20">
            <span className="w-2 h-2 bg-roxou rounded-full animate-pulse" />
            Tempo estimado: 24-48 horas
          </div>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="text-center py-16 px-8 glass rounded-[40px] border border-rose-500/10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
            <AlertCircle className="w-12 h-12 text-rose-500" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">Cadastro não Aprovado</h2>
          <p className="text-neutral-500 max-w-md mx-auto leading-relaxed mb-10 font-medium">
            Infelizmente não pudemos aprovar seu cadastro neste momento. Verifique se os documentos enviados estão legíveis e dentro do prazo de validade.
          </p>
          <button 
            onClick={() => setStatus(null)}
            className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-roxou hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-[40px] overflow-hidden relative">
      {/* Progress Bar */}
      <div className="h-2 w-full bg-white/5 flex relative z-10">
        <div 
          className="h-full bg-roxou transition-all duration-700 ease-out shadow-[0_0_20px_rgba(124,58,237,0.5)]" 
          style={{ width: `${(step / 3) * 100}%` }} 
        />
      </div>

      <div className="p-8 md:p-14 relative z-10">
        <header className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-roxou-light mb-3 block">Passo {step} de 3</span>
          <h2 className="text-4xl font-black tracking-tight text-white uppercase">
            {step === 1 && "Dados do Motorista"}
            {step === 2 && "Informações do Veículo"}
            {step === 3 && "Upload de Documentos"}
          </h2>
        </header>

        <form className="space-y-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4 text-roxou" /> Nome Completo
                </label>
                <input 
                  type="text" 
                  placeholder="Como no seu documento"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-roxou/20 focus:border-roxou outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="(18) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-roxou/20 focus:border-roxou outline-none transition-all font-medium"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <Car className="w-4 h-4 text-roxou" /> Modelo do Veículo
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Toyota Corolla 2022 Prata"
                  value={formData.vehicle_model}
                  onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-roxou/20 focus:border-roxou outline-none transition-all font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Placa</label>
                  <input 
                    type="text" 
                    placeholder="ABC1D23"
                    value={formData.vehicle_plate}
                    onChange={(e) => setFormData({ ...formData, vehicle_plate: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-roxou/20 focus:border-roxou outline-none transition-all uppercase font-black tracking-widest"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">ID DriverDash (Opcional)</label>
                  <input 
                    type="text" 
                    placeholder="Seu ID externo"
                    value={formData.driverdash_id}
                    onChange={(e) => setFormData({ ...formData, driverdash_id: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-roxou/20 focus:border-roxou outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="p-10 border-2 border-dashed border-white/10 rounded-[32px] hover:border-roxou/40 transition-all cursor-pointer group bg-white/5 hover:bg-roxou/5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-roxou/20 transition-all border border-white/5 group-hover:border-roxou/20">
                    <Upload className="w-8 h-8 text-neutral-500 group-hover:text-roxou-light" />
                  </div>
                  <p className="font-black text-white uppercase tracking-tight mb-2">Upload da CNH</p>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Arraste ou clique para selecionar</p>
                </div>
              </div>

              <div className="p-10 border-2 border-dashed border-white/10 rounded-[32px] hover:border-roxou/40 transition-all cursor-pointer group bg-white/5 hover:bg-roxou/5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-roxou/20 transition-all border border-white/5 group-hover:border-roxou/20">
                    <FileText className="w-8 h-8 text-neutral-500 group-hover:text-roxou-light" />
                  </div>
                  <p className="font-black text-white uppercase tracking-tight mb-2">Upload do CRLV</p>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Documento do veículo atualizado</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="pt-10 flex items-center justify-between border-t border-white/5">
            {step > 1 ? (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all"
              >
                Voltar
              </button>
            ) : <div />}

            <button 
              type="button"
              onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
              disabled={loading}
              className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-roxou hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {step === 3 ? "Finalizar Cadastro" : "Próximo Passo"} <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-14">
          <LegalDisclaimer variant="compact" />
        </div>
      </div>
    </div>
  );
};
