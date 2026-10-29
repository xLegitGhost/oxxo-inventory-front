'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { API_URL } from '@/constants';
import { Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export async function createLocation(formData: FormData) {
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

  let newStoreId: number | null = null;
  try {
    const response = await fetch(`${API_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(location),
    });

    if (response.status === 201) {
      revalidateTag('dashboard:locations');
      const data: Location = await response.json();
      newStoreId = data.locationId;
    }
  } catch (error) {
    console.error('Error creating location:', error);
  }

  if (newStoreId) {
    redirect(`/dashboard?store=${newStoreId}`);
  } else {
    redirect('/dashboard');
  }
}
