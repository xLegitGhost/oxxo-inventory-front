import axios from 'axios';
import { API_URL } from '@/constants';
import { Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import SelectLocation from './_components/select-location';
import LocationCard from './_components/location-card';
import FormNewLocation from './_components/form-new-location';
import DeleteLocationButton from './_components/delete-location-button';

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let data: Location[] = [];
  try {
    const response = await axios.get<Location[]>(`${API_URL}/locations`, {
      headers: authHeaders(),
    });
    data = response.data;
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
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
      <div className="w-8/12 flex flex-col items-center">
        <LocationCard store={searchParams?.store} />
        <DeleteLocationButton store={searchParams?.store} />
        <FormNewLocation store={searchParams?.store} />
      </div>
    </div>
  );
}
