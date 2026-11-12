import { Input, Button } from '@nextui-org/react';
import { Location } from '@/entities';
import { createEmployee } from '@/actions/employees/create';
import SelectLocation from './select-location';

interface FormCreateEmployeeProps {
  stores: Location[];
}

export default function FormCreateEmployee({ stores }: FormCreateEmployeeProps) {
  return (
    <form action={createEmployee} className="flex flex-col gap-3 p-4">
      <h1 className="text-xl font-bold text-center">Crear empleado</h1>
      <Input
        label="Nombre"
        placeholder="Marco"
        name="employeeName"
        isRequired
      />
      <Input
        label="Apellidos"
        placeholder="Aurelio"
        name="employeeLastName"
        isRequired
      />
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="marco@marco.com"
        name="employeeEmail"
        isRequired
      />
      <Input
        label="Número de teléfono"
        placeholder="4421234567"
        name="employeePhoneNumber"
        isRequired
      />
      <SelectLocation stores={stores} />
      <Input
        type="file"
        name="employeePhoto"
        description="Foto de perfil del empleado"
      />
      <Button type="submit" color="primary" className="font-semibold text-white mt-2">
        Crear empleado
      </Button>
    </form>
  );
}
