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
    <main className="min-h-screen bg-bg py-12 px-6 relative overflow-hidden selection:bg-roxou/30">
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-roxou/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 text-roxou mb-4">
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Central de Comando</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase font-display leading-[0.9]">Minhas <br /><span className="text-roxou">Viagens</span></h1>
          </div>
          
          <Link 
            href="/request/new" 
            className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-roxou hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95"
          >
            <PlusCircle className="w-6 h-6" />
            Nova Solicitação
          </Link>
        </header>

        {requests && requests.length > 0 ? (
          <div className="grid gap-6">
            {requests.map((req) => (
              <PassengerRequestCard key={req.id} request={req as any} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-20 text-center border-dashed border-white/10">
            <div className="w-28 h-28 bg-white/[0.02] rounded-[40px] flex items-center justify-center mx-auto mb-10 border border-white/5 shadow-inner">
              <PlusCircle className="w-14 h-14 text-neutral-800" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-6 font-display">Nenhuma viagem <br />agendada</h2>
            <p className="text-neutral-500 mb-12 max-w-sm mx-auto text-base font-medium leading-relaxed">
              Sua agenda está vazia. Que tal planejar sua próxima ida a um evento com a Roxou?
            </p>
            <Link 
              href="/request/new"
              className="inline-flex roxou-gradient text-white px-12 py-6 rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl roxou-glow"
            >
              Começar Agora
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
