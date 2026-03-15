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
    <main className="min-h-screen bg-neutral-950 py-12 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-roxou/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-roxou mb-3">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Minhas <br /><span className="text-roxou">Viagens</span></h1>
          </div>
          
          <Link 
            href="/request/new" 
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-roxou hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Solicitação
          </Link>
        </header>

        {requests && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <PassengerRequestCard key={req.id} request={req as any} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-[40px] p-16 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-white/10">
              <PlusCircle className="w-12 h-12 text-neutral-700" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Nenhuma viagem <br />encontrada</h2>
            <p className="text-neutral-500 mb-10 max-w-xs mx-auto text-sm font-medium leading-relaxed">
              Você ainda não criou nenhuma solicitação de transporte para seus eventos.
            </p>
            <Link 
              href="/request/new"
              className="inline-flex bg-roxou text-white px-10 py-5 rounded-2xl font-black uppercase tracking-tight hover:bg-roxou-dark transition-all shadow-xl shadow-roxou/20"
            >
              Começar Agora
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
