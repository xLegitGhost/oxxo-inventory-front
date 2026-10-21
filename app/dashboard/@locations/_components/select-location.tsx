'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Location } from '@/entities';

interface SelectLocationProps {
  locations: Location[];
  store?: string | string[] | undefined;
}

export default function SelectLocation({ locations, store }: SelectLocationProps) {
  const router = useRouter();
  const currentStore = typeof store === 'string' ? store : undefined;

  return (
    <Select
      label="Tienda"
      placeholder="Selecciona una tienda"
      selectedKeys={currentStore ? [currentStore] : ['0']}
      onChange={(e) => {
        const val = e.target.value;
        if (val === '0' || val === '') {
          router.push('/dashboard');
        } else {
          router.push(`/dashboard?store=${val}`);
        }
      }}
      classNames={{
        mainWrapper: 'hover:ring-2 hover:ring-red-300 rounded-xl transition-all',
      }}
    >
      {locations.map((loc) => (
        <SelectItem
          key={String(loc.locationId)}
          value={String(loc.locationId)}
          textValue={loc.locationName}
        >
          {loc.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
