'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function createProvider(formData: FormData) {
  const provider: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (!value) return;
    provider[key] = value.toString();
  });

  try {
    const response = await fetch(`${API_URL}/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(provider),
    });

    if (response.status === 201) {
      revalidateTag('dashboard:providers');
    }
  } catch (error) {
    console.error('Error creating provider:', error);
  }

  redirect('/dashboard/providers');
}
