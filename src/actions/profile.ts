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
