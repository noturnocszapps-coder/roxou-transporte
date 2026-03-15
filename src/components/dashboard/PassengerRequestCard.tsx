'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, XCircle, Clock, Users, MapPin, Calendar, Car } from 'lucide-react';
import { updateRequestStatus } from '@/actions/connections';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { motion } from 'motion/react';

interface Connection {
  id: string;
  driver: {
    full_name: string;
  };
  created_at: string;
}

interface Request {
  id: string;
  status: 'open' | 'filled' | 'cancelled';
  description: any;
  created_at: string;
  connections: Connection[];
}

export const PassengerRequestCard: React.FC<{ request: Request }> = ({ request }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const desc = request.description || {};

  const handleStatusUpdate = async (newStatus: 'filled' | 'cancelled') => {
    if (!confirm(`Tem certeza que deseja marcar como ${newStatus === 'filled' ? 'preenchido' : 'cancelado'}?`)) return;
    setIsUpdating(true);
    try {
      await updateRequestStatus(request.id, newStatus);
    } catch (error) {
      alert('Erro ao atualizar status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="glass rounded-[32px] overflow-hidden mb-8 relative group border border-white/5 hover:border-roxou/20 transition-all">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                request.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                request.status === 'filled' ? 'bg-roxou/10 text-roxou-light border-roxou/20' :
                'bg-neutral-800 text-neutral-500 border-white/5'
              }`}>
                {request.status === 'open' ? 'Aberto' : request.status === 'filled' ? 'Preenchido' : 'Cancelado'}
              </span>
              <span className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">
                {new Date(request.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{desc.eventName || 'Solicitação de Transporte'}</h3>
          </div>

          {request.status === 'open' && (
            <div className="flex gap-3">
              <button 
                onClick={() => handleStatusUpdate('filled')}
                disabled={isUpdating}
                className="p-3 text-roxou-light hover:bg-roxou/10 rounded-2xl transition-all border border-transparent hover:border-roxou/20"
                title="Marcar como preenchido"
              >
                <CheckCircle2 className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating}
                className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
                title="Cancelar solicitação"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-4 text-sm text-neutral-400 font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
            <MapPin className="w-5 h-5 text-roxou" />
            <span className="truncate">{desc.origin} → {desc.destination}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-400 font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
            <Calendar className="w-5 h-5 text-roxou" />
            <span>{desc.departureDate} às {desc.departureTime}</span>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-roxou" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Motoristas Interessados ({request.connections.length})</h4>
          </div>

          {request.connections.length === 0 ? (
            <div className="py-10 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Clock className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-black">Aguardando motoristas...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {request.connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-white/10 transition-all border border-white/5 group/item">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 border border-white/5 group-hover/item:border-roxou/20 transition-all">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white uppercase tracking-tight">{conn.driver.full_name}</p>
                      <p className="text-[9px] text-roxou-light uppercase tracking-widest font-black">Motorista Verificado</p>
                    </div>
                  </div>
                  <Link 
                    href={ROUTES.CHAT(conn.id)}
                    className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-roxou hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
