'use client';

import { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Employee, Location } from '@/entities';
import EmployeeCard from './employee-card';
import EmployeePhotoCard from './employee-photo-card';

interface ListEmployeesProps {
  employees: Employee[];
  locations: Location[];
}

export default function ListEmployees({
  employees,
  locations,
}: ListEmployeesProps) {
  const [filter, setFilter] = useState<string>('');

  const filteredEmployees = filter
    ? employees.filter(
        (emp) => String(emp.location?.locationId) === filter,
      )
    : employees;

  return (
    <div className="flex flex-col gap-6 w-full h-[90vh] overflow-y-auto p-10">
      <div className="w-full max-w-xs">
        <Select
          label="Tiendas"
          placeholder="Todas las tiendas"
          selectedKeys={filter ? [filter] : []}
          onChange={(e) => setFilter(e.target.value)}
        >
          {locations.map((loc) => (
            <SelectItem key={String(loc.locationId)} value={String(loc.locationId)}>
              {loc.locationName}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredEmployees.map((employee: Employee) => {
          const id = employee.id || (employee as any).employeeId;
          if (employee.employeePhoto) {
            return <EmployeePhotoCard key={id} employee={employee} />;
          }
          return <EmployeeCard key={id} employee={employee} />;
        })}
      </div>
    </div>
  );
}
