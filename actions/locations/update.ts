'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

export async function updateLocation(store: string, formData: FormData) {
  const location: Record<string, any> = {};
  const locationLatLng: [number, number] = [0, 0];

  formData.forEach((value, key) => {
    if (!value) return;
    const strVal = value.toString();

    if (key === 'locationLatitud' || key === 'locationLatitude') {
      locationLatLng[0] = +strVal;
    } else if (key === 'locationLongitud' || key === 'locationLongitude') {
      locationLatLng[1] = +strVal;
    } else if (key === 'manager') {
      const managerVal = strVal.trim();
      if (managerVal) {
        location.manager = managerVal;
      }
    } else {
      location[key] = strVal;
    }
  });

  location.locationLatLng = locationLatLng;

  try {
    const response = await fetch(`${API_URL}/locations/${store}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(location),
    });

    if (response.status === 200) {
      revalidateTag('dashboard:locations');
      revalidateTag(`dashboard:locations:${store}`);
    }
  } catch (error) {
    console.error('Error updating location:', error);
  }

  redirect(`/dashboard?store=${store}`);
}
