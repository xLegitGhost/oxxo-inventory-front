'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Location } from '@/entities';

interface SelectStoreProps {
  stores: Location[];
  defaultStore?: number | string;
  disabledKeys?: string[];
}

export default function SelectStore({
  stores,
  defaultStore,
  disabledKeys,
}: SelectStoreProps) {
  return (
    <Select
      label="Tienda"
      name="location"
      placeholder="Selecciona una tienda"
      disabledKeys={disabledKeys}
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
