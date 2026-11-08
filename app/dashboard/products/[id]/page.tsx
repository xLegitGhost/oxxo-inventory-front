import { notFound } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/constants';
import { Product, Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import UpdateProduct from '../_components/update-product';
import DeleteProduct from '../_components/delete-product';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let product: Product | null = null;
  let providers: Provider[] = [];

  try {
    const [resProduct, resProviders] = await Promise.all([
      fetch(`${API_URL}/products/${params.id}`, {
        headers: authHeaders(),
        next: { tags: [`dashboard:products:${params.id}`, 'dashboard:products'] },
      }),
      fetch(`${API_URL}/providers`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:providers'] },
      }),
    ]);

    if (resProduct.ok) product = await resProduct.json();
    if (resProviders.ok) providers = await resProviders.json();
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching product or providers:', error);
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg gap-6 my-6">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/dashboard/products"
          className="text-orange-600 underline font-semibold hover:text-orange-800"
        >
          ← Crear nuevo producto
        </Link>
        <DeleteProduct productId={product.productId} />
      </div>

      <div className="w-full bg-orange-600 text-white rounded-md p-4 text-center shadow-md">
        <h2 className="text-2xl font-bold">
          Nombre: {product.productName}
        </h2>
        <p className="text-lg font-semibold mt-1">
          Precio: ${product.price?.toFixed(2)}
        </p>
        <p className="text-sm mt-1">
          Sellos: {product.countSeal}
        </p>
      </div>

      <div className="w-full bg-white rounded-md p-6 shadow-md border border-neutral-200">
        <h3 className="text-xl font-bold mb-4 text-neutral-800">
          Modificar información
        </h3>
        <UpdateProduct product={product} providers={providers} />
      </div>
    </div>
  );
}
