'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Manager, Location } from '@/entities';

interface SelectManagerProps {
  managers: Manager[];
  locations: Location[];
  defaultManager?: string;
}

export default function SelectManager({
  managers,
  locations,
  defaultManager,
}: SelectManagerProps) {
  const disabledKeys = locations
    .map((loc) =>
      typeof loc.manager === 'object' ? loc.manager?.managerId : loc.manager
    )
    .filter((id): id is string => Boolean(id) && id !== defaultManager);

  return (
    <Select
      label="Manager"
      name="manager"
      placeholder="Selecciona un manager"
      disabledKeys={disabledKeys}
      defaultSelectedKeys={defaultManager ? [defaultManager] : undefined}
    >
      {managers.map((manager) => (
        <SelectItem key={manager.managerId} value={manager.managerId}>
          {manager.managerFullName}
        </SelectItem>
      ))}
    </Select>
  );
}
