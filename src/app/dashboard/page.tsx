import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ROUTES, ROLES } from '@/constants';
import { PassengerRequestCard } from '@/components/dashboard/PassengerRequestCard';
import { PlusCircle, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default async function PassengerDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.LOGIN);

  // 1. Fetch user profile to verify role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role === ROLES.DRIVER) redirect(ROUTES.DRIVER_DASHBOARD);

  // 2. Fetch requests with connections and driver profiles
  const { data: requests, error } = await supabase
    .from('transport_requests')
    .select(`
      *,
      connections:connections(
        id,
        created_at,
        driver:profiles!driver_id(full_name)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900">Minhas Viagens</h1>
          </div>
          
          <Link 
            href="/request/new" 
            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-neutral-200"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Solicitação
          </Link>
        </header>

        {requests && requests.length > 0 ? (
          <div className="space-y-2">
            {requests.map((req) => (
              <PassengerRequestCard key={req.id} request={req as any} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-12 text-center border border-neutral-100 shadow-sm">
            <div className="w-20 h-20 bg-neutral-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
              <PlusCircle className="w-10 h-10 text-neutral-300" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Nenhuma viagem criada</h2>
            <p className="text-neutral-500 mb-8 max-w-xs mx-auto">
              Você ainda não criou nenhuma solicitação de transporte para eventos.
            </p>
            <Link 
              href="/request/new"
              className="inline-flex bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Começar Agora
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
