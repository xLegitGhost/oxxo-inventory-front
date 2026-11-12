'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Location } from '@/entities';

interface SelectLocationProps {
  stores: Location[];
  defaultStore?: number | string;
}

export default function SelectLocation({
  stores,
  defaultStore,
}: SelectLocationProps) {
  return (
    <Select
      label="Tienda"
      name="location"
      placeholder="Selecciona una tienda"
      defaultSelectedKeys={
        defaultStore !== undefined && defaultStore !== null
          ? [String(defaultStore)]
          : undefined
      }
    >
      {stores.map((store) => (
        <SelectItem key={String(store.locationId)} value={String(store.locationId)}>
          {store.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
