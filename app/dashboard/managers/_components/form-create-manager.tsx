import { Input, Button } from '@nextui-org/react';
import { Location } from '@/entities';
import { createManager } from '@/actions/managers/create';
import SelectStore from './select-store';

interface FormCreateManagerProps {
  stores: Location[];
}

export default function FormCreateManager({ stores }: FormCreateManagerProps) {
  return (
    <form action={createManager} className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-center">Crear manager</h1>
      <Input
        label="Nombre completo"
        placeholder="Marco Aurelio"
        name="managerFullName"
        isRequired
      />
      <Input
        label="Salario"
        type="number"
        placeholder="20000"
        name="managerSalary"
        isRequired
      />
      <Input
        label="Correo"
        type="email"
        placeholder="carlos@marco.com"
        name="managerEmail"
        isRequired
      />
      <Input
        label="Número de teléfono"
        placeholder="4421234567"
        name="managerPhoneNumber"
        isRequired
      />
      <SelectStore stores={stores} />
      <Button type="submit" color="primary" className="font-semibold text-white mt-2">
        Crear manager
      </Button>
    </form>
  );
}
