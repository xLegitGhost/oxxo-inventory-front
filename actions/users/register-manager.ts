'use server';

import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { revalidateTag } from 'next/cache';

export async function registerManager(managerId: string, formData: FormData) {
  const data = {
    userEmail: formData.get('userEmail'),
    userPassword: formData.get('userPassword'),
    userRoles: 'manager',
  };

  try {
    const response = await fetch(`${API_URL}/auth/register/${managerId}?role=manager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      revalidateTag('dashboard:managers');
      revalidateTag(`dashboard:managers:${managerId}`);
    }
  } catch (error) {
    console.error('Error registering manager user:', error);
  }
}

export default registerManager;
