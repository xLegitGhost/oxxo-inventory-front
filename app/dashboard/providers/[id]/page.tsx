import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { API_URL } from '@/constants';
import { Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function ProviderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let provider: Provider | null = null;
  try {
    const response = await fetch(`${API_URL}/providers/${params.id}`, {
      headers: authHeaders(),
      next: { tags: [`dashboard:providers:${params.id}`, 'dashboard:providers'] },
    });
    if (response.ok) {
      provider = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching provider:', error);
  }

  if (!provider) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full p-8 gap-6">
      <Card className="w-full max-w-2xl bg-white shadow-md">
        <CardHeader className="justify-center">
          <h1 className="text-3xl font-bold text-center">
            {provider.providerName}
          </h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 p-6">
          <p>
            <b>Correo electrónico:</b> {provider.providerEmail}
          </p>
          <p>
            <b>Teléfono:</b> {provider.providerPhoneNumber}
          </p>
          <Divider />
          <h2 className="text-xl font-bold">Productos suministrados:</h2>
          {provider.products && provider.products.length > 0 ? (
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {provider.products.map((prod) => (
                <li key={prod.productId}>
                  <b>{prod.productName}</b> — ${prod.price} (Stock: {prod.countSeal})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">
              Este proveedor no tiene productos registrados.
            </p>
          )}
        </CardBody>
      </Card>
      <Link
        href="/dashboard/providers"
        className="text-orange-600 underline font-semibold hover:text-orange-800"
      >
        ← Volver a proveedores
      </Link>
    </div>
  );
}
