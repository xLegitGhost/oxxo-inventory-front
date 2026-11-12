'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteEmployee(employeeId: string) {
  try {
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders(),
      },
    });

    if (response.status === 200) {
      revalidateTag('dashboard:employees');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
  }

  redirect('/dashboard/employees');
}
