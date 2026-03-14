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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-xl shadow-neutral-200/50 border border-neutral-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Bem-vindo ao Roxou</h1>
          <p className="text-neutral-500">Sua conexão segura para transporte em eventos.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 text-neutral-700 py-4 rounded-2xl font-bold hover:bg-neutral-50 transition-all disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {loading ? 'Carregando...' : 'Entrar com Google'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-neutral-400 font-bold tracking-widest">Acesso Rápido</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-2xl text-center">
              <User className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-neutral-600">Passageiros</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-2xl text-center">
              <Car className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-neutral-600">Motoristas</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-neutral-400 leading-relaxed">
          Ao entrar, você concorda com nossos <br />
          <span className="text-neutral-900 font-bold">Termos de Uso</span> e <span className="text-neutral-900 font-bold">Privacidade</span>.
        </p>
      </motion.div>
    </div>
  );
}
