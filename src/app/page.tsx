import Link from 'next/link';
import { ROUTES } from '@/constants';
import { ShieldCheck, Car, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-roxou/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-roxou/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Header/Logo */}
        <header className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-roxou rounded-xl flex items-center justify-center shadow-lg shadow-roxou/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase font-display">Roxou<span className="text-roxou">.</span></span>
          </div>
          <Link 
            href={ROUTES.LOGIN}
            className="text-sm font-bold text-neutral-400 hover:text-white transition-colors"
          >
            Entrar
          </Link>
        </header>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roxou/10 border border-roxou/20 text-roxou-light text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-roxou rounded-full animate-pulse" />
              Transporte Premium para Eventos
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter font-display">
              SUA CHEGADA <br />
              <span className="text-roxou">MERECE</span> <br />
              ESTILO.
            </h1>
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              A Roxou conecta você aos melhores motoristas para garantir que sua única preocupação seja aproveitar o evento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={ROUTES.LOGIN}
                className="group bg-roxou text-white px-8 py-5 rounded-2xl font-bold hover:bg-roxou-dark transition-all shadow-xl shadow-roxou/20 flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href={ROUTES.DRIVER_DASHBOARD}
                className="bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Quero ser Motorista
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-[64px] bg-gradient-to-br from-roxou/20 to-transparent border border-white/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
              <div className="relative h-full flex flex-col justify-end">
                <div className="glass p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-roxou rounded-2xl flex items-center justify-center">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Motorista Próximo</p>
                      <p className="text-lg font-bold">Ricardo S.</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-roxou w-3/4" />
                  </div>
                  <p className="text-xs text-neutral-400">Chegando em 4 minutos ao Allianz Parque</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <div className="glass p-8 rounded-[32px] space-y-4">
            <div className="w-12 h-12 bg-roxou/10 rounded-2xl flex items-center justify-center text-roxou">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Segurança Total</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">Motoristas verificados e monitoramento em tempo real para sua tranquilidade.</p>
          </div>
          <div className="glass p-8 rounded-[32px] space-y-4">
            <div className="w-12 h-12 bg-roxou/10 rounded-2xl flex items-center justify-center text-roxou">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Veículos Premium</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">Frota selecionada para oferecer o máximo de conforto e sofisticação.</p>
          </div>
          <div className="glass p-8 rounded-[32px] space-y-4">
            <div className="w-12 h-12 bg-roxou/10 rounded-2xl flex items-center justify-center text-roxou">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Foco em Eventos</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">Especialistas em logística para grandes eventos, shows e festivais.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
