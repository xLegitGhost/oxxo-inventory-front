'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Product, Provider } from '@/entities';
import ProductCard from './product-card';

interface FilteredCardsProps {
  products: Product[];
  providers: Provider[];
}

export default function FilteredCards({
  products,
  providers,
}: FilteredCardsProps) {
  const [filter, setFilter] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;

    if (filter.trim()) {
      const lower = filter.toLowerCase();
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(lower)
      );
    }

    if (selectedProvider) {
      filtered = filtered.filter(
        (product) => product.provider?.providerId === selectedProvider
      );
    }

    setProductList(filtered);
  }, [filter, selectedProvider, products]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Input
        label="Nombre del producto"
        placeholder="Buscar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />
      <Select
        label="Filtrar por proveedor"
        placeholder="Todos los proveedores"
        selectedKeys={selectedProvider ? [selectedProvider] : []}
        onChange={(e) => setSelectedProvider(e.target.value)}
        className="w-full"
      >
        {providers.map((provider) => (
          <SelectItem key={provider.providerId} value={provider.providerId}>
            {provider.providerName}
          </SelectItem>
        ))}
      </Select>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[65vh] p-1">
        {productList.map((product) => (
          <Link
            key={product.productId}
            href={`/dashboard/products/${product.productId}`}
            className="hover:scale-105 transition-transform"
          >
            <ProductCard product={product} />
          </Link>
        ))}
        {productList.length === 0 && (
          <p className="text-center text-neutral-500 py-6 font-semibold">
            No se encontraron productos
          </p>
        )}
      </div>
    </div>
  );
}
