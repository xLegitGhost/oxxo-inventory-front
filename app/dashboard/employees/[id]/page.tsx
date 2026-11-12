import { notFound } from 'next/navigation';
import { API_URL } from '@/constants';
import { Employee, Location } from '@/entities';
import authHeaders from '@/helpers/authHeaders';
import EmployeeDataCard from '../_components/employee-data-card';
import FormUpdateEmployee from '../_components/form-update-employee';

export default async function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let employee: Employee | null = null;
  let locations: Location[] = [];

  try {
    const [employeeRes, locationsRes] = await Promise.all([
      fetch(`${API_URL}/employees/${params.id}`, {
        headers: authHeaders(),
        next: { tags: [`dashboard:employees:${params.id}`] },
      }),
      fetch(`${API_URL}/locations`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:locations'] },
      }),
    ]);

    if (employeeRes.ok) {
      employee = await employeeRes.json();
    }
    if (locationsRes.ok) {
      locations = await locationsRes.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error(`Error fetching employee ${params.id}:`, error);
  }

  if (!employee) {
    notFound();
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-10 p-10 w-full min-h-[90vh]">
      <EmployeeDataCard employee={employee} />
      <FormUpdateEmployee employee={employee} stores={locations} />
    </div>
  );
}
