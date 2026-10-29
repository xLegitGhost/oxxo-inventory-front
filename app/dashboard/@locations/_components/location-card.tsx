import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { API_URL } from '@/constants';
import { Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import LocationMap from './location-map';

interface LocationCardProps {
  store?: string | string[] | undefined;
}

export default async function LocationCard({ store }: LocationCardProps) {
  if (!store || store === '0') return null;

  let data: Location | null = null;
  try {
    const response = await axios.get<Location>(`${API_URL}/locations/${store}`, {
      headers: authHeaders(),
    });
    data = response.data;
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching location', error);
    return null;
  }

  if (!data) return null;

  const managerName =
    typeof data.manager === 'object'
      ? data.manager?.managerFullName
      : data.manager ?? 'Sin manager';

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="w-full text-xl font-bold text-neutral-800">
          {data.locationName}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-3">
        <p className="w-full text-sm">
          <b>Manager:</b>{' '}
          <Link href="/dashboard/managers">
            <span className="underline text-orange-700 hover:text-orange-900 font-semibold">
              {managerName}
            </span>
          </Link>
        </p>
        <p className="w-full text-sm">
          <b>Dirección:</b> {data.locationAddress || 'Sin dirección'}
        </p>
        {data.locationLatLng && (
          <LocationMap
            lat={data.locationLatLng[0]}
            lng={data.locationLatLng[1]}
            locationName={data.locationName}
            address={data.locationAddress}
          />
        )}
      </CardBody>
    </Card>
  );
}
