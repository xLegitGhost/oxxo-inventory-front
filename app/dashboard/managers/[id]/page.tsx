import { notFound } from 'next/navigation';
import { API_URL } from '@/constants';
import { Manager, Location } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import ManagerCard from '../_components/manager-card';
import DeleteManagerButton from '../_components/delete-manager-button';
import UpdateManager from '../_components/update-manager';
import FormUpdateManager from '../_components/form-update-manager';

export default async function ManagerPage({
  params,
}: {
  params: { id: string };
}) {
  let manager: Manager | null = null;
  let stores: Location[] = [];

  try {
    const [resManager, resStores] = await Promise.all([
      fetch(`${API_URL}/managers/${params.id}`, {
        headers: authHeaders(),
        next: { tags: [`dashboard:managers:${params.id}`, 'dashboard:managers'] },
      }),
      fetch(`${API_URL}/locations`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:locations'] },
      }),
    ]);

    if (resManager.ok) {
      manager = await resManager.json();
    }
    if (resStores.ok) {
      stores = await resStores.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching manager or stores:', error);
  }

  if (!manager) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ManagerCard manager={manager} />
      <div className="bg-white shadow-md rounded-md flex justify-center py-2 px-10 gap-10 my-4 w-full">
        <DeleteManagerButton managerId={params.id} />
        <UpdateManager>
          <FormUpdateManager manager={manager} stores={stores} />
        </UpdateManager>
      </div>
    </div>
  );
}
