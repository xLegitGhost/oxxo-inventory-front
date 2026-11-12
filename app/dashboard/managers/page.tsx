import { API_URL } from '@/constants';
import { Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import CreateManager from './_components/create-manager';

export default async function ManagersPage() {
  let stores: Location[] = [];
  try {
    const res = await fetch(`${API_URL}/locations`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:locations'] },
    });
    if (res.ok) {
      stores = await res.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching locations:', error);
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <p className="text-center text-neutral-500 font-semibold">
        Selecciona un manager para ver su información
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-400">Crear manager:</span>
        <CreateManager stores={stores} />
      </div>
    </div>
  );
}
