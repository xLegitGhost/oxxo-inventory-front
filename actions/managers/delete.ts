'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteManager(managerId: string) {
  try {
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders(),
      },
    });

    if (response.status === 200) {
      revalidateTag('dashboard:managers');
    }
  } catch (error) {
    console.error('Error deleting manager:', error);
  }

  redirect('/dashboard/managers');
}
