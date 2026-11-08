'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteProvider(providerId: string) {
  try {
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders(),
      },
    });

    if (response.status === 200) {
      revalidateTag('dashboard:providers');
    }
  } catch (error) {
    console.error('Error deleting provider:', error);
  }

  redirect('/dashboard/providers');
}
