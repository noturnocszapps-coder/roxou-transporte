import { createClient } from '@/lib/supabase-server';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { notFound, redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

interface ChatPageProps {
  params: {
    connectionId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.LOGIN);

  // 1. Fetch connection and verify access
  const { data: connection, error: connError } = await supabase
    .from('connections')
    .select(`
      id,
      passenger_id,
      driver_id,
      passenger:profiles!passenger_id(full_name),
      driver:profiles!driver_id(full_name)
    `)
    .eq('id', params.connectionId)
    .single();

  if (connError || !connection) notFound();

  const isPassenger = connection.passenger_id === user.id;
  const isDriver = connection.driver_id === user.id;

  if (!isPassenger && !isDriver) redirect(ROUTES.HOME);

  // 2. Fetch initial message history
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('connection_id', params.connectionId)
    .order('created_at', { ascending: true });

  const otherPartyName = isPassenger 
    ? (connection.driver as any).full_name 
    : (connection.passenger as any).full_name;
  const otherPartyId = isPassenger ? connection.driver_id : connection.passenger_id;
  const otherPartyRole = isPassenger ? 'driver' : 'passenger';

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <ChatRoom 
          connectionId={params.connectionId}
          currentUserId={user.id}
          otherPartyId={otherPartyId}
          otherPartyName={otherPartyName}
          otherPartyRole={otherPartyRole as any}
          initialMessages={messages || []}
        />
        
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Esta conversa está sendo gravada para fins de segurança e moderação. 
            Nunca compartilhe dados bancários ou senhas no chat.
          </p>
        </div>
      </div>
    </main>
  );
}
