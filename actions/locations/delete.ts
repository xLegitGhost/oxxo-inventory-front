'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteLocation(formData: FormData) {
  const locationId = formData.get('deleteValue')?.toString();
  if (!locationId) return;

  try {
    const response = await fetch(`${API_URL}/locations/${locationId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders(),
      },
    });

    if (response.status === 200) {
      revalidateTag('dashboard:locations');
    }
  } catch (error) {
    console.error('Error deleting location:', error);
  }

  redirect('/dashboard');
}
