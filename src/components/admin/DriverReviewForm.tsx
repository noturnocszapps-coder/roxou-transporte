'use client';

import React, { useState } from 'react';
import { updateDriverApplication } from '@/actions/admin';
import { DRIVER_STATUS } from '@/constants';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DriverReviewFormProps {
  driverId: string;
  initialStatus: string;
  initialNotes: string;
}

export const DriverReviewForm: React.FC<DriverReviewFormProps> = ({ 
  driverId, 
  initialStatus, 
  initialNotes 
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateDriverApplication(driverId, status as any, notes);
      router.push('/admin/dashboard');
    } catch (error: any) {
      alert(error.message || 'Erro ao atualizar aplicação');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Decisão de Aprovação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setStatus(DRIVER_STATUS.APPROVED)}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
              status === DRIVER_STATUS.APPROVED 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Aprovar Motorista
          </button>

          <button
            type="button"
            onClick={() => setStatus(DRIVER_STATUS.REJECTED)}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
              status === DRIVER_STATUS.REJECTED 
                ? 'border-rose-500 bg-rose-50 text-rose-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <XCircle className="w-5 h-5" />
            Rejeitar Aplicação
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Notas Internas / Motivo da Rejeição
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Adicione observações sobre os documentos ou o motivo da decisão..."
            className="w-full h-32 p-4 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 rounded-2xl font-bold text-neutral-500 hover:bg-neutral-100 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-neutral-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-neutral-200 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          Salvar Decisão
        </button>
      </div>
    </form>
  );
};
