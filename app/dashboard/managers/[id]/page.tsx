import { notFound } from 'next/navigation';
import { API_URL } from '@/constants';
import { Manager } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import ManagerCard from '../_components/manager-card';
import DeleteManagerButton from '../_components/delete-manager-button';

export default async function ManagerPage({
  params,
}: {
  params: { id: string };
}) {
  let manager: Manager | null = null;
  try {
    const response = await fetch(`${API_URL}/managers/${params.id}`, {
      headers: authHeaders(),
      next: { tags: [`dashboard:managers:${params.id}`, 'dashboard:managers'] },
    });
    if (response.ok) {
      manager = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching manager:', error);
  }

  if (!manager) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ManagerCard manager={manager} />
      <div className="bg-white shadow-md rounded-md flex justify-center py-2 px-10 gap-10 my-4 w-full">
        <DeleteManagerButton managerId={params.id} />
      </div>
    </div>
  );
}
