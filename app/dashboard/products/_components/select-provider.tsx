'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Provider } from '@/entities';

interface SelectProviderProps {
  providers: Provider[];
  defaultProvider?: string;
}

export default function SelectProvider({
  providers,
  defaultProvider,
}: SelectProviderProps) {
  return (
    <Select
      label="Proveedor"
      name="provider"
      placeholder="Selecciona un proveedor"
      defaultSelectedKeys={defaultProvider ? [defaultProvider] : undefined}
      isRequired
    >
      {providers.map((provider) => (
        <SelectItem key={provider.providerId} value={provider.providerId}>
          {provider.providerName}
        </SelectItem>
      ))}
    </Select>
  );
}
