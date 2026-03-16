'use client';

import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Filter, Download, Calendar, TrendingUp, DollarSign, Package, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ACTIVE_PLATFORMS } from '@/constants/platforms';

export default function ReportsPage() {
  const [period, setPeriod] = useState('month');
  const [platform, setPlatform] = useState('all');

  return (
    <main className="min-h-screen bg-bg py-12 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Voltar ao Dashboard</span>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter uppercase font-display">Relatórios de <span className="text-primary">Performance</span></h1>
              </div>
              <p className="text-neutral-500 font-medium">Análise detalhada dos seus ganhos, despesas e produtividade.</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
            </div>
          </div>
        </header>

        {/* Filters */}
        <section className="glass-card p-6 mb-12 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Filtros:</span>
          </div>
          
          <div className="flex gap-2">
            {['day', 'week', 'month', 'custom'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  period === p ? 'bg-primary text-white' : 'bg-white/5 text-neutral-500 hover:bg-white/10'
                }`}
              >
                {p === 'day' ? 'Hoje' : p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Personalizado'}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-white/5 hidden md:block" />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[9px] font-black uppercase tracking-widest text-neutral-300 outline-none focus:border-primary/50"
          >
            <option value="all">Todas as Plataformas</option>
            {ACTIVE_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Faturamento Total</p>
            <h3 className="text-3xl font-black tracking-tighter">R$ 4.250,00</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-500 text-[10px] font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>+15.4% vs período anterior</span>
            </div>
          </div>
          <div className="glass-card p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Lucro Líquido</p>
            <h3 className="text-3xl font-black tracking-tighter text-primary">R$ 3.120,00</h3>
            <p className="mt-4 text-[10px] font-bold text-neutral-500">Margem de 73.4%</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Total de Pacotes</p>
            <h3 className="text-3xl font-black tracking-tighter">842</h3>
            <p className="mt-4 text-[10px] font-bold text-neutral-500">Média de 28 por rota</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Ganho por KM</p>
            <h3 className="text-3xl font-black tracking-tighter">R$ 2,85</h3>
            <p className="mt-4 text-[10px] font-bold text-neutral-500">Eficiência Alta</p>
          </div>
        </section>

        {/* Charts & Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 lg:col-span-2">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">Evolução Diária</h3>
            <div className="h-64 flex items-end gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all group-hover:bg-primary-light" 
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    R${(Math.random() * 200 + 100).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[8px] font-black text-neutral-600 uppercase tracking-widest">
              <span>01 Mar</span>
              <span>15 Mar</span>
              <span>30 Mar</span>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">Por Plataforma</h3>
            <div className="space-y-8">
              {ACTIVE_PLATFORMS.map((p, i) => (
                <div key={p} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-400">{p}</span>
                    <span className="text-white">R$ {(Math.random() * 2000 + 500).toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-amber-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
