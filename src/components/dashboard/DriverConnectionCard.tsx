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
    <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden mb-4 hover:border-indigo-100 transition-all group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">{connection.passenger.full_name}</h3>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Passageiro</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            isRequestOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-100 text-neutral-500'
          }`}>
            {isRequestOpen ? 'Ativo' : 'Finalizado'}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <MapPin className="w-3.5 h-3.5" />
            <span>{desc.origin} → {desc.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{desc.departureDate} às {desc.departureTime}</span>
          </div>
        </div>

        <Link 
          href={ROUTES.CHAT(connection.id)}
          className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all group-hover:shadow-lg group-hover:shadow-indigo-100"
        >
          <MessageSquare className="w-4 h-4" />
          Abrir Chat
          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
        </Link>
      </div>
    </div>
  );
};
