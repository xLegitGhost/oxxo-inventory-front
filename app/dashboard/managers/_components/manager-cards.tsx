import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { API_URL } from '@/constants';
import { Manager } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function ManagerCards() {
  let managers: Manager[] = [];
  try {
    const response = await fetch(`${API_URL}/managers`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:managers'] },
    });
    if (response.ok) {
      managers = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching managers:', error);
  }

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-4 p-2">
      {managers.map((manager) => (
        <Link
          key={manager.managerId}
          href={`/dashboard/managers/${manager.managerId}`}
          className="hover:scale-105 transition-transform"
        >
          <Card className="hover:bg-blue-50 transition-colors">
            <CardHeader className="font-bold text-lg">
              {manager.managerFullName}
            </CardHeader>
            <Divider />
            <CardBody className="text-sm flex flex-col gap-1">
              <p>
                <b>Email:</b> {manager.managerEmail}
              </p>
              <p>
                <b>Tel:</b> {manager.managerPhoneNumber}
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
