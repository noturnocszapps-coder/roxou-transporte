'use client';

import React from 'react';
import { MessageSquare, MapPin, Calendar, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface Connection {
  id: string;
  created_at: string;
  passenger: {
    full_name: string;
  };
  request: {
    status: string;
    description: any;
  };
}

export const DriverConnectionCard: React.FC<{ connection: Connection }> = ({ connection }) => {
  const desc = connection.request.description || {};
  const isRequestOpen = connection.request.status === 'open';

  return (
    <div className="glass rounded-[32px] overflow-hidden mb-6 relative group border border-white/5 hover:border-roxou/20 transition-all">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 border border-white/5 group-hover:border-roxou/20 transition-all">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tight">{connection.passenger.full_name}</h3>
              <p className="text-[9px] text-roxou-light uppercase tracking-widest font-black">Passageiro</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
            isRequestOpen ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-neutral-800 text-neutral-500 border-white/5'
          }`}>
            {isRequestOpen ? 'Ativo' : 'Finalizado'}
          </span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-neutral-400 font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
            <MapPin className="w-4 h-4 text-roxou" />
            <span className="truncate">{desc.origin} → {desc.destination}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400 font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
            <Calendar className="w-4 h-4 text-roxou" />
            <span>{desc.departureDate} às {desc.departureTime}</span>
          </div>
        </div>

        <Link 
          href={ROUTES.CHAT(connection.id)}
          className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-roxou hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          Abrir Chat
          <ArrowRight className="w-5 h-5 ml-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
        </Link>
      </div>
    </div>
  );
};
