import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900">Roxou Transporte</h1>
        <p className="text-neutral-500">A plataforma que conecta você ao seu próximo evento com segurança e praticidade.</p>
        
        <div className="grid gap-4">
          <Link 
            href={ROUTES.LOGIN}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Entrar / Cadastrar
          </Link>
          <Link 
            href={ROUTES.PASSENGER_DASHBOARD}
            className="bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-2xl font-bold hover:bg-neutral-50 transition-all"
          >
            Sou Passageiro
          </Link>
          <Link 
            href={ROUTES.DRIVER_DASHBOARD}
            className="bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-2xl font-bold hover:bg-neutral-50 transition-all"
          >
            Sou Motorista
          </Link>
        </div>
      </div>
    </main>
  );
}
