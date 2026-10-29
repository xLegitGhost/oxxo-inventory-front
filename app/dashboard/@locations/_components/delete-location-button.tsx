import { Button } from '@nextui-org/react';
import { deleteLocation } from '@/actions/locations/delete';

interface DeleteLocationButtonProps {
  store?: string | string[] | undefined;
}

export default function DeleteLocationButton({ store }: DeleteLocationButtonProps) {
  if (!store || store === '0') return null;

  const storeId = typeof store === 'string' ? store : store[0];

  return (
    <form action={deleteLocation} className="my-4">
      <input type="hidden" name="deleteValue" value={storeId} />
      <Button type="submit" color="danger">
        Borrar tienda
      </Button>
    </form>
  );
}
