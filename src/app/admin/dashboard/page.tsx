import { getDriversByStatus, getAdminStats } from '@/actions/admin';
import { DRIVER_STATUS } from '@/constants';
import Link from 'next/link';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const currentStatus = params.status || DRIVER_STATUS.PENDING;
  
  // Fetch data in parallel
  const [drivers, stats] = await Promise.all([
    getDriversByStatus(currentStatus),
    getAdminStats()
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 py-12 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-roxou/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-roxou mb-3">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Painel de Controle</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-8">Gestão de <br /><span className="text-roxou">Motoristas</span></h1>
          
          <nav className="flex items-center gap-8 border-b border-white/10">
            <Link 
              href="/admin/dashboard" 
              className="pb-4 text-[10px] font-black uppercase tracking-widest text-roxou border-b-2 border-roxou transition-all"
            >
              Aprovações
            </Link>
            <Link 
              href="/admin/reports" 
              className="pb-4 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all"
            >
              Denúncias
            </Link>
          </nav>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link 
            href="?status=pending"
            className={`p-8 rounded-[32px] transition-all ${
              currentStatus === DRIVER_STATUS.PENDING 
                ? 'glass border-roxou/50 shadow-2xl shadow-roxou/10' 
                : 'glass border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1">Pendentes</p>
                <p className="text-4xl font-black text-white">{stats.pending}</p>
              </div>
            </div>
          </Link>

          <Link 
            href="?status=approved"
            className={`p-8 rounded-[32px] transition-all ${
              currentStatus === DRIVER_STATUS.APPROVED 
                ? 'glass border-roxou/50 shadow-2xl shadow-roxou/10' 
                : 'glass border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1">Aprovados</p>
                <p className="text-4xl font-black text-white">{stats.approved}</p>
              </div>
            </div>
          </Link>

          <Link 
            href="?status=rejected"
            className={`p-8 rounded-[32px] transition-all ${
              currentStatus === DRIVER_STATUS.REJECTED 
                ? 'glass border-roxou/50 shadow-2xl shadow-roxou/10' 
                : 'glass border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1">Rejeitados</p>
                <p className="text-4xl font-black text-white">{stats.rejected}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Drivers List */}
        <div className="glass rounded-[40px] overflow-hidden">
          <div className="p-10 border-b border-white/5">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Users className="w-6 h-6 text-roxou" />
              {currentStatus === DRIVER_STATUS.PENDING ? 'Aguardando Revisão' : 
               currentStatus === DRIVER_STATUS.APPROVED ? 'Motoristas Ativos' : 'Aplicações Recusadas'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Motorista</th>
                  <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Email</th>
                  <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Solicitação</th>
                  <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {drivers.length > 0 ? (
                  drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-sm font-black text-neutral-400 group-hover:bg-roxou group-hover:text-white transition-all">
                            {driver.full_name?.charAt(0)}
                          </div>
                          <span className="font-black text-white uppercase tracking-tight">{driver.full_name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-sm text-neutral-400 font-medium">{driver.email}</td>
                      <td className="px-10 py-8 text-sm text-neutral-400 font-medium">
                        {new Date(driver.updated_at || driver.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-10 py-8 text-right">
                        <Link 
                          href={`/admin/drivers/${driver.id}`}
                          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-roxou hover:text-white transition-colors"
                        >
                          Revisar <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <p className="text-neutral-500 font-black uppercase tracking-widest text-xs">Nenhum motorista encontrado</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
