import { Input, Button } from '@nextui-org/react';
import { Employee, Location } from '@/entities';
import { updateEmployee } from '@/actions/employees/update';
import SelectLocation from './select-location';

interface FormUpdateEmployeeProps {
  employee: Employee;
  stores: Location[];
}

export default function FormUpdateEmployee({
  employee,
  stores,
}: FormUpdateEmployeeProps) {
  const id = employee.id || (employee as any).employeeId;
  const updateEmployeeWithId = updateEmployee.bind(null, id);

  return (
    <form
      action={updateEmployeeWithId}
      className="bg-orange-500 text-white rounded-md p-6 flex flex-col gap-4 w-full max-w-md shadow-md"
    >
      <h1 className="text-xl font-bold text-center">Actualizar empleado</h1>
      <Input
        label="Nombre"
        defaultValue={employee.employeeName}
        name="employeeName"
        isRequired
      />
      <Input
        label="Apellidos"
        defaultValue={employee.employeeLastName}
        name="employeeLastName"
        isRequired
      />
      <Input
        label="Correo electrónico"
        type="email"
        defaultValue={employee.employeeEmail}
        name="employeeEmail"
        isRequired
      />
      <Input
        label="Número de teléfono"
        defaultValue={employee.employeePhoneNumber}
        name="employeePhoneNumber"
        isRequired
      />
      <SelectLocation
        stores={stores}
        defaultStore={employee.location?.locationId}
      />
      <Input
        type="file"
        name="employeePhoto"
        description="Foto de perfil del empleado"
      />
      <Button
        type="submit"
        color="primary"
        className="font-semibold text-white mt-2"
      >
        Actualizar datos
      </Button>
    </form>
  );
}
