import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ROUTES, ROLES, DRIVER_STATUS } from '@/constants';
import { DriverConnectionCard } from '@/components/dashboard/DriverConnectionCard';
import { LeadCard } from '@/components/driver/LeadCard';
import { Car, Zap, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';

export default async function DriverDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.LOGIN);

  // 1. Fetch user profile to verify role and status
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, driver_status')
    .eq('id', user.id)
    .single();

  if (profile?.role !== ROLES.DRIVER) redirect(ROUTES.PASSENGER_DASHBOARD);
  if (profile?.driver_status !== DRIVER_STATUS.APPROVED) redirect(ROUTES.DRIVER_ONBOARDING);

  // 2. Fetch active connections (My Chats)
  const { data: connections } = await supabase
    .from('connections')
    .select(`
      id,
      created_at,
      passenger:profiles!passenger_id(full_name),
      request:transport_requests(status, description)
    `)
    .eq('driver_id', user.id)
    .order('created_at', { ascending: false });

  // 3. Fetch available leads (Open requests user hasn't connected to)
  // Note: In a real app, we'd filter out requests the driver already connected to.
  // For MVP, we'll just show all open requests.
  const { data: leads } = await supabase
    .from('transport_requests')
    .select('*')
    .eq('status', 'open')
    .neq('user_id', user.id) // Don't show own requests if any
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen bg-neutral-950 py-12 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-roxou/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-roxou mb-3">
            <Car className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Painel do Motorista</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Central de <br /><span className="text-roxou">Operações</span></h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Active Chats Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-roxou" />
                Minhas Conversas
              </h2>
              <span className="bg-roxou/20 text-roxou-light px-2.5 py-1 rounded-lg text-[10px] font-black">
                {connections?.length || 0}
              </span>
            </div>

            {connections && connections.length > 0 ? (
              <div className="space-y-2">
                {connections.map((conn) => (
                  <DriverConnectionCard key={conn.id} connection={conn as any} />
                ))}
              </div>
            ) : (
              <div className="p-10 text-center glass rounded-[32px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Nenhuma conversa ativa</p>
              </div>
            )}
          </div>

          {/* Leads Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Oportunidades
              </h2>
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                <Search className="w-4 h-4" />
                Filtrar Leads
              </div>
            </div>

            {leads && leads.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            ) : (
              <div className="p-20 text-center glass rounded-[40px]">
                <p className="text-neutral-500 font-medium">Não há novos leads disponíveis no momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
