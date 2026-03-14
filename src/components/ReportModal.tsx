'use client';

import React, { useState } from 'react';
import { createReport } from '@/actions/moderation';
import { REPORT_REASONS } from '@/constants';
import { AlertTriangle, X, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedId: string;
  contextType: 'chat' | 'connection' | 'request';
  contextId: string;
  reportedName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  reportedId,
  contextType,
  contextId,
  reportedName
}) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setIsSubmitting(true);
    try {
      await createReport({
        reported_id: reportedId,
        reason,
        details,
        context_type: contextType,
        context_id: contextId
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setReason('');
        setDetails('');
      }, 2000);
    } catch (error: any) {
      alert(error.message || 'Erro ao enviar denúncia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Denúncia Enviada</h3>
                <p className="text-neutral-500">Nossa equipe de moderação analisará o caso em breve.</p>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">Denunciar</h3>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{reportedName}</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Motivo</label>
                    <select
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-4 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm appearance-none bg-white"
                    >
                      <option value="">Selecione um motivo...</option>
                      <option value={REPORT_REASONS.INAPPROPRIATE_BEHAVIOR}>Comportamento Inadequado</option>
                      <option value={REPORT_REASONS.HARASSMENT}>Assédio</option>
                      <option value={REPORT_REASONS.SCAM}>Fraude / Golpe</option>
                      <option value={REPORT_REASONS.SAFETY_CONCERN}>Preocupação com Segurança</option>
                      <option value={REPORT_REASONS.NO_SHOW}>Não comparecimento</option>
                      <option value={REPORT_REASONS.OTHER}>Outro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Detalhes (Opcional)</label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Descreva o que aconteceu..."
                      className="w-full h-32 p-4 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !reason}
                    className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-xl shadow-rose-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar Denúncia'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
