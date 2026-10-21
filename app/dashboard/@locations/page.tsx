import axios from 'axios';
import { cookies } from 'next/headers';
import { API_URL, TOKEN_NAME } from '@/constants';
import { Location } from '@/entities';
import SelectLocation from './_components/select-location';
import LocationCard from './_components/location-card';

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  let data: Location[] = [];
  try {
    const response = await axios.get<Location[]>(`${API_URL}/locations`, {
      headers,
    });
    data = response.data;
  } catch (error) {
    console.error('Error fetching locations', error);
  }

  const locations: Location[] = [
    {
      locationId: 0,
      locationName: 'Ninguna',
      locationAddress: '',
      locationLatLng: [0, 0],
    },
    ...data,
  ];

  return (
    <div className="w-4/12 h-[90vh] flex flex-col items-center">
      <div className="w-1/2 my-10">
        <SelectLocation locations={locations} store={searchParams?.store} />
      </div>
      <div className="w-8/12">
        <LocationCard store={searchParams?.store} />
      </div>
    </div>
  );
}
