'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { API_URL } from '@/constants';
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

  try {
    await axios.post(`${API_URL}/locations`, location, {
      headers: authHeaders(),
    });
  } catch (error) {
    console.error('Error creating location:', error);
  }

  revalidatePath('/dashboard');
}
