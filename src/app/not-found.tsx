import { Search, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-xl shadow-neutral-200/50 text-center border border-neutral-100">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-500">
          <Search className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Página não encontrada</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          O caminho que você está procurando não existe ou foi movido.
        </p>
        
        <Link
          href="/"
          className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all"
        >
          <Home className="w-4 h-4" /> Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
