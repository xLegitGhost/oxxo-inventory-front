import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { API_URL } from '@/constants';
import { Manager, Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import { createLocation } from '@/actions/locations/create';
import SelectManager from './select-manager';

interface FormNewLocationProps {
  store?: string | string[] | undefined;
}

export default async function FormNewLocation({ store }: FormNewLocationProps) {
  if (store && store !== '0') return null;

  let managers: Manager[] = [];
  let locations: Location[] = [];

  try {
    const [resManagers, resLocations] = await Promise.all([
      axios.get<Manager[]>(`${API_URL}/managers`, { headers: authHeaders() }),
      axios.get<Location[]>(`${API_URL}/locations`, { headers: authHeaders() }),
    ]);
    managers = resManagers.data ?? [];
    locations = resLocations.data ?? [];
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching data for new location form', error);
  }

  return (
    <form
      action={createLocation}
      className="bg-orange-400 p-6 rounded-2xl flex flex-col gap-4 w-full shadow-md text-white my-4"
    >
      <h1 className="text-3xl text-white text-center font-bold">Crear tienda</h1>
      <Input
        label="Nombre de la tienda"
        placeholder="OXXO Juriquilla"
        name="locationName"
        isRequired
      />
      <Input
        label="Dirección"
        placeholder="Avenida de la Luz s/n"
        name="locationAddress"
        isRequired
      />
      <Input
        label="Latitud"
        placeholder="20.6123"
        name="locationLatitud"
        isRequired
      />
      <Input
        label="Longitud"
        placeholder="-100.4056"
        name="locationLongitud"
        isRequired
      />
      <SelectManager managers={managers} locations={locations} />
      <Button type="submit" color="primary" className="font-semibold text-white">
        Subir
      </Button>
    </form>
  );
}
