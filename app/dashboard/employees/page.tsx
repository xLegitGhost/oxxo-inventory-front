import { API_URL } from '@/constants';
import { Employee, Location } from '@/entities';
import authHeaders from '@/helpers/authHeaders';
import ListEmployees from './_components/list-employees';
import CreateEmployee from './_components/create-employee';

export default async function EmployeesPage() {
  let employees: Employee[] = [];
  let locations: Location[] = [];

  try {
    const [employeesRes, locationsRes] = await Promise.all([
      fetch(`${API_URL}/employees`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:employees'] },
      }),
      fetch(`${API_URL}/locations`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:locations'] },
      }),
    ]);

    if (employeesRes.ok) {
      employees = await employeesRes.json();
    }
    if (locationsRes.ok) {
      locations = await locationsRes.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching employees or locations:', error);
  }

  return (
    <div className="relative w-full">
      <ListEmployees employees={employees} locations={locations} />
      <CreateEmployee stores={locations} />
    </div>
  );
}
