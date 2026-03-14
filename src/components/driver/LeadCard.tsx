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
      className="bg-white rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
    >
      <div className="p-6">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            {eventDate && (
              <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                <Calendar className="w-3 h-3" /> {eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            )}
            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
              {lead.event_name || details.eventName || 'Solicitação'}
            </h3>
            <p className="text-xs text-neutral-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {lead.event_location || details.destination}
            </p>
          </div>
          <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Route Details */}
        <div className="bg-neutral-50 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="flex-1 text-sm font-medium text-neutral-700 truncate">
              {details.origin || 'Origem não informada'}
            </div>
          </div>
          <div className="ml-1 w-px h-4 bg-neutral-200" />
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <div className="flex-1 text-sm font-medium text-neutral-700 truncate">
              {details.destination || 'Destino não informado'}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 bg-white border border-neutral-100 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" /> {details.departureTime || details.departure_time || '--:--'}
          </div>
          {details.hasReturn && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <Repeat className="w-3.5 h-3.5" /> Com Volta
            </div>
          )}
        </div>

        {/* Action */}
        <div className="pt-6 border-t border-neutral-100">
          <button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-neutral-900 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-neutral-100 disabled:opacity-50"
          >
            {isConnecting ? 'Conectando...' : 'Demonstrar Interesse'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notes Preview */}
      {details.notes && (
        <div className="px-6 py-3 bg-indigo-50/50 border-t border-indigo-50 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-400 mt-0.5" />
          <p className="text-[11px] text-indigo-700 italic line-clamp-1">
            "{details.notes}"
          </p>
        </div>
      )}
    </motion.div>
  );
};
