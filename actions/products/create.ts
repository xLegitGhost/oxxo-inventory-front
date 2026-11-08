'use server';

import { revalidateTag } from 'next/cache';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function createProduct(formData: FormData) {
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
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(product),
    });

    if (response.status === 201) {
      revalidateTag('dashboard:products');
    }
  } catch (error) {
    console.error('Error creating product:', error);
  }
}
