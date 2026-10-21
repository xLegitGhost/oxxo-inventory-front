import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import axios from 'axios';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { API_URL, TOKEN_NAME } from '@/constants';
import { Location } from '@/entities';

interface LocationCardProps {
  store?: string | string[] | undefined;
}

export default async function LocationCard({ store }: LocationCardProps) {
  if (!store || store === '0') return null;

  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  let data: Location | null = null;
  try {
    const response = await axios.get<Location>(`${API_URL}/locations/${store}`, {
      headers,
    });
    data = response.data;
  } catch (error) {
    console.error('Error fetching location', error);
    return null;
  }

  if (!data) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="w-full">
          <b>{data.locationName}</b>
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">
          Manager:{' '}
          <Link href="/dashboard/managers">
            <b className="underline">{data.manager?.managerFullName ?? 'Sin manager'}</b>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
