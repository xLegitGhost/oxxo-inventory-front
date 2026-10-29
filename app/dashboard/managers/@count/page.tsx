import { Card, CardBody } from '@nextui-org/react';
import { API_URL } from '@/constants';
import { Manager } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function CountPage() {
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
    console.error('Error fetching managers for count:', error);
  }

  const countNoStore = managers.filter((m) => !m.location).length;
  const maxSalary = managers.reduce(
    (max, m) => (m.managerSalary > max ? m.managerSalary : max),
    0
  );
  const totalSalary = managers.reduce(
    (acc, m) => acc + (m.managerSalary || 0),
    0
  );
  const avgSalary = managers.length ? totalSalary / managers.length : 0;

  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-2 p-4 text-center">
        <h1 className="text-2xl font-bold text-orange-600">
          Hay {managers.length} manager{managers.length !== 1 ? 's' : ''}
        </h1>
        <p className="text-base text-neutral-700">
          Hay <b>{countNoStore}</b> sin tienda
        </p>
        <p className="text-base text-neutral-700">
          El salario máximo es <b>${maxSalary.toLocaleString()}</b>
        </p>
        <p className="text-base text-neutral-700">
          El salario promedio es <b>${avgSalary.toFixed(2)}</b>
        </p>
      </CardBody>
    </Card>
  );
}
