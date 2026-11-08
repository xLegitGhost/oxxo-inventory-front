import { API_URL } from '@/constants';
import { Product, Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import FilteredCards from './_components/filtered-cards';

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let products: Product[] = [];
  let providers: Provider[] = [];

  try {
    const [resProducts, resProviders] = await Promise.all([
      fetch(`${API_URL}/products`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:products'] },
      }),
      fetch(`${API_URL}/providers`, {
        headers: authHeaders(),
        next: { tags: ['dashboard:providers'] },
      }),
    ]);

    if (resProducts.ok) products = await resProducts.json();
    if (resProviders.ok) providers = await resProviders.json();
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching data in products layout:', error);
  }

  return (
    <div className="h-[90vh] min-h-[90vh] overflow-y-auto w-full flex flex-row">
      <div className="w-5/12 border-r-2 border-orange-400 p-6 flex flex-col gap-6">
        <FilteredCards products={products} providers={providers} />
      </div>
      <div className="w-7/12 p-6 flex flex-col items-center justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
