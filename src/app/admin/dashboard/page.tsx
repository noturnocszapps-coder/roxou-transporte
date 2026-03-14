import { getDriversByStatus } from '@/actions/admin';
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
  const drivers = await getDriversByStatus(currentStatus);

  const stats = {
    pending: (await getDriversByStatus(DRIVER_STATUS.PENDING)).length,
    approved: (await getDriversByStatus(DRIVER_STATUS.APPROVED)).length,
    rejected: (await getDriversByStatus(DRIVER_STATUS.REJECTED)).length,
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Painel de Controle</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900">Aprovações de Motoristas</h1>
          
          <nav className="flex items-center gap-6 mt-8 border-b border-neutral-200">
            <Link 
              href="/admin/dashboard" 
              className="pb-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 transition-all"
            >
              Aprovações
            </Link>
            <Link 
              href="/admin/reports" 
              className="pb-4 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-all"
            >
              Denúncias
            </Link>
          </nav>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="?status=pending"
            className={`p-6 rounded-[32px] border transition-all ${
              currentStatus === DRIVER_STATUS.PENDING 
                ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-50 ring-2 ring-indigo-500/10' 
                : 'bg-white border-neutral-100 hover:border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Pendentes</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.pending}</p>
              </div>
            </div>
          </Link>

          <Link 
            href="?status=approved"
            className={`p-6 rounded-[32px] border transition-all ${
              currentStatus === DRIVER_STATUS.APPROVED 
                ? 'bg-white border-emerald-200 shadow-lg shadow-emerald-50 ring-2 ring-emerald-500/10' 
                : 'bg-white border-neutral-100 hover:border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Aprovados</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.approved}</p>
              </div>
            </div>
          </Link>

          <Link 
            href="?status=rejected"
            className={`p-6 rounded-[32px] border transition-all ${
              currentStatus === DRIVER_STATUS.REJECTED 
                ? 'bg-white border-rose-200 shadow-lg shadow-rose-50 ring-2 ring-rose-500/10' 
                : 'bg-white border-neutral-100 hover:border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Rejeitados</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.rejected}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Drivers List */}
        <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              {currentStatus === DRIVER_STATUS.PENDING ? 'Aguardando Revisão' : 
               currentStatus === DRIVER_STATUS.APPROVED ? 'Motoristas Ativos' : 'Aplicações Recusadas'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Motorista</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Data da Solicitação</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {drivers.length > 0 ? (
                  drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-sm font-bold text-neutral-500">
                            {driver.full_name?.charAt(0)}
                          </div>
                          <span className="font-bold text-neutral-900">{driver.full_name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-neutral-500">{driver.email}</td>
                      <td className="px-8 py-6 text-sm text-neutral-500">
                        {new Date(driver.updated_at || driver.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link 
                          href={`/admin/drivers/${driver.id}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          Revisar <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <p className="text-neutral-400 font-medium">Nenhum motorista encontrado nesta categoria.</p>
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
