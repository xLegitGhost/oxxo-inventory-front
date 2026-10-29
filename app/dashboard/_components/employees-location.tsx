import { API_URL } from '@/constants';
import { Employee } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import EmployeeLocationCard from './employee-location-card';

export default async function EmployeesLocation({
  store,
}: {
  store?: string | string[] | undefined;
}) {
  if (!store || store === '0') {
    return (
      <p className="text-xl font-bold text-center mt-10">
        Selecciona una tienda para ver los empleados
      </p>
    );
  }

  let data: Employee[] = [];
  try {
    const response = await fetch(`${API_URL}/employees/location/${store}`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:locations:employees'] },
    });
    if (response.ok) {
      data = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching employees by location', error);
  }

  return (
    <div className="h-[90vh] overflow-hidden overflow-y-auto flex flex-col gap-4 p-4">
      {data.map((employee) => (
        <EmployeeLocationCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
