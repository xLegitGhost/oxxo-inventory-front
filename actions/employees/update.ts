'use server';

import { revalidateTag } from 'next/cache';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function updateEmployee(employeeId: string, formData: FormData) {
  const cleanFormData = new FormData();

  formData.forEach((value, key) => {
    if (key.startsWith('$') || key.startsWith('action') || key.includes(':')) return;
    if (key === 'employeePhoto' && value instanceof File && value.size === 0) return;
    cleanFormData.append(key, value);
  });

  try {
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
      method: 'PATCH',
      headers: {
        ...authHeaders(),
      },
      body: cleanFormData,
    });

    if (response.status === 200) {
      revalidateTag('dashboard:employees');
      revalidateTag(`dashboard:employees:${employeeId}`);
    }
  } catch (error) {
    console.error('Error updating employee:', error);
  }
}
