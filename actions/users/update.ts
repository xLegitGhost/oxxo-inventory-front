'use server';

import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { revalidateTag } from 'next/cache';

export async function updateUser(userId: string, formData: FormData) {
  const data: Record<string, any> = {};
  const userEmail = formData.get('userEmail');
  const userPassword = formData.get('userPassword');

  if (userEmail) data.userEmail = userEmail.toString();
  if (userPassword && userPassword.toString().trim() !== '') {
    data.userPassword = userPassword.toString();
  }

  try {
    const response = await fetch(`${API_URL}/auth/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      revalidateTag('dashboard:employees');
      revalidateTag('dashboard:managers');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

export default updateUser;
