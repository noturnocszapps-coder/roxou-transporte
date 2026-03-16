'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { LogIn, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${baseUrl}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Login error:', error.message);
      alert('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 overflow-hidden relative selection:bg-primary/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 md:p-14 relative z-10"
      >
        <div className="text-center mb-14">
          <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-primary/20">
            <BarChart3 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-3 font-display">Rota<span className="text-primary">Lucro</span></h1>
          <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.3em]">Logistics Intelligence Platform</p>
        </div>

        <div className="space-y-8">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-white/5"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {loading ? 'Carregando...' : 'Entrar com Google'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
              <span className="bg-bg/50 backdrop-blur-sm px-6 text-neutral-600">Acesso Seguro</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 glass rounded-[24px] text-center group hover:bg-white/5 transition-all cursor-default border border-white/5 hover:border-primary/20">
              <TrendingUp className="w-7 h-7 text-neutral-600 mx-auto mb-3 group-hover:text-primary transition-colors" />
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">Ganhos</p>
            </div>
            <div className="p-6 glass rounded-[24px] text-center group hover:bg-white/5 transition-all cursor-default border border-white/5 hover:border-primary/20">
              <ShieldCheck className="w-7 h-7 text-neutral-600 mx-auto mb-3 group-hover:text-primary transition-colors" />
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">Segurança</p>
            </div>
          </div>
        </div>

        <p className="mt-14 text-center text-[9px] text-neutral-600 leading-relaxed uppercase tracking-[0.2em] font-black">
          Ao entrar, você concorda com nossos <br />
          <span className="text-white hover:text-primary cursor-pointer transition-colors">Termos de Uso</span> e <span className="text-white hover:text-primary cursor-pointer transition-colors">Privacidade</span>.
        </p>
      </motion.div>
    </div>
  );
}
