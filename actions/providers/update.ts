'use server';

import { revalidateTag } from 'next/cache';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function updateProvider(providerId: string, formData: FormData) {
  const provider: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (!value) return;
    provider[key] = value.toString();
  });

  try {
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(provider),
    });

    if (response.status === 200) {
      revalidateTag('dashboard:providers');
      revalidateTag(`dashboard:providers:${providerId}`);
    }
  } catch (error) {
    console.error('Error updating provider:', error);
  }
}
