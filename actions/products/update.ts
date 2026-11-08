'use server';

import { revalidateTag } from 'next/cache';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function updateProduct(productId: string, formData: FormData) {
  const product: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (!value || key.startsWith('$ACTION')) return;
    const strVal = value.toString();

    if (key === 'price') {
      product[key] = +strVal;
    } else if (key === 'countSeal') {
      product[key] = +strVal;
    } else {
      product[key] = strVal;
    }
  });

  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(product),
    });

    if (response.status === 200) {
      revalidateTag('dashboard:products');
      revalidateTag(`dashboard:products:${productId}`);
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
}
