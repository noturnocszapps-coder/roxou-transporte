'use client';

import React, { useState } from 'react';
import { resolveReport } from '@/actions/moderation';
import { MODERATION_ACTIONS } from '@/constants';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle, Loader2, Ban, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModerationActionFormProps {
  reportId: string;
}

export const ModerationActionForm: React.FC<ModerationActionFormProps> = ({ reportId }) => {
  const [action, setAction] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action || !notes) return;

    setIsSubmitting(true);
    try {
      await resolveReport({
        report_id: reportId,
        action: action as any,
        notes
      });
      router.push('/admin/reports');
    } catch (error: any) {
      alert(error.message || 'Erro ao processar ação');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          Ação de Moderação
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setAction(MODERATION_ACTIONS.RESOLVE)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              action === MODERATION_ACTIONS.RESOLVE 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Resolver</span>
          </button>

          <button
            type="button"
            onClick={() => setAction(MODERATION_ACTIONS.WARN)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              action === MODERATION_ACTIONS.WARN 
                ? 'border-amber-500 bg-amber-50 text-amber-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Advertir</span>
          </button>

          <button
            type="button"
            onClick={() => setAction(MODERATION_ACTIONS.SUSPEND)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              action === MODERATION_ACTIONS.SUSPEND 
                ? 'border-orange-500 bg-orange-50 text-orange-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Suspender</span>
          </button>

          <button
            type="button"
            onClick={() => setAction(MODERATION_ACTIONS.BLOCK)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              action === MODERATION_ACTIONS.BLOCK 
                ? 'border-rose-500 bg-rose-50 text-rose-700' 
                : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'
            }`}
          >
            <Ban className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Bloquear</span>
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Justificativa da Ação</label>
          <textarea
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Descreva o motivo da decisão e as evidências encontradas..."
            className="w-full h-32 p-4 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
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
          disabled={isSubmitting || !action || !notes}
          className="bg-neutral-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-xl shadow-neutral-200 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          Aplicar Medida
        </button>
      </div>
    </form>
  );
};
