'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { LogIn, ShieldCheck, Car, User } from 'lucide-react';
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-roxou/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass rounded-[40px] p-10 md:p-12 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-roxou rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-roxou/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Roxou<span className="text-roxou">.</span></h1>
          <p className="text-neutral-400 text-sm font-medium">Sua conexão premium para eventos.</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-neutral-200 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {loading ? 'Carregando...' : 'Entrar com Google'}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
              <span className="bg-neutral-950/50 backdrop-blur-sm px-4 text-neutral-500">Acesso Seguro</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-2xl text-center group hover:bg-white/10 transition-colors">
              <User className="w-6 h-6 text-neutral-500 mx-auto mb-2 group-hover:text-roxou transition-colors" />
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Passageiros</p>
            </div>
            <div className="p-4 glass rounded-2xl text-center group hover:bg-white/10 transition-colors">
              <Car className="w-6 h-6 text-neutral-500 mx-auto mb-2 group-hover:text-roxou transition-colors" />
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Motoristas</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-[10px] text-neutral-500 leading-relaxed uppercase tracking-widest font-bold">
          Ao entrar, você concorda com nossos <br />
          <span className="text-white">Termos de Uso</span> e <span className="text-white">Privacidade</span>.
        </p>
      </motion.div>
    </div>
  );
}
