import { API_URL } from '@/constants';
import { Product } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import FilteredCards from './_components/filtered-cards';

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:products'] },
    });
    if (response.ok) {
      products = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching products:', error);
  }

  return (
    <div className="h-[90vh] min-h-[90vh] overflow-y-auto w-full flex flex-row">
      <div className="w-5/12 border-r-2 border-orange-400 p-6 flex flex-col gap-6">
        <FilteredCards products={products} />
      </div>
      <div className="w-7/12 p-6 flex justify-center items-center">
        <p className="text-neutral-500 font-semibold text-lg">
          Selecciona un producto para ver sus detalles
        </p>
      </div>
    </div>
  );
}
