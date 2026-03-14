import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';
import { RequestForm } from '@/components/passenger/RequestForm';
import { CalendarPlus } from 'lucide-react';

export default async function NewRequestPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.LOGIN);

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-indigo-600 mb-2">
            <CalendarPlus className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Nova Viagem</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900">Para onde vamos?</h1>
          <p className="text-neutral-500 mt-2">Preencha os detalhes do evento para que os motoristas possam te encontrar.</p>
        </header>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-neutral-200/50 border border-neutral-100">
          <RequestForm />
        </div>
      </div>
    </main>
  );
}
