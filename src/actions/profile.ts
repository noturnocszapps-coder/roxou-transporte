'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export async function acceptTerms() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from('profiles')
    .update({ 
      accepted_terms_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (error) throw error;

  revalidatePath('/');
  return { success: true };
}

export async function submitDriverOnboarding(data: {
  full_name: string;
  phone: string;
  vehicle_model: string;
  vehicle_plate: string;
  driverdash_id?: string;
  documents: Record<string, string>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Não autenticado");

  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name: data.full_name,
      phone: data.phone,
      driver_status: 'pending',
      driver_documents: {
        ...data.documents,
        vehicle_model: data.vehicle_model,
        vehicle_plate: data.vehicle_plate,
        driverdash_id: data.driverdash_id
      },
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (error) throw error;

  revalidatePath('/driver/dashboard');
  revalidatePath('/driver/onboarding');
  return { success: true };
}
