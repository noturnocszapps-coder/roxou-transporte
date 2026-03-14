import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ROUTES, ROLES } from '@/constants';
import { OnboardingForm } from '@/components/driver/OnboardingForm';
import { Car } from 'lucide-react';

export default async function DriverOnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.LOGIN);

  // Fetch profile and driver status
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, driver_status')
    .eq('id', user.id)
    .single();

  if (profile?.role !== ROLES.DRIVER) {
    // If not a driver, maybe they want to become one? 
    // For now, redirect to passenger dashboard if they are a passenger
    if (profile?.role === ROLES.PASSENGER) redirect(ROUTES.PASSENGER_DASHBOARD);
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-100">
            <Car className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Seja um Motorista Roxou</h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            Complete seu cadastro para começar a receber solicitações de transporte para os melhores eventos.
          </p>
        </header>

        <OnboardingForm 
          initialStatus={profile?.driver_status as any} 
          userEmail={user.email || ''} 
        />
      </div>
    </main>
  );
}
