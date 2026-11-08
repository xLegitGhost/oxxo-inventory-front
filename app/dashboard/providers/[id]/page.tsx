import { notFound } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/constants';
import { Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import ProviderCard from '../_components/provider-card';
import FormUpdateProvider from '../_components/form-update-provider';
import DeleteProvider from '../_components/delete-provider';
import ProductCard from '@/app/dashboard/products/_components/product-card';

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
    <div className="flex flex-col h-[90vh] p-8 gap-6 w-full overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <Link
          href="/dashboard/providers"
          className="text-orange-600 underline font-semibold hover:text-orange-800"
        >
          ← Volver a proveedores
        </Link>
        <DeleteProvider provider={provider} />
      </div>

      <div className="flex flex-row flex-wrap gap-6 items-center">
        <ProviderCard provider={provider} />
        <FormUpdateProvider provider={provider} />
      </div>

      <div className="w-[85vw] h-[2px] bg-orange-900 my-2" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-neutral-800">
          Productos suministrados ({provider.products?.length ?? 0})
        </h2>
        <div className="flex flex-row flex-wrap gap-6">
          {provider.products && provider.products.length > 0 ? (
            provider.products.map((product) => (
              <Link
                key={product.productId}
                href={`/dashboard/products/${product.productId}`}
                className="hover:scale-105 transition-transform"
              >
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="text-neutral-500 font-semibold">
              Este proveedor no tiene productos registrados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
