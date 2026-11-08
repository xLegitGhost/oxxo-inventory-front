'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function deleteProduct(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders(),
      },
    });

    if (response.status === 200) {
      revalidateTag('dashboard:products');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }

  redirect('/dashboard/products');
}
