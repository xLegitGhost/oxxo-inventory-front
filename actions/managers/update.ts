'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function updateManager(managerId: string, formData: FormData) {
  const manager: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (!value) return;
    const strVal = value.toString();
    if (key === 'managerSalary') {
      manager[key] = +strVal;
    } else if (key === 'location') {
      manager[key] = +strVal;
    } else {
      manager[key] = strVal;
    }
  });

  try {
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(manager),
    });

    if (response.status === 200) {
      revalidateTag('dashboard:managers');
      revalidateTag(`dashboard:managers:${managerId}`);
    }
  } catch (error) {
    console.error('Error updating manager:', error);
  }

  redirect(`/dashboard/managers/${managerId}`);
}
