'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  MessageSquare, 
  User,
  ArrowRight,
  Repeat,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { connectToRequest } from '@/actions/connections';

interface LeadCardProps {
  lead: any;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Handle description being either a string or an object
  const details = typeof lead.description === 'string' 
    ? JSON.parse(lead.description) 
    : lead.description || {};

  const eventDate = lead.event_date ? new Date(lead.event_date) : null;

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectToRequest(lead.id);
    } catch (error: any) {
      alert(error.message || 'Erro ao conectar');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-[32px] overflow-hidden relative group border border-white/5 hover:border-roxou/20 transition-all shadow-2xl shadow-black/20"
    >
      <div className="p-8">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            {eventDate && (
              <div className="flex items-center gap-2 text-roxou-light text-[9px] font-black uppercase tracking-[0.2em]">
                <Calendar className="w-3.5 h-3.5" /> {eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            )}
            <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-roxou-light transition-colors">
              {lead.event_name || details.eventName || 'Solicitação'}
            </h3>
            <p className="text-[10px] text-neutral-500 flex items-center gap-2 font-black uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-roxou" /> {lead.event_location || details.destination}
            </p>
          </div>
          <div className="w-14 h-14 bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 group-hover:bg-roxou/20 group-hover:text-roxou-light transition-all border border-white/5 group-hover:border-roxou/20">
            <User className="w-7 h-7" />
          </div>
        </div>

        {/* Route Details */}
        <div className="bg-white/5 rounded-3xl p-6 mb-8 space-y-4 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-roxou shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            <div className="flex-1 text-sm font-bold text-neutral-300 truncate">
              {details.origin || 'Origem não informada'}
            </div>
          </div>
          <div className="ml-1 w-px h-6 bg-white/10" />
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-neutral-600" />
            <div className="flex-1 text-sm font-bold text-neutral-300 truncate">
              {details.destination || 'Destino não informado'}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-roxou" /> {details.departureTime || details.departure_time || '--:--'}
          </div>
          {details.hasReturn && (
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
              <Repeat className="w-4 h-4" /> Com Volta
            </div>
          )}
        </div>

        {/* Action */}
        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-roxou hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-50 active:scale-95"
          >
            {isConnecting ? 'Conectando...' : 'Demonstrar Interesse'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notes Preview */}
      {details.notes && (
        <div className="px-8 py-4 bg-roxou/10 border-t border-roxou/20 flex items-start gap-3">
          <Info className="w-4 h-4 text-roxou-light mt-0.5" />
          <p className="text-[11px] text-roxou-light/80 font-medium italic line-clamp-1">
            "{details.notes}"
          </p>
        </div>
      )}
    </motion.div>
  );
};
