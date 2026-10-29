'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteLocation(formData: FormData) {
  const locationId = formData.get('deleteValue')?.toString();
  if (!locationId) return;

  try {
    await axios.delete(`${API_URL}/locations/${locationId}`, {
      headers: authHeaders(),
    });
  } catch (error) {
    console.error('Error deleting location:', error);
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
