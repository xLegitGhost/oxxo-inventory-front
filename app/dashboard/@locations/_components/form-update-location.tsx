import { Input, Button } from '@nextui-org/react';
import { API_URL } from '@/constants';
import { Manager, Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import { updateLocation } from '@/actions/locations/update';
import SelectManager from './select-manager';

interface FormUpdateLocationProps {
  store?: string | string[] | undefined;
}

export default async function FormUpdateLocation({ store }: FormUpdateLocationProps) {
  if (!store || store === '0') return null;

  const storeId = typeof store === 'string' ? store : store[0];

  let managers: Manager[] = [];
  let locations: Location[] = [];

  try {
    const [resManagers, resLocations] = await Promise.all([
      fetch(`${API_URL}/managers`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:managers'] },
      }),
      fetch(`${API_URL}/locations`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:locations'] },
      }),
    ]);
    if (resManagers.ok) managers = await resManagers.json();
    if (resLocations.ok) locations = await resLocations.json();
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching data for update location form', error);
  }

  const foundLocation = locations.find((loc) => loc.locationId === +storeId);
  if (!foundLocation) return null;

  const defaultManager =
    typeof foundLocation.manager === 'object'
      ? foundLocation.manager?.managerId
      : foundLocation.manager;

  const updateLocationWithId = updateLocation.bind(null, storeId);

  return (
    <form action={updateLocationWithId} className="flex flex-col gap-4 pb-4">
      <Input
        label="Nombre de la tienda"
        placeholder="OXXO Juriquilla"
        name="locationName"
        defaultValue={foundLocation.locationName}
        isRequired
      />
      <Input
        label="Dirección"
        placeholder="Avenida de la Luz s/n"
        name="locationAddress"
        defaultValue={foundLocation.locationAddress}
        isRequired
      />
      <Input
        label="Latitud"
        placeholder="20.6123"
        name="locationLatitud"
        defaultValue={foundLocation.locationLatLng?.[0]?.toString()}
        isRequired
      />
      <Input
        label="Longitud"
        placeholder="-100.4056"
        name="locationLongitud"
        defaultValue={foundLocation.locationLatLng?.[1]?.toString()}
        isRequired
      />
      <SelectManager
        managers={managers}
        locations={locations}
        defaultManager={defaultManager}
      />
      <Button type="submit" color="primary" className="font-semibold text-white">
        Actualizar
      </Button>
    </form>
  );
}
