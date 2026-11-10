import { API_URL } from '@/constants';
import { Employee } from '@/entities';
import authHeaders from '@/helpers/authHeaders';
import EmployeeCard from './_components/employee-card';
import EmployeePhotoCard from './_components/employee-photo-card';

export default async function EmployeesPage() {
  let employees: Employee[] = [];
  try {
    const response = await fetch(`${API_URL}/employees`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:employees'] },
    });
    if (response.ok) {
      employees = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching employees:', error);
  }

  return (
    <div className="flex flex-wrap gap-4 h-[90vh] overflow-y-auto p-10">
      {employees.map((employee: Employee) => {
        const id = employee.id || (employee as any).employeeId;
        if (employee.employeePhoto) {
          return <EmployeePhotoCard key={id} employee={employee} />;
        }
        return <EmployeeCard key={id} employee={employee} />;
      })}
    </div>
  );
}
