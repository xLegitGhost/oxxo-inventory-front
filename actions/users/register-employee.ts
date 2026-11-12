'use server';

import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { revalidateTag } from 'next/cache';

export async function registerEmployee(employeeId: string, formData: FormData) {
  const data = {
    userEmail: formData.get('userEmail'),
    userPassword: formData.get('userPassword'),
    userRoles: 'employee',
  };

  try {
    const response = await fetch(`${API_URL}/auth/register/${employeeId}?role=employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      revalidateTag('dashboard:employees');
      revalidateTag(`dashboard:employees:${employeeId}`);
    }
  } catch (error) {
    console.error('Error registering employee user:', error);
  }
}

export default registerEmployee;
