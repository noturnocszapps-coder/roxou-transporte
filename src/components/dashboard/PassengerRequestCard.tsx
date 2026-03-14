'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, XCircle, Clock, Users, MapPin, Calendar } from 'lucide-react';
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
    <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                request.status === 'open' ? 'bg-emerald-50 text-emerald-600' :
                request.status === 'filled' ? 'bg-indigo-50 text-indigo-600' :
                'bg-neutral-100 text-neutral-500'
              }`}>
                {request.status === 'open' ? 'Aberto' : request.status === 'filled' ? 'Preenchido' : 'Cancelado'}
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">
                Criado em {new Date(request.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">{desc.eventName || 'Solicitação de Transporte'}</h3>
          </div>

          {request.status === 'open' && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleStatusUpdate('filled')}
                disabled={isUpdating}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                title="Marcar como preenchido"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Cancelar solicitação"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span>{desc.origin} → {desc.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>{desc.departureDate} às {desc.departureTime}</span>
          </div>
        </div>

        <div className="border-t border-neutral-50 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-neutral-400" />
            <h4 className="text-sm font-bold text-neutral-900">Motoristas Interessados ({request.connections.length})</h4>
          </div>

          {request.connections.length === 0 ? (
            <div className="py-8 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
              <Clock className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-400">Aguardando motoristas...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {request.connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{conn.driver.full_name}</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Motorista Verificado</p>
                  </div>
                  <Link 
                    href={ROUTES.CHAT(conn.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
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
