import { Ban, Mail } from 'lucide-react';
import Link from 'next/link';

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-xl shadow-neutral-200/50 text-center border border-neutral-100">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 text-rose-500">
          <Ban className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Conta Suspensa</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Sua conta foi suspensa por violar nossos termos de uso ou diretrizes da comunidade.
        </p>
        
        <div className="p-6 bg-neutral-50 rounded-2xl mb-8 text-left">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">O que fazer?</p>
          <p className="text-sm text-neutral-600">
            Se você acredita que isso foi um erro, entre em contato com nosso suporte através do email:
          </p>
          <a 
            href="mailto:suporte@roxou.com.br" 
            className="text-indigo-600 font-bold text-sm mt-2 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> suporte@roxou.com.br
          </a>
        </div>

        <Link
          href="/"
          className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
