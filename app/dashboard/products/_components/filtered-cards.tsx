'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@nextui-org/react';
import { Product } from '@/entities';
import ProductCard from './product-card';

export default function FilteredCards({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    const lower = filter.toLowerCase();
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(lower)
    );
    setProductList(filtered);
  }, [filter, products]);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <Input
        label="Nombre del producto"
        placeholder="Buscar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] p-1">
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
