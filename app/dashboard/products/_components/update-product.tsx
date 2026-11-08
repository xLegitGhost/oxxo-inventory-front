import { Input, Button } from '@nextui-org/react';
import { LuCheck, LuDollarSign } from 'react-icons/lu';
import { Product, Provider } from '@/entities';
import { updateProduct } from '@/actions/products/update';
import SelectProvider from './select-provider';

interface UpdateProductProps {
  product: Product;
  providers: Provider[];
}

export default function UpdateProduct({
  product,
  providers,
}: UpdateProductProps) {
  const updateProductWithId = updateProduct.bind(null, product.productId);

  return (
    <form action={updateProductWithId} className="flex flex-col gap-4 w-full">
      <Input
        label="Nombre del producto"
        placeholder="Nombre"
        name="productName"
        defaultValue={product.productName}
        isRequired
      />
      <Input
        label="Precio"
        type="number"
        step="any"
        placeholder="Precio"
        name="price"
        defaultValue={product.price?.toString()}
        startContent={<LuDollarSign size={20} />}
        isRequired
      />
      <Input
        label="Número de sellos"
        type="number"
        placeholder="Número de sellos"
        name="countSeal"
        defaultValue={product.countSeal?.toString()}
        isRequired
      />
      <SelectProvider
        providers={providers}
        defaultProvider={product.provider?.providerId}
      />
      <Button
        type="submit"
        color="primary"
        className="font-semibold text-white mt-2"
        startContent={<LuCheck size={20} />}
      >
        Guardar cambios
      </Button>
    </form>
  );
}
