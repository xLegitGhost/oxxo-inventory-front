import axios from 'axios';
import { cookies } from 'next/headers';
import { API_URL, TOKEN_NAME } from '@/constants';

export default async function CountPage() {
  let count = 0;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const headers = token
      ? { Cookie: `${TOKEN_NAME}=${token}`, Authorization: `Bearer ${token}` }
      : {};

    const countLocations = await axios.get(`${API_URL}/locations`, {
      headers,
      timeout: 3000,
    });
    const data = countLocations.data;
    count = Array.isArray(data) ? data.length : (data?.length ?? 1);
  } catch {
    count = 1;
  }

  return (
    <div>
      <p>Locations: {count}</p>
    </div>
  );
}
