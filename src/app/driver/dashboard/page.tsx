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
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Car className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Painel do Motorista</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900">Central de Operações</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Chats Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Minhas Conversas
              </h2>
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                {connections?.length || 0}
              </span>
            </div>

            {connections && connections.length > 0 ? (
              <div className="space-y-1">
                {connections.map((conn) => (
                  <DriverConnectionCard key={conn.id} connection={conn as any} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-[32px] border border-neutral-100 shadow-sm">
                <p className="text-xs text-neutral-400">Nenhuma conversa ativa no momento.</p>
              </div>
            )}
          </div>

          {/* Leads Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Novas Oportunidades
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
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
              <div className="p-12 text-center bg-white rounded-[40px] border border-neutral-100 shadow-sm">
                <p className="text-neutral-500">Não há novos leads disponíveis no momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
