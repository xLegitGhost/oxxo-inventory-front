import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { API_URL } from '@/constants';
import { Product } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let product: Product | null = null;
  try {
    const response = await fetch(`${API_URL}/products/${params.id}`, {
      headers: authHeaders(),
      next: { tags: [`dashboard:products:${params.id}`, 'dashboard:products'] },
    });
    if (response.ok) {
      product = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching product:', error);
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full p-8 gap-6">
      <div className="w-full max-w-xl flex justify-start">
        <Link
          href="/dashboard/products"
          className="text-orange-600 underline font-semibold hover:text-orange-800"
        >
          ← Volver a productos
        </Link>
      </div>
      <Card className="w-full max-w-xl bg-white shadow-md">
        <CardHeader className="justify-center">
          <h1 className="text-3xl font-bold text-center">
            {product.productName}
          </h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 p-6 text-base text-neutral-700">
          <p>
            <b>Precio:</b> ${product.price?.toFixed(2)}
          </p>
          <p>
            <b>Stock disponible:</b> {product.countSeal} unidades
          </p>
          {product.provider && (
            <p>
              <b>Proveedor:</b>{' '}
              <Link
                href={`/dashboard/providers/${product.provider.providerId}`}
                className="text-orange-600 underline font-semibold hover:text-orange-800"
              >
                {product.provider.providerName}
              </Link>
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
