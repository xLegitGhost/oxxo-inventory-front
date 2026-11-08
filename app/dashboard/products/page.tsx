import { Input, Button } from '@nextui-org/react';
import { LuDollarSign } from 'react-icons/lu';
import { API_URL } from '@/constants';
import { Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import { createProduct } from '@/actions/products/create';
import SelectProvider from './_components/select-provider';

export default async function ProductsPage() {
  let providers: Provider[] = [];
  try {
    const response = await fetch(`${API_URL}/providers`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:providers'] },
    });
    if (response.ok) {
      providers = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching providers for create product page:', error);
  }

  return (
    <div className="bg-orange-600 text-white rounded-md p-10 flex flex-col gap-6 w-full max-w-lg shadow-md my-6">
      <h1 className="text-2xl font-bold text-center">Crear producto</h1>
      <form action={createProduct} className="flex flex-col gap-4">
        <Input
          label="Nombre del producto"
          placeholder="Coca-Cola 600ml"
          name="productName"
          isRequired
        />
        <Input
          label="Precio"
          type="number"
          step="any"
          placeholder="18.50"
          name="price"
          startContent={<LuDollarSign size={20} />}
          isRequired
        />
        <Input
          label="Número de sellos"
          type="number"
          placeholder="2"
          name="countSeal"
          isRequired
        />
        <SelectProvider providers={providers} />
        <Button
          type="submit"
          color="primary"
          className="font-semibold text-white mt-2"
        >
          Crear producto
        </Button>
      </form>
    </div>
  );
}
