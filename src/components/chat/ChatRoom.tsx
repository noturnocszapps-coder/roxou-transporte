'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Send, ShieldAlert, Info, User, Car } from 'lucide-react';
import { sendMessage } from '@/actions/chat';
import { motion, AnimatePresence } from 'motion/react';
import { ReportModal } from '@/components/ReportModal';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ChatRoomProps {
  connectionId: string;
  currentUserId: string;
  otherPartyId: string;
  otherPartyName: string;
  otherPartyRole: 'passenger' | 'driver';
  initialMessages: Message[];
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ 
  connectionId, 
  currentUserId, 
  otherPartyId,
  otherPartyName,
  otherPartyRole,
  initialMessages 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // 1. Real-time Subscription
  useEffect(() => {
    const channel = supabase
      .channel(`chat:${connectionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `connection_id=eq.${connectionId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find(m => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [connectionId, supabase]);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(connectionId, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-neutral-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400">
            {otherPartyRole === 'driver' ? <Car className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">{otherPartyName}</h3>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
              {otherPartyRole === 'driver' ? 'Motorista Conectado' : 'Passageiro'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Chat Seguro
          </div>
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            title="Denunciar usuário"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
        </div>

        <ReportModal 
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          reportedId={otherPartyId}
          reportedName={otherPartyName}
          contextType="chat"
          contextId={connectionId}
        />
      </header>

      {/* Legal Banner */}
      <div className="px-6 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
        <p className="text-[10px] text-amber-700 font-medium">
          A Roxou não participa da negociação. Combine valores e segurança diretamente aqui.
        </p>
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  isMe 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-neutral-800 border border-neutral-100 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                  <p className={`text-[9px] mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <footer className="p-4 bg-white border-t border-neutral-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all disabled:opacity-50 shadow-lg shadow-neutral-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};
