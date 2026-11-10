import { API_URL } from '@/constants';
import { Employee } from '@/entities';
import authHeaders from '@/helpers/authHeaders';
import EmployeeCard from '../_components/employee-card';
import EmployeePhotoCard from '../_components/employee-photo-card';

export default async function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let employee: Employee | null = null;
  try {
    const response = await fetch(`${API_URL}/employees/${params.id}`, {
      headers: authHeaders(),
      next: { tags: [`dashboard:employees:${params.id}`] },
    });
    if (response.ok) {
      employee = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error(`Error fetching employee ${params.id}:`, error);
  }

  if (!employee) {
    return (
      <div className="p-10 text-gray-500">
        <h1 className="text-xl font-bold">Empleado no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-6">
      {employee.employeePhoto ? (
        <EmployeePhotoCard employee={employee} />
      ) : (
        <EmployeeCard employee={employee} />
      )}
    </div>
  );
}
