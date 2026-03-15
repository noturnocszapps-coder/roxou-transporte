import Link from 'next/link';
import { ROUTES } from '@/constants';
import { ShieldCheck, Car, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-white overflow-hidden selection:bg-roxou/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-roxou/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-roxou/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header/Logo */}
        <header className="flex justify-between items-center py-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 roxou-gradient rounded-2xl flex items-center justify-center shadow-2xl roxou-glow">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase font-display">Roxou<span className="text-roxou">.</span></span>
          </div>
          <div className="flex items-center gap-8">
            <Link 
              href={ROUTES.LOGIN}
              className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all"
            >
              Entrar
            </Link>
            <Link 
              href={ROUTES.LOGIN}
              className="hidden sm:block text-xs font-black uppercase tracking-widest px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
            >
              Criar Conta
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="pt-16 pb-32 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-roxou/10 border border-roxou/20 text-roxou-light text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-2 h-2 bg-roxou rounded-full animate-pulse" />
              Urban Nightlife Transportation
            </div>
            
            <h1 className="text-[12vw] lg:text-[110px] font-black leading-[0.85] tracking-tighter font-display uppercase">
              Sua Noite <br />
              <span className="text-roxou">Começa</span> <br />
              Aqui.
            </h1>
            
            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed font-medium">
              Conexão premium para quem não aceita menos que o extraordinário. Chegue aos melhores eventos com estilo e segurança.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link 
                href={ROUTES.LOGIN}
                className="group roxou-gradient text-white px-10 py-6 rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl roxou-glow flex items-center justify-center gap-3"
              >
                Solicitar Viagem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href={ROUTES.DRIVER_DASHBOARD}
                className="bg-white/5 border border-white/10 text-white px-10 py-6 rounded-[24px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                Ser Motorista
              </Link>
            </div>
          </div>

          {/* Visual Element - Bento Style */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[16/10] rounded-[40px] overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass p-5 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 roxou-gradient rounded-xl flex items-center justify-center">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Próximo de você</p>
                        <p className="text-sm font-black uppercase">Audi A4 • Black</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-roxou">3 MIN</span>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-[40px] glass flex flex-col items-center justify-center text-center p-6">
                <Users className="w-8 h-8 text-roxou mb-3" />
                <p className="text-2xl font-black tracking-tighter">2.4k+</p>
                <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Usuários Ativos</p>
              </div>
              <div className="aspect-square rounded-[40px] roxou-gradient flex flex-col items-center justify-center text-center p-6 shadow-2xl roxou-glow">
                <ShieldCheck className="w-8 h-8 text-white mb-3" />
                <p className="text-2xl font-black tracking-tighter">100%</p>
                <p className="text-[9px] font-black text-white/60 uppercase tracking-widest">Verificado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 pb-32">
          {[
            {
              icon: ShieldCheck,
              title: "Segurança VIP",
              desc: "Protocolos rigorosos de verificação para sua total tranquilidade na noite."
            },
            {
              icon: Car,
              title: "Frota Curada",
              desc: "Apenas veículos que atendem ao nosso padrão de excelência e conforto."
            },
            {
              icon: Users,
              title: "Comunidade",
              desc: "Conectando pessoas que frequentam os melhores lugares da cidade."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 group hover:border-roxou/30 transition-all">
              <div className="w-14 h-14 bg-roxou/10 rounded-2xl flex items-center justify-center text-roxou mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
