import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { Manager, Location } from '@/entities';
import { updateManager } from '@/actions/managers/update';

interface FormUpdateManagerProps {
  manager: Manager;
  stores: Location[];
}

export default function FormUpdateManager({
  manager,
  stores,
}: FormUpdateManagerProps) {
  const updateManagerWithId = updateManager.bind(null, manager.managerId);

  const currentStoreId = manager.location?.locationId?.toString();
  const disabledKeys = stores
    .filter((store) => {
      if (!store.manager) return false;
      const assignedManagerId =
        typeof store.manager === 'object'
          ? store.manager?.managerId
          : store.manager;
      return assignedManagerId !== manager.managerId;
    })
    .map((store) => store.locationId.toString());

  return (
    <form action={updateManagerWithId} className="flex flex-col gap-3 pb-4">
      <Input
        label="Nombre completo"
        placeholder="Marco Aurelio"
        name="managerFullName"
        defaultValue={manager.managerFullName}
        isRequired
      />
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="manager@manager.com"
        name="managerEmail"
        defaultValue={manager.managerEmail}
        isRequired
      />
      <Input
        label="Salario"
        type="number"
        placeholder="12000"
        name="managerSalary"
        defaultValue={manager.managerSalary?.toString()}
        isRequired
      />
      <Input
        label="Número de teléfono"
        placeholder="4423617000"
        name="managerPhoneNumber"
        defaultValue={manager.managerPhoneNumber}
        isRequired
      />
      <Select
        label="Tienda"
        name="location"
        placeholder="Selecciona una tienda"
        disabledKeys={disabledKeys}
        defaultSelectedKeys={currentStoreId ? [currentStoreId] : undefined}
      >
        {stores.map((store) => (
          <SelectItem
            key={store.locationId.toString()}
            value={store.locationId.toString()}
          >
            {store.locationName}
          </SelectItem>
        ))}
      </Select>
      <Button type="submit" color="primary" className="font-semibold text-white mt-2">
        Actualizar
      </Button>
    </form>
  );
}
