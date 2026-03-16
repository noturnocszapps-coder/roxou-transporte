import Link from 'next/link';
import { ROUTES } from '@/constants';
import { TrendingUp, ShieldCheck, Smartphone, BarChart3, ChevronRight, Package, MapPin, Calculator } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect(ROUTES.DASHBOARD);

  return (
    <main className="min-h-screen bg-bg text-white selection:bg-primary/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Inteligência Logística para Entregadores</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-display leading-[0.85] mb-8">
            Domine seu <br />
            <span className="text-primary brand-glow">Lucro</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            A plataforma definitiva para entregadores <span className="text-white font-bold">Shopee</span>, <span className="text-white font-bold">Mercado Livre</span> e <span className="text-white font-bold">Autônomos</span>. 
            Controle rotas, calcule fretes e maximize seus ganhos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href={ROUTES.LOGIN}
              className="group w-full sm:w-auto bg-white text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl shadow-white/10 flex items-center justify-center gap-3 active:scale-95"
            >
              Começar Agora
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#features"
              className="w-full sm:w-auto px-12 py-6 rounded-[24px] border border-white/10 font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
            >
              Saiba Mais
            </Link>
          </div>
        </div>

        {/* Floating Stats Preview */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-primary" />
            <span>+1M Pacotes Gerenciados</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span>+500k KM Otimizados</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>+25% Lucro Médio</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-6">Feito para quem <span className="text-primary">roda</span></h2>
            <p className="text-neutral-500 font-medium max-w-xl mx-auto">Ferramentas profissionais para transformar sua moto ou carro em uma máquina de lucro.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 space-y-6 group hover:border-primary/30 transition-all">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Dashboard Inteligente</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">Visualize seus ganhos por KM, por hora e por plataforma em tempo real. Tome decisões baseadas em dados.</p>
            </div>

            <div className="glass-card p-10 space-y-6 group hover:border-primary/30 transition-all">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Calculadora de Frete</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">Nunca mais tome prejuízo. Calcule o valor exato que deve cobrar considerando combustível, desgaste e lucro.</p>
            </div>

            <div className="glass-card p-10 space-y-6 group hover:border-primary/30 transition-all">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Mobile First</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">Desenvolvido para ser usado na rua. Interface rápida, botões grandes e leitura clara sob a luz do sol.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg" />
            <span className="text-xl font-black tracking-tighter uppercase">Rota<span className="text-primary">Lucro</span></span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-neutral-500">
            <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contato</Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-700">© 2026 RotaLucro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
