import axios from 'axios';
import { cookies } from 'next/headers';
import { API_URL, TOKEN_NAME } from '@/constants';
import { Employee } from '@/entities';
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

  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  let data: Employee[] = [];
  try {
    const response = await axios.get<Employee[]>(
      `${API_URL}/employees/location/${store}`,
      { headers }
    );
    data = response.data;
  } catch (error) {
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
